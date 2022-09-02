import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import * as prismic from '@prismicio/client';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import EventSchedule from '../components/EventSchedule/EventSchedule';
import Dot from '@weco/common/views/components/Dot/Dot';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import ButtonSolidLink from '@weco/common/views/components/ButtonSolidLink/ButtonSolidLink';
import EventbriteButtons from '../components/EventbriteButtons/EventbriteButtons';
import Message from '@weco/common/views/components/Message/Message';
import PrismicHtmlBlock from '@weco/common/views/components/PrismicHtmlBlock/PrismicHtmlBlock';
import InfoBox from '../components/InfoBox/InfoBox';
import DateRange from '@weco/common/views/components/DateRange/DateRange';
import { font, classNames } from '@weco/common/utils/classnames';
import { camelize } from '@weco/common/utils/grammar';
import { formatDayDate, formatTime } from '@weco/common/utils/format-date';
import EventDateRange from '../components/EventDateRange/EventDateRange';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia } from '../utils/page-header';
import { Event, Interpretation } from '../types/events';
import { upcomingDatesFullyBooked } from '../services/prismic/events';
import EventDatesLink from '../components/EventDatesLink/EventDatesLink';
import Space from '@weco/common/views/components/styled/Space';
import { LabelField } from '@weco/common/model/label-field';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { WithGaDimensions } from '@weco/common/views/pages/_app';
import {
  audioDescribed,
  britishSignLanguage,
  email,
  hearingLoop,
  IconSvg,
  speechToText,
  ticket,
} from '@weco/common/icons';
import { getServerData } from '@weco/common/server-data';
import Body from '../components/Body/Body';
import ContentPage from '../components/ContentPage/ContentPage';
import Contributors from '../components/Contributors/Contributors';
import { eventLd } from '../services/prismic/transformers/json-ld';
import { isNotUndefined } from '@weco/common/utils/array';
import {
  fetchEvent,
  fetchEventScheduleItems,
  fetchEventsClientSide,
} from '../services/prismic/fetch/events';
import {
  getScheduleIds,
  transformEvent,
} from '../services/prismic/transformers/events';
import { createClient } from '../services/prismic/fetch';
import { prismicPageIds } from '@weco/common/data/hardcoded-ids';
import { headerBackgroundLs } from '@weco/common/utils/backgrounds';
import { isDayPast, isPast } from '@weco/common/utils/dates';

import * as prismicT from '@prismicio/types';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

const TimeWrapper = styled(Space).attrs({
  v: {
    size: 'm',
    properties: ['padding-top', 'padding-bottom'],
  },
  className: 'flex flex--h-space-between',
})`
  border-top: 1px solid ${props => props.theme.color('pumice')};
`;

const DateWrapper = styled.div.attrs({
  className: 'body-text',
})`
  border-bottom: 1px solid ${props => props.theme.color('pumice')};
`;

type Props = {
  event: Event;
  jsonLd: JsonLdObj[];
} & WithGaDimensions;

// TODO: Probably use the StatusIndicator?
type EventStatusProps = {
  text: string;
  color: string;
};
function EventStatus({ text, color }: EventStatusProps) {
  return (
    <div className="flex">
      <div className={`${font('intb', 5)} flex flex--v-center`}>
        <Space
          as="span"
          h={{ size: 'xs', properties: ['margin-right'] }}
          className={`flex flex--v-center`}
        >
          <Dot color={color} />
        </Space>
        {text}
      </div>
    </div>
  );
}

function DateList(event: Event) {
  return (
    event.times && (
      <>
        {event.times.map((eventTime, index) => {
          return (
            <TimeWrapper key={index}>
              <div
                className={`${
                  isDayPast(eventTime.range.endDateTime) ? 'font-pewter' : ''
                } flex-1`}
              >
                <DateRange
                  start={eventTime.range.startDateTime}
                  end={eventTime.range.endDateTime}
                />
              </div>

              {isDayPast(eventTime.range.endDateTime) ? (
                <>{EventStatus({ text: 'Past', color: 'marble' })}</>
              ) : eventTime.isFullyBooked ? (
                EventStatus({ text: 'Full', color: 'red' })
              ) : null}
            </TimeWrapper>
          );
        })}
      </>
    )
  );
}

function showTicketSalesStart(dateTime: Date | undefined) {
  return dateTime && !isPast(dateTime);
}

const getDescription = ({
  interpretationType,
  extraInformation,
  isPrimary,
}: Interpretation): prismicT.RichTextField => {
  const baseDescription: prismicT.RichTextField | undefined = isPrimary
    ? interpretationType.primaryDescription
    : interpretationType.description;

  const extraDescription: prismicT.RichTextField | undefined =
    extraInformation || [];

  return [...(baseDescription || []), ...extraDescription].filter(
    isNotUndefined
  ) as [prismicT.RTNode, ...prismicT.RTNode[]];
};

