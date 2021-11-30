/**
 * Most documents would live in the content app, but because these are universal,
 * i.e opening times, global alert, and the popup dialog, we have them in common
 */
import {
  Query,
  PrismicDocument,
  NumberField,
  RichTextField,
  LinkField,
  GroupField,
  TimestampField,
  SelectField,
  KeyTextField,
  ImageField,
  BooleanField,
} from '@prismicio/types';

type DayField = GroupField<{
  startDateTime: TimestampField;
  endDateTime: TimestampField;
}>;

export type CollectionVenuePrismicDocument = PrismicDocument<{
  title: KeyTextField;
  order: NumberField;
  image: ImageField;
  link: LinkField;
  linkText: RichTextField;
  monday: DayField;
  tuesday: DayField;
  wednesday: DayField;
  thursday: DayField;
  friday: DayField;
  saturday: DayField;
  sunday: DayField;
  modifiedDayOpeningTimes: GroupField<{
    overrideDate: TimestampField;
    type: SelectField<
      | 'Bank holiday'
      | 'Easter'
      | 'Christmas and New Year'
      | 'Late Spectacular'
      | 'other'
    >;
    startDateTime: TimestampField;
    endDateTime: TimestampField;
  }>;
}>;

export type PopupDialogPrismicDocument = PrismicDocument<{
  openButtonText: KeyTextField;
  title: KeyTextField;
  text: RichTextField;
  linkText: KeyTextField;
  link: KeyTextField;
  isShown: BooleanField;
}>;

export function emptyPrismicQuery<T extends PrismicDocument>(): Query<T> {
  return {
    page: 1,
    results_per_page: 0,
    results_size: 0,
    total_results_size: 0,
    total_pages: 0,
    next_page: null,
    prev_page: null,
    results: [] as T[],
  };
}

export function emptyDocument<T extends PrismicDocument>(
  data: T['data']
): PrismicDocument<T['data']> {
  return {
    id: '',
    uid: null,
    url: null,
    type: '',
    href: '',
    tags: [],
    first_publication_date: '',
    last_publication_date: '',
    slugs: [],
    linked_documents: [],
    lang: 'en-gb',
    alternate_languages: [],
    data,
  };
}

export function emptyPopupDialog(): PopupDialogPrismicDocument {
  return emptyDocument<PopupDialogPrismicDocument>({
    isShown: false,
    link: null,
    linkText: null,
    openButtonText: null,
    text: [],
    title: null,
  });
}
