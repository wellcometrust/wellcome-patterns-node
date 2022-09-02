import NextLink from 'next/link';
import { FunctionComponent } from 'react';
import { ParsedUrlQuery } from 'querystring';
import {
  booleanCodec,
  decodeQuery,
  encodeQuery,
  FromCodecMap,
  LinkFrom,
  maybeNumberCodec,
  stringCodec,
} from '../../../utils/routes';
import { LinkProps } from '../../../model/link-props';

const itemPropsSources = [
  'work',
  'images_search_result',
  'viewer/paginator',
  'manifests_navigation',
  'search_within_result',
] as const;
type ItemPropsSource = typeof itemPropsSources[number];

const emptyItemProps: ItemProps = {
  workId: '',
  canvas: 1,
  page: 1,
  manifest: 1,
  pageSize: undefined,
  isOverview: false,
  resultPosition: undefined,
};

const codecMap = {
  workId: stringCodec,
  canvas: maybeNumberCodec,
  page: maybeNumberCodec,
  pageSize: maybeNumberCodec,
  isOverview: booleanCodec,
  resultPosition: maybeNumberCodec,
  manifest: maybeNumberCodec,
};

export type ItemProps = FromCodecMap<typeof codecMap>;

const fromQuery: (params: ParsedUrlQuery) => ItemProps = params => {
  return decodeQuery<ItemProps>(params, codecMap);
};

const toQuery: (props: ItemProps) => ParsedUrlQuery = props => {
  return encodeQuery<ItemProps>(props, codecMap);
};

function toLink(
  partialProps: Partial<ItemProps>,
  source: ItemPropsSource
): LinkProps {
  const pathname = '/item';
  const props: ItemProps = {
    ...emptyItemProps,
    ...partialProps,
  };
  const query = toQuery(props);

  return {
    href: {
      pathname,
      query: { ...query, source },
    },
    as: {
      pathname: `/works/${props.workId}/items`,
      query: {},
    },
  };
}

type Props = LinkFrom<ItemProps> & { source: ItemPropsSource };

const WorksLink: FunctionComponent<Props> = ({
  children,
  source,
  ...props
}: Props) => {
  return <NextLink {...toLink(props, source)}>{children}</NextLink>;
};

export default WorksLink;
export { toLink, fromQuery, emptyItemProps };
