import { GetServerSideProps } from 'next';
import { EventSeries } from '../types/event-series';
import { EventBasic } from '../types/events';
import { FC } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia } from '../utils/page-header';
import Space from '@weco/common/views/components/styled/Space';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import Body from '../components/Body/Body';
import ContentPage from '../components/ContentPage/ContentPage';
import SearchResults from '../components/SearchResults/SearchResults';
import { eventLd } from '../services/prismic/transformers/json-ld';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import { fetchEvents } from '../services/prismic/fetch/events';
import { createClient } from '../services/prismic/fetch';
import * as prismic from '@prismicio/client';
import { fetchEventSeriesById } from '../services/prismic/fetch/event-series';
import { isNotUndefined } from '@weco/common/utils/array';
import { transformEventSeries } from '../services/prismic/transformers/event-series';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  fixEventDatesInJson,
  transformEvent,
  transformEventToEventBasic,
} from '../services/prismic/transformers/events';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';
import { getUpcomingEvents } from '../utils/event-series';

type Props = {
  series: EventSeries;
  jsonLd: JsonLdObj[];
  pastEvents: EventBasic[];
  upcomingEvents: EventBasic[];
};

function getPastEvents(
  events: EventBasic[],
  upcomingEventsIds: Set<string>
): EventBasic[] {
  return events
    .filter(event => !upcomingEventsIds.has(event.id))
    .sort((a, b) => {
      const aStartTime = Math.min(
        ...a.times.map(aTime => aTime.range.startDateTime.valueOf())
      );
      const bStartTime = Math.min(
        ...b.times.map(bTime => bTime.range.startDateTime.valueOf())
      );
      return bStartTime - aStartTime;
    })
    .slice(0, 3);
}

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { id } = context.query;

    if (!looksLikePrismicId(id)) {
      return { notFound: true };
    }

    const client = createClient(context);

    const eventsQueryPromise = fetchEvents(client, {
      predicates: [prismic.predicate.at('my.events.series.series', id)],
      pageSize: 100,
    });

    const seriesPromise = fetchEventSeriesById(client, id);

    const [eventsQuery, seriesDocument] = await Promise.all([
      eventsQueryPromise,
      seriesPromise,
    ]);

    if (isNotUndefined(seriesDocument)) {
      const series = transformEventSeries(seriesDocument);
      const events = transformQuery(eventsQuery, doc =>
        transformEventToEventBasic(transformEvent(doc))
      ).results;

      const upcomingEvents = getUpcomingEvents(events);
      const upcomingEventsIds = new Set(upcomingEvents.map(event => event.id));

      const pastEvents = getPastEvents(events, upcomingEventsIds);

      const jsonLd = events.flatMap(eventLd);

      return {
        props: {
          series,
          upcomingEvents,
          pastEvents,
          jsonLd,
          serverData,
        },
      };
    } else {
      return { notFound: true };
    }
  };

const EventSeriesPage: FC<Props> = ({
  series,
  jsonLd,
  pastEvents: pastJsonEvents,
  upcomingEvents: upcomingJsonEvents,
}) => {
  // events are passed down through getServerSideProps as JSON, so we nuparse them before moving forward
  // This could probably be done at the time of use, instead of globally...
  const pastEvents = pastJsonEvents.map(fixEventDatesInJson);
  const upcomingEvents = upcomingJsonEvents.map(fixEventDatesInJson);

  const breadcrumbs = {
    items: [
      {
        url: '/events',
        text: 'Events',
      },
      {
        url: `/events-series/${series.id}`,
        text: series.title,
        isHidden: true,
      },
    ],
  };

  const FeaturedMedia = getFeaturedMedia(series);
  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={{ labels: series.labels }}
      title={series.title}
      ContentTypeInfo={undefined}
      Background={<HeaderBackground hasWobblyEdge={true} />}
      FeaturedMedia={FeaturedMedia}
      HeroPicture={undefined}
    />
  );

  return (
    <PageLayout
      title={series.title}
      description={series.metadataDescription || series.promo?.caption || ''}
      url={{ pathname: `/event-series/${series.id}` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'whats-on'}
      image={series.image}
    >
      <ContentPage
        id={series.id}
        Header={Header}
        Body={<Body body={series.body} pageId={series.id} />}
        contributors={series.contributors}
      >
        {upcomingEvents.length > 0 ? (
          <SearchResults items={upcomingEvents} title={`What's next`} />
        ) : (
          <h2 className="h2">
            No events scheduled at the moment, check back soon…
          </h2>
        )}

        {pastEvents.length > 0 && (
          <Space v={{ size: 'xl', properties: ['margin-top'] }}>
            <SearchResults
              items={pastEvents}
              title={`What we've done before`}
            />
          </Space>
        )}
      </ContentPage>
    </PageLayout>
  );
};

export default EventSeriesPage;
