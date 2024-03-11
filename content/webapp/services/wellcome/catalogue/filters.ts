import { palette } from '@weco/content/components/PaletteColorPicker';
import {
  ImageAggregations,
  WorkAggregations,
} from '@weco/content/services/wellcome/catalogue/types';
import { ArticleAggregations } from '@weco/content/services/wellcome/content/types';
import { quoteVal } from '@weco/common/utils/csv';
import { toHtmlId } from '@weco/content/utils/string';
import { ImagesProps } from '@weco/content/components/SearchPagesLink/Images';
import { WorksProps } from '@weco/content/components/SearchPagesLink/Works';
import { StoriesProps } from '@weco/content/components/SearchPagesLink/Stories';
import { isNotUndefined, isString } from '@weco/common/utils/type-guards';
import { formatNumber } from '@weco/common/utils/grammar';
import { EventsProps } from '@weco/content/components/SearchPagesLink/Events';
import { EventAggregations } from '../content/types';

export type DateRangeFilter<Ids extends string = string> = {
  type: 'dateRange';
  id: string;
  label: string;
  to: {
    id: Ids;
    value: string | undefined;
  };
  from: {
    id: Ids;
    value: string | undefined;
  };
  excludeFromMoreFilters?: boolean;
};

export type CheckboxFilter<Id extends string = string> = {
  type: 'checkbox';
  id: Id;
  label: string;
  showEmptyBuckets?: boolean;
  options: FilterOption[];
  // Most filters are to be included in the More Filters Modal,
  // so this only needs to be set to true in the rare case we
  // wish to exclude it.
  excludeFromMoreFilters?: boolean;
};

export type ColorFilter = {
  type: 'color';
  id: keyof ImagesProps;
  label: string;
  color: string | undefined;
  excludeFromMoreFilters?: boolean;
};

export type Filter<Id extends string = string> =
  | CheckboxFilter<Id>
  | DateRangeFilter<Id>
  | ColorFilter;

type FilterOption = {
  id: string;
  value: string;
  count?: number;
  label: string;
  selected: boolean;
};

type SelectedValue = {
  label: string;
  value: string;
};

/** We build the list of available filters from two lists:
 *
 *    - the list of aggregated values from the API
 *    - the list of values the user has already selected, which may not
 *      appear in the aggregations
 *
 * e.g. if a user clicks on an obscure subject from a works page to get a
 * filtered search, we want to display that obscure subject in the list of
 * filters even if it doesn't appear in the top N subjects from the API.
 *
 */
function filterOptionsWithNonAggregates({
  options = [],
  selectedValues,
  showEmptyBuckets = false,
}: {
  options?: FilterOption[];
  selectedValues: (string | SelectedValue)[];
  showEmptyBuckets?: boolean;
}): FilterOption[] {
  const aggregationValues: string[] = options.map(option => option.value);
  const selectedOptionValues: string[] = selectedValues.map(value =>
    isString(value) ? value : value.value
  );
  const aggregationOptionsByValue = mergeOptionCounts(options);
  const selectedOptionsByValue = new Map<string, FilterOption>(
    selectedValues.map(value => [
      isString(value) ? value : value.value,
      selectedValueToFilterOption(value),
    ])
  );

  const allOptions: FilterOption[] = [
    ...new Set(aggregationValues.concat(selectedOptionValues)),
  ]
    .map(
      value =>
        aggregationOptionsByValue.get(value) ||
        selectedOptionsByValue.get(value)
    )
    .filter(option => isNotUndefined(option)) as FilterOption[];

  return allOptions
    .filter(option => showEmptyBuckets || option.count || option.selected)
    .sort(optionOrder);
}

function selectedValueToFilterOption(
  value: string | SelectedValue
): FilterOption {
  return isString(value)
    ? {
        id: value,
        value,
        label: value,
        selected: true,
      }
    : {
        id: value.value,
        value: value.value,
        label: value.label,
        selected: true,
      };
}
/**
 * Sorting definition for FilterOptions.
 *
 * FilterOptions are ordered by count descending then label ascending,
 * This places the most common values at the top, and presents a sensible
 * and predictable ordering when any two values are equally as common.
 *
 * There is an exception to that general rule, in that values with
 * no matching documents are presented at the top, rather than the bottom.
 * This is expected either when a requested value is bogus, or is
 * filtered out by the search term or other queries.
 */
function optionOrder(lhs: FilterOption, rhs: FilterOption): number {
  const countDiff = (rhs.count || Infinity) - (lhs.count || Infinity);
  const diff = countDiff || lhs.label.localeCompare(rhs.label);
  return diff;
}

