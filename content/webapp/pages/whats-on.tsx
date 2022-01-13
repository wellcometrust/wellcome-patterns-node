import { FunctionComponent } from 'react';
import { Moment } from 'moment';
import NextLink from 'next/link';
import { UiExhibition } from '@weco/common/model/exhibitions';
import { UiEvent } from '@weco/common/model/events';
import { Period } from '@weco/common/model/periods';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import { classNames, font, grid, cssGrid } from '@weco/common/utils/classnames';
import { getExhibitions } from '@weco/common/services/prismic/exhibitions';
import {
  getPage,
  getPageFeaturedText,
} from '@weco/common/services/prismic/pages';
import {
  getEvents,
  filterEventsForToday,
  filterEventsForWeekend,
} from '@weco/common/services/prismic/events';
import { london, formatDay, formatDate } from '@weco/common/utils/format-date';
import { clock } from '@weco/common/icons';
import {
  getTodaysVenueHours,
  getVenueById,
  parseCollectionVenues,
} from '@weco/common/services/prismic/opening-times';
import {
  cafePromo,
  shopPromo,
  readingRoomPromo,
  dailyTourPromo,
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
import { convertImageUri } from '@weco/common/utils/convert-image-uri';
import Space from '@weco/common/views/components/styled/Space';
import CssGridContainer from '@weco/common/views/components/styled/CssGridContainer';
import {
  ExceptionalOpeningHoursDay,
  OpeningHoursDay,
} from '@weco/common/model/opening-hours';
import {
  collectionVenueId,
  prismicPageIds,
} from '@weco/common/services/prismic/hardcoded-id';
import FeaturedText from '@weco/common/views/components/FeaturedText/FeaturedText';
import { defaultSerializer } from '../components/HTMLSerializers/HTMLSerializers';
import { FeaturedText as FeaturedTextType } from '@weco/common/model/text';
import { SectionPageHeader } from '@weco/common/views/components/styled/SectionPageHeader';
import { convertJsonToDates } from './event';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import { GetServerSideProps } from 'next';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { usePrismicData } from '@weco/common/server-data/Context';
import {
  exhibitionLd,
  eventLd,
} from '../services/prismic/transformers/json-ld';
import ExhibitionsAndEvents from '../components/ExhibitionsAndEvents/ExhibitionsAndEvents';
import CardGrid from '../components/CardGrid/CardGrid';
import { FeaturedCardExhibition } from '../components/FeaturedCard/FeaturedCard';

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
  exhibitions: PaginatedResults<UiExhibition>;
  events: PaginatedResults<UiEvent>;
  availableOnlineEvents: PaginatedResults<UiEvent>;
  period: string;
  dateRange: any[];
  tryTheseTooPromos: any[];
  eatShopPromos: any[];
  featuredText: FeaturedTextType;
};

export function getMomentsForPeriod(period: Period): (Moment | undefined)[] {
  const todaysDate = london();
  const todaysDatePlusSix = todaysDate.clone().add(6, 'days');

  switch (period) {
    case 'today':
      return [todaysDate.startOf('day'), todaysDate.endOf('day')];
    case 'this-weekend':
      return [getWeekendFromDate(todaysDate), getWeekendToDate(todaysDate)];
    // FIXME: this isn't really 'this week', but the 'next seven days' (needs UX/content rethink?)
    case 'this-week':
      return [todaysDate.startOf('day'), todaysDatePlusSix.endOf('day')];
    default:
      return [todaysDate.startOf('day'), undefined];
  }
}

function getWeekendFromDate(today) {
  const todayInteger = today.day(); // day() return Sun as 0, Sat as 6
  if (todayInteger !== 0) {
    return london(today).day(5);
  } else {
    return london(today).day(-2);
  }
}

