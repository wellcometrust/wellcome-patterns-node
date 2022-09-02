import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { ExhibitionBasic } from '../types/exhibitions';
import { EventBasic } from '../types/events';
import { Period } from '../types/periods';
import { classNames, font, grid, cssGrid } from '@weco/common/utils/classnames';
import {
  getPageFeaturedText,
  transformPage,
} from '../services/prismic/transformers/pages';
import {
  filterEventsForToday,
  filterEventsForWeekend,
} from '../services/prismic/events';
import { london, formatDay, formatDate } from '@weco/common/utils/format-date';
import { clock } from '@weco/common/icons';
import {
  getTodaysVenueHours,
  getVenueById,
} from '@weco/common/services/prismic/opening-times';
import { transformCollectionVenues } from '@weco/common/services/prismic/transformers/collection-venues';
import {
  cafePromo,
  // shopPromo,
  readingRoomPromo,
} from '../data/facility-promos';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import SegmentedControl from '@weco/common/views/components/SegmentedControl/SegmentedControl';
import EventsByMonth from '../components/EventsByMonth/EventsByMonth';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import Icon from '@weco/common/views/components/Icon/Icon';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import FacilityPromo from '../components/FacilityPromo/FacilityPromo';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import Space from '@weco/common/views/components/styled/Space';
import CssGridContainer from '@weco/common/views/components/styled/CssGridContainer';
import {
  ExceptionalOpeningHoursDay,
  OpeningHoursDay,
} from '@weco/common/model/opening-hours';
import {
  collectionVenueId,
  prismicPageIds,
} from '@weco/common/data/hardcoded-ids';
import FeaturedText from '../components/FeaturedText/FeaturedText';
import { defaultSerializer } from '../components/HTMLSerializers/HTMLSerializers';
import { FeaturedText as FeaturedTextType } from '../types/text';
import { SectionPageHeader } from '@weco/common/views/components/styled/SectionPageHeader';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import { GetServerSideProps } from 'next';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { usePrismicData } from '@weco/common/server-data/Context';
import {
  exhibitionLd,
  eventLd,
} from '../services/prismic/transformers/json-ld';
import ExhibitionsAndEvents from '../components/ExhibitionsAndEvents/ExhibitionsAndEvents';
import CardGrid from '../components/CardGrid/CardGrid';
import { FeaturedCardExhibition } from '../components/FeaturedCard/FeaturedCard';
import { fetchPage } from '../services/prismic/fetch/pages';
import { createClient } from '../services/prismic/fetch';
import { fetchEvents } from '../services/prismic/fetch/events';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformEvent,
  transformEventToEventBasic,
} from '../services/prismic/transformers/events';
import { pageDescriptions } from '@weco/common/data/microcopy';
import { fetchExhibitions } from '../services/prismic/fetch/exhibitions';
import { transformExhibitionsQuery } from '../services/prismic/transformers/exhibitions';
import { getNextWeekendDateRange } from '@weco/common/utils/dates';

const segmentedControlItems = [
  {
    id: 'current-and-coming-up',
    url: '/whats-on',
    text: 'Everything',
  },
  {
    id: 'today',
    url: '/whats-on/today',
    text: 'Today',
  },
  {
    id: 'this-weekend',
    url: '/whats-on/this-weekend',
    text: 'This weekend',
  },
];

export type Props = {
  exhibitions: ExhibitionBasic[];
  events: EventBasic[];
  availableOnlineEvents: EventBasic[];
  period: string;
  dateRange: { start: Date; end?: Date };
  featuredText: FeaturedTextType;
  jsonLd: JsonLdObj[];
};

export function getRangeForPeriod(period: Period): { start: Date; end?: Date } {
  const todaysDate = london();

  switch (period) {
    case 'today':
      return {
        start: todaysDate.startOf('day').toDate(),
        end: todaysDate.endOf('day').toDate(),
      };
    case 'this-weekend':
      return getNextWeekendDateRange(todaysDate);
    default:
      return { start: todaysDate.startOf('day').toDate() };
  }
}

