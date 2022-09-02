import NextLink from 'next/link';
import { FunctionComponent } from 'react';
import { ParsedUrlQuery } from 'querystring';
import {
  decodeQuery,
  encodeQuery,
  FromCodecMap,
  LinkFrom,
  maybeNumberCodec,
  stringCodec,
} from '../../../utils/routes';
import { LinkProps } from '../../../model/link-props';

const imagePropsSources = ['images_search_result', 'viewer/paginator'] as const;
type ImagePropsSource = typeof imagePropsSources[number];

const emptyImageProps: ImageProps = {
  id: '',
  workId: '',
  resultPosition: undefined,
};

const codecMap = {
  id: stringCodec,
  workId: stringCodec,
  resultPosition: maybeNumberCodec,
};

export type ImageProps = FromCodecMap<typeof codecMap>;

const fromQuery: (params: ParsedUrlQuery) => ImageProps = params => {
  return decodeQuery<ImageProps>(params, codecMap);
};

const toQuery: (props: ImageProps) => ParsedUrlQuery = props => {
  return encodeQuery<ImageProps>(props, codecMap);
};

function toLink(
  partialProps: Partial<ImageProps>,
  source: ImagePropsSource
): LinkProps {
  const pathname = '/image';
  const props: ImageProps = {
    ...emptyImageProps,
    ...partialProps,
  };
  const query = toQuery(props);

  return {
    href: {
      pathname,
      query: { ...query, source },
    },
    as: {
      pathname: `/works/${props.workId}/images`,
      query: {
        id: props.id,
      },
    },
  };
}

type Props = LinkFrom<ImageProps> & { source: ImagePropsSource };

const WorksLink: FunctionComponent<Props> = ({
  children,
  source,
  ...props
}: Props) => {
  return <NextLink {...toLink(props, source)}>{children}</NextLink>;
};

export default WorksLink;
export { toLink, fromQuery, emptyImageProps };