/**
 * Creates a map of values to filter options.
 *
 * Options received from the API may contain multiple entries with identical
 * labels.
 * This is expected where:
 *  - There are two genuinely different concepts with the same name (e.g. John Smith)
 *  - The same concept has been identified differently in the source data (e.g. MeSH vs LCSH)
 *
 * The filters used in the UI operate on labels, so these differences are irrelevant
 * in this context, and can cause problems, so homonymous options are to be merged.
 */
function mergeOptionCounts(options: FilterOption[]): Map<string, FilterOption> {
  return options.reduce((acc, option) => {
    const matchingOption = acc.get(option.value);
    if (matchingOption && matchingOption.count) {
      matchingOption.count += option.count || 0;
    } else acc.set(option.value, option);
    return acc;
  }, new Map<string, FilterOption>());
}
/** Creates the label for a filter in the GUI.
 *
 * Note: we intentionally omit the count when we have a filter whose
 * count is unknown, which happens when we create a filter from a
 * selected value.
 */
export const filterLabel = ({
  label,
  count,
}: {
  label: string;
  count?: number;
}): string => (count ? `${label} (${formatNumber(count)})` : label);

type WorksFilterProps = {
  works: { aggregations?: WorkAggregations };
  props: WorksProps;
};

type ImagesFilterProps = {
  images: { aggregations?: ImageAggregations };
  props: ImagesProps;
};

type StoriesFilterProps = {
  stories: { aggregations?: ArticleAggregations };
  props: StoriesProps;
};

type EventsFilterProps = {
  events: { aggregations?: EventAggregations };
  props: EventsProps;
};

const productionDatesFilter = ({
  props,
}: WorksFilterProps): DateRangeFilter<keyof WorksProps> => ({
  type: 'dateRange',
  id: 'production.dates',
  label: 'Dates',
  from: {
    id: 'production.dates.from',
    value: props['production.dates.from'],
  },
  to: {
    id: 'production.dates.to',
    value: props['production.dates.to'],
  },
});

const workTypeFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'workType',
  label: 'Formats',
  options: filterOptionsWithNonAggregates({
    options: works?.aggregations?.workType.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.workType.includes(bucket.data.id),
    })),
    selectedValues: props.workType,
  }),
});

const subjectsFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'subjects.label',
  label: 'Subjects',
  options: filterOptionsWithNonAggregates({
    options: works?.aggregations?.['subjects.label']?.buckets.map(bucket => ({
      id: toHtmlId(bucket.data.label),
      value: quoteVal(bucket.data.label),
      count: bucket.count,
      label: bucket.data.label,
      selected: props['subjects.label'].includes(bucket.data.label),
    })),
    selectedValues: props['subjects.label'].map(label => ({
      value: quoteVal(label),
      label,
    })),
  }),
});

const genresFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'genres.label',
  label: 'Types/Techniques',
  options: filterOptionsWithNonAggregates({
    options: works?.aggregations?.['genres.label']?.buckets.map(bucket => ({
      id: toHtmlId(bucket.data.label),
      value: quoteVal(bucket.data.label),
      count: bucket.count,
      label: bucket.data.label,
      selected: props['genres.label'].includes(bucket.data.label),
    })),
    selectedValues: props['genres.label'].map(label => ({
      value: quoteVal(label),
      label,
    })),
  }),
});

const contributorsAgentFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => {
  return {
    type: 'checkbox',
    id: 'contributors.agent.label',
    label: 'Contributors',
    options: filterOptionsWithNonAggregates({
      options: works?.aggregations?.['contributors.agent.label']?.buckets.map(
        bucket => ({
          id: toHtmlId(bucket.data.label),
          value: quoteVal(bucket.data.label),
          count: bucket.count,
          label: bucket.data.label,
          selected: props['contributors.agent.label'].includes(
            bucket.data.label
          ),
        })
      ),
      selectedValues: props['contributors.agent.label'].map(label => ({
        value: quoteVal(label),
        label,
      })),
    }),
  };
};

const languagesFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'languages',
  label: 'Languages',
  options: filterOptionsWithNonAggregates({
    options: works?.aggregations?.languages?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.languages.includes(bucket.data.id),
    })),
    selectedValues: props.languages,
  }),
});

/*
partOf is not a "real" filter, based on aggregations
in the same way that the other filters in this file are.

It exists here to support its inclusion in the ResetActiveFilters
section when a Series tag-style link takes the user to a search
page.

Because of this, it only requires the one filter option, generated
directly from the selected partOf value, rather than fetching
an aggregation of all partOfs via the API.
*/
const partOfFilter = ({
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'partOf.title',
  label: 'Series',
  excludeFromMoreFilters: true,
  options: props['partOf.title']
    ? filterOptionsWithNonAggregates({
        options: [
          {
            id: props['partOf.title'],
            value: props['partOf.title'],
            label: props['partOf.title'],
            count: 0,
            selected: !!props['partOf.title'],
          },
        ],
        selectedValues: [props['partOf.title']],
      })
    : [],
});