// const ClosedMessage = () => (
//   <>
//     <Space
//       v={{
//         size: 'm',
//         properties: ['margin-bottom'],
//       }}
//       as="p"
//       className={classNames({
//         [font('wb', 2)]: true,
//       })}
//     >
//       Our exhibitions are closed today, but our <a href={cafePromo.url}>café</a>{' '}
//       and <a href={shopPromo.url}>shop</a> are open for your visit.
//     </Space>
//     <Space
//       v={{
//         size: 'l',
//         properties: ['margin-top', 'margin-bottom'],
//       }}
//     ></Space>
//   </>
// );

type DateRangeProps = {
  dateRange: { start: Date; end?: Date };
  period: string;
};

const DateRange = ({ dateRange, period }: DateRangeProps) => {
  const { start, end } = dateRange;
  return (
    <Space
      v={{
        size: 's',
        properties: ['margin-bottom'],
      }}
      as="p"
      className={classNames({
        [font('intr', 5)]: true,
      })}
    >
      {period === 'today' && (
        <time dateTime={formatDate(start)}>{formatDate(start)}</time>
      )}
      {period === 'this-weekend' && (
        <>
          <time dateTime={formatDate(start)}>{formatDay(start)}</time>
          {' – '}
          <time dateTime={formatDate(end!)}>{formatDay(end!)}</time>
        </>
      )}
      {period === 'current-and-coming-up' && (
        <>
          From <time dateTime={formatDate(start)}>{formatDate(start)}</time>
        </>
      )}
    </Space>
  );
};

type HeaderProps = {
  activeId: string;
  todaysOpeningHours: ExceptionalOpeningHoursDay | OpeningHoursDay | undefined;
  featuredText?: FeaturedTextType;
};
const Header = ({
  activeId,
  todaysOpeningHours,
  featuredText,
}: HeaderProps) => {
  return (
    <Space
      v={{
        size: 'l',
        properties: ['padding-top'],
      }}
      className={classNames({
        row: true,
      })}
    >
      <div className="container">
        <div className="grid">
          <div className={grid({ s: 12, m: 12, l: 12, xl: 12 })}>
            <div className="flex flex--v-center flex--h-space-between flex--wrap">
              <SectionPageHeader sectionLevelPage={true}>
                What’s on
              </SectionPageHeader>
              <div className="flex flex--v-center flex--wrap">
                {todaysOpeningHours && (
                  <div className="flex flex--v-center">
                    <Space
                      as="span"
                      h={{ size: 'm', properties: ['margin-right'] }}
                      className={classNames({
                        [font('intb', 5)]: true,
                      })}
                    >
                      Galleries
                      {todaysOpeningHours.isClosed ? ' closed ' : ' open '}
                      today
                    </Space>
                    {!todaysOpeningHours.isClosed && (
                      <>
                        <Space
                          className="flex"
                          as="span"
                          h={{ size: 's', properties: ['margin-right'] }}
                        >
                          <Icon icon={clock} />
                        </Space>
                        <Space
                          as="span"
                          h={{ size: 'm', properties: ['margin-right'] }}
                          className={classNames({
                            [font('intr', 5)]: true,
                          })}
                        >
                          <>
                            <time>{todaysOpeningHours.opens}</time>
                            {' – '}
                            <time>{todaysOpeningHours.closes}</time>
                          </>
                        </Space>
                      </>
                    )}
                  </div>
                )}
                <NextLink href={`/opening-times`} as={`/opening-times`}>
                  <a
                    className={classNames({
                      [font('intb', 5)]: true,
                    })}
                  >{`Full opening times`}</a>
                </NextLink>
              </div>
            </div>
          </div>
          {featuredText && featuredText.value && (
            <Space
              v={{
                size: 's',
                properties: ['margin-top', 'margin-bottom'],
              }}
              className={classNames({
                [grid({ s: 12, m: 10, l: 8, xl: 8 })]: true,
              })}
            >
              <FeaturedText
                html={featuredText.value}
                htmlSerializer={defaultSerializer}
              />
            </Space>
          )}
          <Space
            v={{
              size: 'm',
              properties: ['margin-top', 'margin-bottom'],
            }}
            className={classNames({
              [grid({ s: 12, m: 10, l: 7, xl: 7 })]: true,
            })}
          >
            <SegmentedControl
              ariaCurrentText="page"
              id={'whatsOnFilter'}
              activeId={activeId}
              items={segmentedControlItems}
            />
          </Space>
        </div>
      </div>
    </Space>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);

    const client = createClient(context);

    const period = context.query.period
      ? context.query.period.toString()
      : 'current-and-coming-up';

    // call prismic for specific content for section page such as featured text

    // TODO: If we're only looking up this page to get the featured text slice,
    // would it be faster to skip all the fetchLinks?  Is that possible?
    const whatsOnPagePromise = fetchPage(client, prismicPageIds.whatsOn);

    const exhibitionsQueryPromise = fetchExhibitions(client, {
      period,
      order: 'asc',
    });

    const eventsQueryPromise = fetchEvents(client, {
      period: 'current-and-coming-up',
      pageSize: 100,
    });

    const availableOnlineEventsQueryPromise = fetchEvents(client, {
      period: 'past',
      pageSize: 6,
      availableOnline: true,
    });

    const [
      exhibitionsQuery,
      eventsQuery,
      availableOnlineEventsQuery,
      whatsOnPage,
    ] = await Promise.all([
      exhibitionsQueryPromise,
      eventsQueryPromise,
      availableOnlineEventsQueryPromise,
      whatsOnPagePromise,
    ]);

    const dateRange = getRangeForPeriod(period);

    const featuredText =
      whatsOnPage && getPageFeaturedText(transformPage(whatsOnPage));

    const events = transformQuery(eventsQuery, event =>
      transformEventToEventBasic(transformEvent(event))
    ).results;
    const exhibitions = transformExhibitionsQuery(exhibitionsQuery).results;
    const availableOnlineEvents = transformQuery(
      availableOnlineEventsQuery,
      event => transformEventToEventBasic(transformEvent(event))
    ).results;

    if (period && events && exhibitions) {
      const jsonLd = [
        ...exhibitions.map(exhibitionLd),
        ...events.map(eventLd),
      ] as JsonLdObj[];

      return {
        props: {
          period,
          exhibitions,
          events,
          availableOnlineEvents,
          dateRange,
          jsonLd,
          featuredText: featuredText!,
          serverData,
        },
      };
    } else {
      return { notFound: true };
    }
  };

