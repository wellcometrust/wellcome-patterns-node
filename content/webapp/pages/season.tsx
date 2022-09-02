import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { Season } from '../types/seasons';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import SeasonsHeader from '../components/SeasonsHeader/SeasonsHeader';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import CardGrid from '../components/CardGrid/CardGrid';
import Body from '../components/Body/Body';
import ContentPage from '../components/ContentPage/ContentPage';
import { contentLd } from '../services/prismic/transformers/json-ld';
import { fetchArticles } from '../services/prismic/fetch/articles';
import { fetchBooks } from '../services/prismic/fetch/books';
import { fetchEvents } from '../services/prismic/fetch/events';
import { fetchExhibitions } from '../services/prismic/fetch/exhibitions';
import { fetchPages } from '../services/prismic/fetch/pages';
import { fetchProjects } from '../services/prismic/fetch/projects';
import { fetchSeries } from '../services/prismic/fetch/series';
import { fetchSeason } from '../services/prismic/fetch/seasons';
import { createClient } from '../services/prismic/fetch';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformArticle,
  transformArticleToArticleBasic,
} from '../services/prismic/transformers/articles';
import {
  transformBook,
  transformBookToBookBasic,
} from '../services/prismic/transformers/books';
import {
  fixEventDatesInJson,
  transformEvent,
  transformEventToEventBasic,
} from '../services/prismic/transformers/events';
import {
  fixExhibitionDatesInJson,
  transformExhibitionsQuery,
} from '../services/prismic/transformers/exhibitions';
import { transformPage } from '../services/prismic/transformers/pages';
import { transformProject } from '../services/prismic/transformers/projects';
import { transformSeries } from '../services/prismic/transformers/series';
import { transformSeason } from '../services/prismic/transformers/seasons';
import { ArticleBasic } from '../types/articles';
import { BookBasic } from '../types/books';
import { EventBasic } from '../types/events';
import { ExhibitionBasic } from '../types/exhibitions';
import { Page } from '../types/pages';
import { Project } from '../types/projects';
import { Series } from '../types/series';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import { getCrop } from '@weco/common/model/image';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

type Props = {
  season: Season;
  articles: ArticleBasic[];
  books: BookBasic[];
  events: EventBasic[];
  exhibitions: ExhibitionBasic[];
  pages: Page[];
  projects: Project[];
  series: Series[];
  jsonLd: JsonLdObj;
};

const SeasonPage = ({
  season,
  articles,
  events,
  exhibitions,
  pages,
  series,
  projects,
  books,
  jsonLd,
}: Props): ReactElement<Props> => {
  const superWidescreenImage = getCrop(season.image, '32:15');

  const Header = (
    <SeasonsHeader
      labels={{ labels: season.labels }}
      title={season.title}
      FeaturedMedia={
        superWidescreenImage ? (
          <PrismicImage
            image={superWidescreenImage}
            sizes={{
              xlarge: 1,
              large: 1,
              medium: 1,
              small: 1,
            }}
            quality="low"
          />
        ) : undefined
      }
      standfirst={season?.standfirst}
      start={season.start}
      end={season.end}
    />
  );
  const parsedEvents = events.map(fixEventDatesInJson);
  const parsedExhibitions = exhibitions.map(fixExhibitionDatesInJson);

  const allItems = [
    ...parsedExhibitions,
    ...parsedEvents,
    ...articles,
    ...pages,
    ...series,
    ...projects,
    ...books,
  ];

  return (
    <PageLayout
      title={season.title}
      description={season.metadataDescription || season.promo?.caption || ''}
      url={{ pathname: `/seasons/${season.id}` }}
      jsonLd={jsonLd}
      siteSection={'whats-on'}
      openGraphType={'website'}
      image={season.image}
    >
      <ContentPage
        id={season.id}
        Header={Header}
        Body={<Body body={season.body} pageId={season.id} />}
        hideContributors={true}
      />

      {allItems.length > 0 && (
        <SpacingSection>
          <SpacingComponent>
            <CardGrid items={allItems} itemsPerRow={3} />
          </SpacingComponent>
        </SpacingSection>
      )}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const { id } = context.query;
    if (!looksLikePrismicId(id)) {
      return { notFound: true };
    }

    const client = createClient(context);

    // TODO: Is there a reason we're hard-coding predicates here, and not
    // using the Prismic library helpers as on the other pages?
    const booksQueryPromise = fetchBooks(client, {
      predicates: [`[at(my.books.seasons.season, "${id}")]`],
    });
    const articlesQueryPromise = fetchArticles(client, {
      predicates: [`[at(my.articles.seasons.season, "${id}")]`],
    });
    const eventsQueryPromise = fetchEvents(client, {
      predicates: [`[at(my.events.seasons.season, "${id}")]`],
      orderings: ['my.events.times.startDateTime'],
    });
    const exhibitionsQueryPromise = fetchExhibitions(client, {
      predicates: [`[at(my.exhibitions.seasons.season, "${id}")]`],
      order: 'desc',
    });
    const pagesQueryPromise = fetchPages(client, {
      predicates: [`[at(my.pages.seasons.season, "${id}")]`],
    });
    const projectsQueryPromise = fetchProjects(client, {
      predicates: [`[at(my.projects.seasons.season, "${id}")]`],
    });
    const seriesQueryPromise = fetchSeries(client, {
      predicates: [`[at(my.series.seasons.season, "${id}")]`],
    });

    const seasonDocPromise = fetchSeason(client, id);

    const [
      articlesQuery,
      booksQuery,
      eventsQuery,
      exhibitionsQuery,
      pagesQuery,
      projectsQuery,
      seriesQuery,
      seasonDoc,
    ] = await Promise.all([
      articlesQueryPromise,
      booksQueryPromise,
      eventsQueryPromise,
      exhibitionsQueryPromise,
      pagesQueryPromise,
      projectsQueryPromise,
      seriesQueryPromise,
      seasonDocPromise,
    ]);

    const articles = transformQuery(articlesQuery, article =>
      transformArticleToArticleBasic(transformArticle(article))
    );
    const books = transformQuery(booksQuery, book =>
      transformBookToBookBasic(transformBook(book))
    );
    const events = transformQuery(eventsQuery, event =>
      transformEventToEventBasic(transformEvent(event))
    );
    const exhibitions = transformExhibitionsQuery(exhibitionsQuery);

    const pages = transformQuery(pagesQuery, transformPage);
    const projects = transformQuery(projectsQuery, transformProject);
    const series = transformQuery(seriesQuery, transformSeries);
    const season = seasonDoc && transformSeason(seasonDoc);

    if (season) {
      const jsonLd = contentLd(season);
      const serverData = await getServerData(context);
      return {
        props: {
          season,
          articles: articles.results,
          books: books.results,
          events: events.results,
          exhibitions: exhibitions.results,
          pages: pages.results,
          projects: projects.results,
          series: series.results,
          jsonLd,
          serverData,
        },
      };
    } else {
      return { notFound: true };
    }
  };

export default SeasonPage;