const availabilitiesFilter = ({
  works,
  props,
}: WorksFilterProps): CheckboxFilter<keyof WorksProps> => ({
  type: 'checkbox',
  id: 'availabilities',
  label: 'Locations',
  options: filterOptionsWithNonAggregates({
    options: works?.aggregations?.availabilities?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.availabilities.includes(bucket.data.id),
    })),
    selectedValues: props.availabilities,
  }),
});

const colorFilter = ({ props }: ImagesFilterProps): ColorFilter => {
  // In the color filter UI, users can:
  //
  //    - pick a named, pre-selected color (e.g. green, violet, red)
  //    - select an arbitrary color using a hue slider
  //
  // We want to make sure the filter is labelled to match what they
  // selected in the UI, so we:
  //
  //    - use our name if it's one of the pre-selected colors
  //    - use the hex string from the hue slider UI if it's an arbitrary color
  //
  // Note that the filter popover uses uppercase hex strings (e.g. #2E2EE6),
  // so we make sure the label matches.
  const paletteColor = palette.find(({ hexValue }) => hexValue === props.color);

  const label = isNotUndefined(paletteColor)
    ? paletteColor.colorName
    : `#${props.color?.toUpperCase()}`;

  return {
    type: 'color',
    id: 'color',
    label,
    color: props.color,
  };
};

// We want to customise the license labels for our UI as the API
// ones are, whilst correct, very verbose
// https://github.com/wellcomecollection/wellcomecollection.org/issues/6188
const licenseLabels = {
  'cc-by': 'Creative Commons CC-BY',
  'cc-by-nc': 'Creative Commons CC-BY-NC',
  'cc-by-nc-nd': 'Creative Commons CC-BY-NC-ND',
  'cc-0': 'Creative Commons CC0',
  'cc-by-nd': 'Creative Commons CC-BY-ND',
  'cc-by-sa': 'Creative Commons CC-BY-SA',
  'cc-by-nc-sa': 'Creative Commons CC-BY-NC-SA',
  pdm: 'Public Domain Mark',
  ogl: 'Open Government License',
  opl: 'Open Parliament License',
  inc: 'In copyright',
};

const licensesFilter = ({
  images,
  props,
}: ImagesFilterProps): CheckboxFilter<keyof ImagesProps> => ({
  type: 'checkbox',
  id: 'locations.license',
  label: 'Licences', // UK spelling for UI
  options: filterOptionsWithNonAggregates({
    options: images.aggregations?.license?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: licenseLabels[bucket.data.id] || bucket.data.label,
      selected: props['locations.license'].includes(bucket.data.id),
    })),
    selectedValues: props['locations.license'],
    showEmptyBuckets: true,
  }),
});

const sourceDatesFilter = ({
  props,
}: ImagesFilterProps): DateRangeFilter<keyof ImagesProps> => ({
  type: 'dateRange',
  id: 'production.dates',
  label: 'Dates',
  from: {
    id: 'source.production.dates.from',
    value: props['source.production.dates.from'],
  },
  to: {
    id: 'source.production.dates.to',
    value: props['source.production.dates.to'],
  },
});

const sourceGenresFilter = ({
  images,
  props,
}: ImagesFilterProps): CheckboxFilter<keyof ImagesProps> => ({
  type: 'checkbox',
  id: 'source.genres.label',
  label: 'Types/Techniques',
  options: filterOptionsWithNonAggregates({
    options: images?.aggregations?.['source.genres.label']?.buckets.map(
      bucket => ({
        id: toHtmlId(bucket.data.label),
        value: quoteVal(bucket.data.label),
        count: bucket.count,
        label: bucket.data.label,
        selected: props['source.genres.label'].includes(bucket.data.label),
      })
    ),
    selectedValues: props['source.genres.label'].map(label => ({
      value: quoteVal(label),
      label,
    })),
  }),
});

const sourceSubjectsFilter = ({
  images,
  props,
}: ImagesFilterProps): CheckboxFilter<keyof ImagesProps> => ({
  type: 'checkbox',
  id: 'source.subjects.label',
  label: 'Subjects',
  options: filterOptionsWithNonAggregates({
    options: images?.aggregations?.['source.subjects.label']?.buckets.map(
      bucket => ({
        id: toHtmlId(bucket.data.label),
        value: quoteVal(bucket.data.label),
        count: bucket.count,
        label: bucket.data.label,
        selected: props['source.subjects.label'].includes(bucket.data.label),
      })
    ),
    selectedValues: props['source.subjects.label'].map(label => ({
      value: quoteVal(label),
      label,
    })),
  }),
});

