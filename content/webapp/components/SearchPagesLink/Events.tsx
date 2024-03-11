import { ParsedUrlQuery } from 'querystring';
import NextLink from 'next/link';
import { LinkProps } from '@weco/common/model/link-props';
import { FunctionComponent } from 'react';
import {
  LinkFrom,
  stringCodec,
  numberCodec,
  csvCodec,
  FromCodecMap,
  encodeQuery,
  decodeQuery,
} from '@weco/common/utils/routes';
import { EventsLinkSource } from '@weco/common/data/segment-values';
export type EventsProps = FromCodecMap<typeof codecMap>;
const emptyEventsProps: EventsProps = {
  query: '',
  page: 1,
  format: [],
  audience: [],
  interpretation: [],
};
const codecMap = {
  query: stringCodec,
  page: numberCodec,
  format: csvCodec,
  audience: csvCodec,
  interpretation: csvCodec,
};
const fromQuery: (params: ParsedUrlQuery) => EventsProps = params => {
  return decodeQuery<EventsProps>(params, codecMap);
};
const toQuery: (props: EventsProps) => ParsedUrlQuery = props => {
  return encodeQuery<EventsProps>(props, codecMap);
};
function toLink(
  partialProps: Partial<EventsProps>,
  source: EventsLinkSource
): LinkProps {
  const pathname = '/search/events';
  const props: EventsProps = {
    ...emptyEventsProps,
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
      query,
    },
  };
}
type Props = LinkFrom<EventsProps> & { source: EventsLinkSource };
const EventsLink: FunctionComponent<Props> = ({
  children,
  source,
  ...props
}: Props) => {
  return (
    <NextLink {...toLink(props, source)} legacyBehavior>
      {children}
    </NextLink>
  );
};
export default EventsLink;
export { toLink, toQuery, fromQuery, emptyEventsProps };