const WhatsOnPage: FunctionComponent<Props> = props => {
  const {
    period,
    exhibitions,
    events,
    availableOnlineEvents,
    dateRange,
    jsonLd,
    featuredText,
  } = props;

  const tryTheseTooPromos = [readingRoomPromo];
  const eatShopPromos = [cafePromo];

  const firstExhibition = exhibitions[0];

  const extraTitleText = segmentedControlItems.find(item => item.id === period);
  const pageTitle = extraTitleText
    ? `What’s on${` - ${extraTitleText.text}`}`
    : `What’s on`;

  const { collectionVenues } = usePrismicData();
  const venues = transformCollectionVenues(collectionVenues);
  const galleries = getVenueById(venues, collectionVenueId.galleries.id);
  const todaysOpeningHours = galleries && getTodaysVenueHours(galleries);

  const eventsToShow =
    period === 'today'
      ? filterEventsForToday(events)
      : period === 'this-weekend'
      ? filterEventsForWeekend(events)
      : events;

  return (
    <PageLayout
      title={pageTitle}
      description={pageDescriptions.whatsOn}
      url={{ pathname: `/whats-on` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={firstExhibition && firstExhibition.image}
    >
      <>
        <Header
          activeId={period}
          todaysOpeningHours={todaysOpeningHours}
          featuredText={featuredText}
        />
        <Layout12>
          <DateRange dateRange={dateRange} period={period} />
          {/* TODO put back when building, shop and cafe are open normally */}
          {/* {period === 'today' && todaysOpeningHours?.isClosed && (
            <ClosedMessage />
          )} */}
        </Layout12>
        <Space v={{ size: 'l', properties: ['margin-top'] }}>
          {period === 'current-and-coming-up' && (
            <>
              <Space v={{ size: 'l', properties: ['padding-top'] }}>
                <SpacingSection>
                  <SpacingComponent>
                    <SectionHeader title="Exhibitions" />
                  </SpacingComponent>
                  <SpacingComponent>
                    <Space v={{ size: 'xl', properties: ['margin-bottom'] }}>
                      {firstExhibition ? (
                        <Layout12>
                          <FeaturedCardExhibition
                            exhibition={firstExhibition}
                            background={'cream'}
                            color={'black'}
                          />
                        </Layout12>
                      ) : (
                        <Layout12>
                          <p data-test-id="no-exhibitions">
                            There are no current exhibitions
                          </p>
                        </Layout12>
                      )}
                    </Space>
                  </SpacingComponent>
                  <CardGrid
                    items={exhibitions.slice(1)}
                    itemsPerRow={3}
                    links={[
                      {
                        text: 'View all exhibitions',
                        url: '/exhibitions',
                      },
                    ]}
                  />
                </SpacingSection>

                <SpacingSection>
                  <SpacingComponent>
                    <SectionHeader title="Events" />
                  </SpacingComponent>
                  <SpacingComponent>
                    {events.length > 0 ? (
                      <EventsByMonth
                        events={events}
                        links={[{ text: 'View all events', url: '/events' }]}
                      />
                    ) : (
                      <Layout12>
                        <p>There are no upcoming events</p>
                      </Layout12>
                    )}
                  </SpacingComponent>
                </SpacingSection>

                <SpacingSection>
                  <SpacingComponent>
                    <SectionHeader title="Catch up" />
                  </SpacingComponent>
                  <SpacingComponent>
                    {availableOnlineEvents.length > 0 ? (
                      <CardGrid
                        items={availableOnlineEvents}
                        itemsPerRow={3}
                        links={[
                          {
                            text: 'View all catch up events',
                            url: '/events/past?availableOnline=true',
                          },
                        ]}
                      />
                    ) : (
                      <Layout12>
                        <p>There are no upcoming catch up events</p>
                      </Layout12>
                    )}
                  </SpacingComponent>
                </SpacingSection>
              </Space>
            </>
          )}
          {period !== 'current-and-coming-up' && (
            <SpacingSection>
              <Space
                v={{
                  size: 'm',
                  properties: ['padding-top', 'margin-bottom'],
                }}
              >
                <Layout12>
                  <div className="flex flex--v-center flex--h-space-between">
                    <h2 className="h1">Exhibitions and Events</h2>
                    <span className={font('intb', 4)}>Free admission</span>
                  </div>
                </Layout12>
              </Space>
              <ExhibitionsAndEvents
                exhibitions={exhibitions}
                events={eventsToShow as EventBasic[]}
                links={[
                  { text: 'View all exhibitions', url: '/exhibitions' },
                  { text: 'View all events', url: '/events' },
                ]}
              />
            </SpacingSection>
          )}
        </Space>

        <SpacingSection>
          <SpacingComponent>
            <SectionHeader title="Try these too" />
          </SpacingComponent>
          <SpacingComponent>
            <CssGridContainer>
              <div
                className={classNames({
                  'css-grid': true,
                })}
              >
                <div
                  className={classNames({
                    'css-grid__scroll-container container--scroll touch-scroll':
                      true,
                    [cssGrid({ s: 12, m: 12, l: 12, xl: 12 })]: true,
                  })}
                >
                  <div className="css-grid grid--scroll card-theme card-theme--transparent">
                    {tryTheseTooPromos.concat(eatShopPromos).map(promo => (
                      <div
                        key={promo.id}
                        className={cssGrid({
                          s: 12,
                          m: 6,
                          l: 4,
                          xl: 4,
                        })}
                      >
                        <FacilityPromo {...promo} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CssGridContainer>
          </SpacingComponent>
        </SpacingSection>
      </>
    </PageLayout>
  );
};

export default WhatsOnPage;
