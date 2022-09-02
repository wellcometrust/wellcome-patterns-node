import { ParsedUrlQuery } from 'querystring';
import NextLink from 'next/link';
import { LinkProps } from '../../../model/link-props';
import { FunctionComponent } from 'react';
import {
  LinkFrom,
  stringCodec,
  numberCodec,
  csvCodec,
  maybeStringCodec,
  quotedCsvCodec,
  FromCodecMap,
  decodeQuery,
  encodeQuery,
} from '../../../utils/routes';
import { Prefix } from '../../../utils/utility-types';

const worksPropsSources = [
  'search_form',
  'canonical_link',
  'meta_link',
  'search/paginator',
  'works_search_context',
  'work_details/contributors',
  'work_details/genres',
  'work_details/subjects',
  'work_details/partOf',
] as const;

type WorksPropsSource =
  | typeof worksPropsSources[number]
  | Prefix<'cancel_filter/'>
  | 'unknown';

const emptyWorksProps: WorksProps = {
  query: '',
  page: 1,
  workType: [],
  'items.locations.locationType': [],
  availabilities: [],
  languages: [],
  'genres.label': [],
  'subjects.label': [],
  'contributors.agent.label': [],
  sort: undefined,
  sortOrder: undefined,
  'partOf.title': undefined,
  'production.dates.from': undefined,
  'production.dates.to': undefined,
};

const codecMap = {
  query: stringCodec,
  page: numberCodec,
  workType: csvCodec,
  'items.locations.locationType': csvCodec,
  availabilities: csvCodec,
  languages: csvCodec,
  'genres.label': quotedCsvCodec,
  'subjects.label': quotedCsvCodec,
  'contributors.agent.label': quotedCsvCodec,
  sort: maybeStringCodec,
  sortOrder: maybeStringCodec,
  'partOf.title': maybeStringCodec,
  'production.dates.from': maybeStringCodec,
  'production.dates.to': maybeStringCodec,
};

export type WorksProps = FromCodecMap<typeof codecMap>;

const fromQuery: (params: ParsedUrlQuery) => WorksProps = params => {
  return decodeQuery<WorksProps>(params, codecMap);
};

const toQuery: (props: WorksProps) => ParsedUrlQuery = props => {
  return encodeQuery<WorksProps>(props, codecMap);
};

function toLink(
  partialProps: Partial<WorksProps>,
  source: WorksPropsSource
): LinkProps {
  const pathname = '/works';
  const props: WorksProps = {
    ...emptyWorksProps,
    ...partialProps,
  };
  const query = toQuery(props);

  return {
    href: {
      pathname,
      query: { ...query, source },
    },
    as: {
      pathname,
      query: query,
    },
  };
}

type Props = LinkFrom<WorksProps> & { source: WorksPropsSource };
const WorksLink: FunctionComponent<Props> = ({
  children,
  source,
  ...props
}: Props) => {
  return <NextLink {...toLink(props, source)}>{children}</NextLink>;
};

export default WorksLink;
export { toLink, fromQuery, emptyWorksProps };