const eventInterpretationIcons: Record<string, IconSvg> = {
  britishSignLanguage: britishSignLanguage,
  speechToText: speechToText,
  hearingLoop: hearingLoop,
  audioDescribed: audioDescribed,
};

const EventPage: NextPage<Props> = ({ event, jsonLd }: Props) => {
  const [scheduledIn, setScheduledIn] = useState<Event>();
  const getScheduledIn = async () => {
    const scheduledInQuery = await fetchEventsClientSide({
      predicates: [prismic.predicate.at('my.events.schedule.event', event.id)],
    });

    if (
      isNotUndefined(scheduledInQuery) &&
      scheduledInQuery.results.length > 0
    ) {
      setScheduledIn(scheduledInQuery.results[0]);
    }
  };
  useEffect(() => {
    getScheduledIn();
  }, []);

  const maybeFeaturedMedia = getFeaturedMedia(event);
  const hasFeaturedVideo =
    event.body.length > 0 && event.body[0].type === 'videoEmbed';
  const body = hasFeaturedVideo
    ? event.body.slice(1, event.body.length)
    : event.body;
  const eventFormat = event.format ? [{ text: event.format.title }] : [];
  const eventAudiences = event.audiences
    ? event.audiences.map(a => {
        return {
          text: a.title,
        };
      })
    : [];
  const eventInterpretations = event.interpretations
    ? event.interpretations.map(i => {
        return {
          text: i.interpretationType.title,
        };
      })
    : [];
  const relaxedPerformanceLabel = event.isRelaxedPerformance
    ? [
        {
          text: 'Relaxed',
        },
      ]
    : [];

  const breadcrumbs = {
    items: [
      {
        url: '/events',
        text: 'Events',
      },
      ...event.series.map(series => ({
        url: `/event-series/${series.id}`,
        text: series.title || '',
        prefix: 'Part of',
      })),
      scheduledIn
        ? {
            url: `/events/${scheduledIn.id}`,
            text: scheduledIn.title || '',
            prefix: 'Part of',
          }
        : undefined,
      {
        url: `/events/${event.id}`,
        text: event.title,
        isHidden: true,
      },
    ].filter(isNotUndefined),
  };

  const labels = {
    labels: eventFormat.concat(
      eventAudiences,
      eventInterpretations,
      relaxedPerformanceLabel
    ),
  };

  const Header = (
    <PageHeader
      asyncBreadcrumbsRoute={`/events/${event.id}/scheduled-in`}
      breadcrumbs={breadcrumbs}
      labels={labels}
      title={event.title}
      FeaturedMedia={maybeFeaturedMedia}
      Background={
        <HeaderBackground
          hasWobblyEdge={true}
          backgroundTexture={headerBackgroundLs}
        />
      }
      ContentTypeInfo={
        <>
          <Space
            v={{
              size: 's',
              properties: ['margin-bottom'],
            }}
            className={classNames({
              'flex flex--wrap': true,
            })}
          >
            <EventDateRange event={event} />
            <Space h={{ size: 's', properties: ['margin-left'] }}>
              {!event.isPast && <EventDatesLink id={event.id} />}
            </Space>
          </Space>
          {event.isPast && EventStatus({ text: 'Past', color: 'marble' })}
          {upcomingDatesFullyBooked(event) &&
            EventStatus({ text: 'Fully booked', color: 'red' })}
        </>
      }
      HeroPicture={undefined}
      isFree={!event.cost} // TODO or no online cost
      isContentTypeInfoBeforeMedia={true}
    />
  );

  return (
    <PageLayout
      title={event.title}
      description={event.metadataDescription || event.promo?.caption || ''}
      url={{ pathname: `/events/${event.id}` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={event.image}
    >
      <ContentPage
        id={event.id}
        Header={Header}
        Body={<Body body={body} pageId={event.id} />}
        seasons={event.seasons}
        // We hide contributors as we render them higher up the page on events
        hideContributors={true}
      >
        <DateWrapper>
          <h2 id="dates">Dates</h2>
          {DateList(event)}
        </DateWrapper>
        {event.schedule && event.schedule.length > 0 && (
          <>
            <h2 className="h2">Events</h2>
            {event.schedule && <EventSchedule schedule={event.schedule} />}
          </>
        )}
        {event.ticketSalesStart &&
          showTicketSalesStart(event.ticketSalesStart) && (
            <>
              <Message
                text={`Booking opens ${formatDayDate(event.ticketSalesStart)} ${
                  event.ticketSalesStart
                    ? formatTime(event.ticketSalesStart)
                    : ''
                }`}
              />
            </>
          )}
        {!event.isPast && !showTicketSalesStart(event.ticketSalesStart) && (
          <>
            <EventbriteButtons event={event} />
            {event.thirdPartyBooking && (
              <>
                {event.isCompletelySoldOut ? ( // TODO online sold out / versus normal sold out
                  <>
                    <ButtonSolid disabled={true} text="Fully booked" />
                  </>
                ) : (
                  <>
                    <ButtonSolidLink
                      link={event.thirdPartyBooking.url}
                      trackingEvent={{
                        category: 'component',
                        action: 'booking-tickets:click',
                        label: 'event-page',
                      }}
                      icon={ticket}
                      text="Check for tickets"
                    />
                    {event.thirdPartyBooking.name && (
                      <Space v={{ size: 's', properties: ['margin-top'] }}>
                        <p
                          className={`no-margin font-charcoal ${font(
                            'intr',
                            5
                          )}`}
                        >
                          with {event.thirdPartyBooking.name}
                        </p>
                      </Space>
                    )}
                  </>
                )}
              </>
            )}
            {event.bookingEnquiryTeam && (
              <>
                {event.isCompletelySoldOut ? (
                  <Message text={`Fully booked`} />
                ) : (
                  <ButtonSolidLink
                    link={`mailto:${event.bookingEnquiryTeam.email}?subject=${event.title}`}
                    trackingEvent={{
                      category: 'component',
                      action: 'booking-tickets:click',
                      label: 'event-page (email to book)',
                    }}
                    icon={email}
                    text="Email to book"
                  />
                )}

                <NextLink
                  href={`mailto:${event.bookingEnquiryTeam.email}?subject=${event.title}`}
                  as={`mailto:${
                    event.bookingEnquiryTeam
                      ? event.bookingEnquiryTeam.email
                      : ''
                  }?subject=${event.title}`}
                  passHref
                >
                  <Space
                    v={{
                      size: 's',
                      properties: ['margin-top'],
                    }}
                    as="a"
                    className={classNames({
                      'block font-charcoal': true,
                      [font('intb', 5)]: true,
                    })}
                  >
                    <span>{event.bookingEnquiryTeam.email}</span>
                  </Space>
                </NextLink>
              </>
            )}
            {!event.eventbriteId &&
              !event.bookingEnquiryTeam &&
              !(event.schedule && event.schedule.length > 1) && (
                <>
                  {!event.hasEarlyRegistration && !event.cost && (
                    <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                      <Message text="Just turn up" />
                    </Space>
                  )}
                  {event.hasEarlyRegistration && (
                    <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                      <Message text="Arrive early to register" />
                    </Space>
                  )}
                </>
              )}
          </>
        )}
        <InfoBox
          title="Need to know"
          items={
            [
              event.locations[0] && {
                id: undefined,
                title: 'Location',
                description: event.locations[0].information,
              },
              event.bookingInformation && {
                id: undefined,
                title: 'Extra information',
                description: event.bookingInformation,
              },
            ]
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              .concat(event.policies)
              .concat(
                event.interpretations.map(interpretation => {
                  const iconName = camelize(
                    interpretation.interpretationType.title
                  );

                  const description = getDescription(interpretation);

                  return {
                    id: undefined,
                    icon: eventInterpretationIcons[iconName],
                    title: interpretation.interpretationType.title,
                    description,
                  };
                })
              )
              .filter(Boolean) as LabelField[]
          }
        >
          <p className={`no-margin ${font('intr', 5)}`}>
            <a
              href={`https://wellcomecollection.org/pages/${prismicPageIds.bookingAndAttendingOurEvents}`}
            >
              Our event terms and conditions
            </a>
          </p>
        </InfoBox>
        {/* We deliberately position the contributors below the schedule, so a
        reader can see all the events in a festival/multi-part event before they
        see the contributors. This was agreed in April 2022 with the content
        team. */}
        {event.contributors.length > 0 && (
          <Contributors
            contributors={event.contributors}
            titlePrefix="About your"
          />
        )}
        {event.audiences.map(audience => {
          if (audience.description) {
            return (
              <div className={`body-text`} key={audience.title}>
                <h2>For {audience.title}</h2>
                <PrismicHtmlBlock html={audience.description} />
              </div>
            );
          }
        })}
      </ContentPage>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const serverData = await getServerData(context);
  const { id } = context.query;

  const client = createClient(context);
  const eventDocument = await fetchEvent(client, id as string);

  if (!eventDocument) {
    return {
      notFound: true,
    };
  }

  const scheduleIds = getScheduleIds(eventDocument);

  const scheduleQuery =
    scheduleIds.length > 0
      ? await fetchEventScheduleItems(client, scheduleIds)
      : undefined;

  const event = transformEvent(eventDocument, scheduleQuery);

  const jsonLd = eventLd(event);

  return {
    props: {
      event,
      jsonLd,
      serverData,
      gaDimensions: {
        partOf: event.seasons
          .map(season => season.id)
          .concat(event.series.map(series => series.id)),
      },
    },
  };
};

export default EventPage;