const sourceContributorAgentsFilter = ({
  images,
  props,
}: ImagesFilterProps): CheckboxFilter<keyof ImagesProps> => ({
  type: 'checkbox',
  id: 'source.contributors.agent.label',
  label: 'Contributors',
  options: filterOptionsWithNonAggregates({
    options: images?.aggregations?.[
      'source.contributors.agent.label'
    ]?.buckets.map(bucket => ({
      id: toHtmlId(bucket.data.label),
      value: quoteVal(bucket.data.label),
      count: bucket.count,
      label: bucket.data.label,
      selected: props['source.contributors.agent.label'].includes(
        bucket.data.label
      ),
    })),
    selectedValues: props['source.contributors.agent.label'].map(label => ({
      value: quoteVal(label),
      label,
    })),
  }),
});

const storiesFormatFilter = ({
  stories,
  props,
}: StoriesFilterProps): CheckboxFilter<keyof StoriesProps> => ({
  type: 'checkbox',
  id: 'format',
  label: 'Formats',
  options: filterOptionsWithNonAggregates({
    options: stories?.aggregations?.format?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.format.includes(bucket.data.id),
    })),
    selectedValues: props.format,
  }),
});

const storiesContributorFilter = ({
  stories,
  props,
}: StoriesFilterProps): CheckboxFilter<keyof StoriesProps> => ({
  type: 'checkbox',
  id: 'contributors.contributor',
  label: 'Contributors',
  options: filterOptionsWithNonAggregates({
    options: stories?.aggregations?.['contributors.contributor'].buckets.map(
      bucket => ({
        id: bucket.data.id,
        value: bucket.data.id,
        count: bucket.count,
        label: bucket.data.label,
        selected: props['contributors.contributor'].includes(bucket.data.id),
      })
    ),
    selectedValues: props['contributors.contributor'],
  }),
});

// TODO move content filters out of catalogue?
const eventsFormatFilter = ({
  events,
  props,
}: EventsFilterProps): CheckboxFilter<keyof EventsProps> => ({
  type: 'checkbox',
  id: 'format',
  label: 'Event types',
  options: filterOptionsWithNonAggregates({
    options: events?.aggregations?.format?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.format.includes(bucket.data.id),
    })),
    selectedValues: props.format,
  }),
});

const eventsAudienceFilter = ({
  events,
  props,
}: EventsFilterProps): CheckboxFilter<keyof EventsProps> => ({
  type: 'checkbox',
  id: 'audience',
  label: 'Audiences',
  options: filterOptionsWithNonAggregates({
    options: events?.aggregations?.audience?.buckets.map(bucket => ({
      id: bucket.data.id,
      value: bucket.data.id,
      count: bucket.count,
      label: bucket.data.label,
      selected: props.audience.includes(bucket.data.id),
    })),
    selectedValues: props.audience,
  }),
});

const eventsInterpretationFilter = ({
  events,
  props,
}: EventsFilterProps): CheckboxFilter<keyof EventsProps> => {
  return {
    type: 'checkbox',
    id: 'interpretation',
    label: 'Accessibility',
    options: filterOptionsWithNonAggregates({
      options: events?.aggregations?.interpretation?.buckets.map(bucket => {
        return {
          id: bucket.data.id,
          value: bucket.data.id,
          count: bucket.count,
          label: bucket.data.label,
          selected: props.interpretation.includes(bucket.data.id),
        };
      }),
      selectedValues: props.interpretation,
    }),
  };
};

const imagesFilters: (props: ImagesFilterProps) => Filter[] = props =>
  [
    colorFilter,
    licensesFilter,
    sourceDatesFilter,
    sourceGenresFilter,
    sourceSubjectsFilter,
    sourceContributorAgentsFilter,
  ].map(f => f(props));

const worksFilters: (
  props: WorksFilterProps
) => Filter<keyof WorksProps>[] = props =>
  [
    workTypeFilter,
    productionDatesFilter,
    availabilitiesFilter,
    subjectsFilter,
    genresFilter,
    contributorsAgentFilter,
    languagesFilter,
    partOfFilter,
  ].map(f => f(props));

const storiesFilters: (
  props: StoriesFilterProps
) => Filter<keyof StoriesProps>[] = props =>
  [storiesFormatFilter, storiesContributorFilter].map(f => f(props));

const eventsFilters: (
  props: EventsFilterProps
) => Filter<keyof EventsProps>[] = props =>
  [eventsFormatFilter, eventsAudienceFilter, eventsInterpretationFilter].map(
    f => f(props)
  );

export { worksFilters, imagesFilters, storiesFilters, eventsFilters };