function getWeekendToDate(today) {
  const todayInteger = today.day(); // day() return Sun as 0, Sat as 6
  if (todayInteger === 0) {
    return london(today);
  } else {
    return london(today).day(7);
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
  dateRange: (Date | Moment)[];
  period: string;
};

const DateRange = ({ dateRange, period }: DateRangeProps) => {
  const fromDate = dateRange[0];
  const toDate = dateRange[1];
  return (
    <Space
      v={{
        size: 's',
        properties: ['margin-bottom'],
      }}
      as="p"
      className={classNames({
        [font('hnr', 5)]: true,
      })}
    >
      {period === 'today' && (
        <time dateTime={formatDate(fromDate)}>{formatDate(fromDate)}</time>
      )}
      {period === 'this-weekend' && (
        <>
          <time dateTime={formatDate(fromDate)}>{formatDay(fromDate)}</time>
          &ndash;
          <time dateTime={formatDate(toDate)}>{formatDay(toDate)}</time>
        </>
      )}
      {period === 'current-and-coming-up' && (
        <>
          From{' '}
          <time dateTime={formatDate(fromDate)}>{formatDate(fromDate)}</time>
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
                What{`'`}s on
              </SectionPageHeader>
              <div className="flex flex--v-center flex--wrap">
                {todaysOpeningHours && (
                  <div className="flex flex--v-center">
                    <Space
                      as="span"
                      h={{ size: 'm', properties: ['margin-right'] }}
                      className={classNames({
                        [font('hnb', 5)]: true,
                      })}
                    >
                      Galleries
                      {todaysOpeningHours.isClosed ? ' closed ' : ' open '}
                      today
                    </Space>
                    {!todaysOpeningHours.isClosed && (
                      <>
                        <Space
                          as="span"
                          h={{ size: 's', properties: ['margin-right'] }}
                        >
                          <Icon icon={clock} />
                        </Space>
                        <Space
                          as="span"
                          h={{ size: 'm', properties: ['margin-right'] }}
                          className={classNames({
                            [font('hnr', 5)]: true,
                          })}
                        >
                          <>
                            <time>{todaysOpeningHours.opens}</time>
                            {'—'}
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
                      [font('hnb', 5)]: true,
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

const pageDescription =
  'Discover all of the exhibitions, events and more on offer at Wellcome Collection, a free museum and library exploring health and human experience.';

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);

    const period = context.query.period
      ? context.query.period.toString()
      : 'current-and-coming-up';

    const { memoizedPrismic } = context.query;

    // call prisimic for specific content for section page such as featured text
    const whatsOnPagePromise = getPage(
      context.req,
      prismicPageIds.whatsOn,
      memoizedPrismic
    );

    const exhibitionsPromise = getExhibitions(
      context.req,
      {
        period,
        order: 'asc',
      },
      memoizedPrismic
    );

    const eventsPromise = getEvents(
      context.req,
      {
        period: 'current-and-coming-up',
        pageSize: 100,
      },
      memoizedPrismic
    );

    const availableOnlineEventsPromise = getEvents(
      context.req,
      {
        period: 'past',
        pageSize: 6,
        availableOnline: true,
      },
      memoizedPrismic
    );

    const [exhibitions, events, availableOnlineEvents, whatsOnPage] =
      await Promise.all([
        exhibitionsPromise,
        eventsPromise,
        availableOnlineEventsPromise,
        whatsOnPagePromise,
      ]);

    const dateRange = getMomentsForPeriod(period);

    const featuredText = whatsOnPage && getPageFeaturedText(whatsOnPage);

    if (period && events && exhibitions) {
      return {
        props: removeUndefinedProps({
          period,
          exhibitions,
          events,
          availableOnlineEvents,
          dateRange,
          tryTheseTooPromos: [readingRoomPromo],
          eatShopPromos: [cafePromo],
          cafePromo,
          dailyTourPromo,
          featuredText,
          serverData,
        }),
      };
    } else {
      return { notFound: true };
    }
  };

const WhatsOnPage: FunctionComponent<Props> = props => {
  const { period, dateRange, tryTheseTooPromos, eatShopPromos, featuredText } =
    props;

  const events = props.events.results.map(convertJsonToDates);

  const availableOnlineEvents =
    props.availableOnlineEvents.results.map(convertJsonToDates);

  const exhibitions = props.exhibitions.results.map(exhibition => {
    return {
      ...exhibition,
      start: exhibition.start && new Date(exhibition.start),
      end: exhibition.end && new Date(exhibition.end),
    };
  });

  const firstExhibition = exhibitions[0];

  const extraTitleText = segmentedControlItems.find(item => item.id === period);
  const pageTitle = extraTitleText
    ? `What's on${` - ${extraTitleText.text}`}`
    : `What's on`;

  const { collectionVenues } = usePrismicData();
  const venues = parseCollectionVenues(collectionVenues);
  const galleries = getVenueById(venues, collectionVenueId.galleries.id);
  const todaysOpeningHours = galleries && getTodaysVenueHours(galleries);

  return (
    <PageLayout
      title={pageTitle}
      description={pageDescription}
      url={{ pathname: `/whats-on` }}
      jsonLd={
        [
          ...exhibitions.map(exhibitionLd),
          ...events.map(eventLd),
        ] as JsonLdObj[]
      }
      openGraphType={'website'}
      siteSection={'whats-on'}
      imageUrl={
        firstExhibition &&
        firstExhibition.image &&
        convertImageUri(firstExhibition.image.contentUrl, 800)
      }
      imageAltText={
        (firstExhibition &&
          firstExhibition.image &&
          firstExhibition.image.alt) ??
        undefined
      }
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
                  <Layout12>
                    <div className="flex flex--v-center flex--h-space-between">
                      <h2 className="h1">Exhibitions</h2>
                      <span className={font('hnb', 5)}>Free admission</span>
                    </div>
                  </Layout12>
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
                    <span className={font('hnb', 4)}>Free admission</span>
                  </div>
                </Layout12>
              </Space>
              <ExhibitionsAndEvents
                exhibitions={exhibitions}
                events={
                  period === 'today'
                    ? filterEventsForToday(events)
                    : period === 'this-weekend'
                    ? filterEventsForWeekend(events)
                    : events
                }
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
                        <FacilityPromo
                          id={promo.id}
                          title={promo.title}
                          url={promo.url}
                          description={promo.description}
                          imageProps={promo.image}
                          metaText={promo.metaText}
                          metaIcon={promo.metaIcon}
                        />
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
