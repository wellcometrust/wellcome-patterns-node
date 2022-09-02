import { GetServerSideProps } from 'next';
import { FC } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import PageHeaderStandfirst from '../components/PageHeaderStandfirst/PageHeaderStandfirst';
import HeaderBackground from '@weco/common/views/components/HeaderBackground/HeaderBackground';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import { getFeaturedMedia } from '../utils/page-header';
import { Series } from '../types/series';
import { ArticleBasic } from '../types/articles';
import { seasonsFields } from '@weco/common/services/prismic/fetch-links';
import { headerBackgroundLs } from '@weco/common/utils/backgrounds';
import { AppErrorProps, WithGaDimensions } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import Body from '../components/Body/Body';
import SearchResults from '../components/SearchResults/SearchResults';
import ContentPage from '../components/ContentPage/ContentPage';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import { createClient } from '../services/prismic/fetch';
import { bodySquabblesSeries } from '@weco/common/data/hardcoded-ids';
import { fetchArticles } from '../services/prismic/fetch/articles';
import * as prismic from '@prismicio/client';
import { transformArticleSeries } from '../services/prismic/transformers/article-series';

type Props = {
  series: Series;
  articles: ArticleBasic[];
} & WithGaDimensions;

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const { id } = context.query;

    if (!looksLikePrismicId(id)) {
      return { notFound: true };
    }

    const client = createClient(context);

    // GOTCHA: This is for a series where we have the `webcomics` type.
    // This will have to remain like this until we figure out how to migrate them.
    // We create new webcomics as an article with comic format, and add
    // an article-series to them.
    const seriesField =
      id === bodySquabblesSeries
        ? 'my.webcomics.series.series'
        : 'my.articles.series.series';

    const articlesQuery = await fetchArticles(client, {
      predicates: [prismic.predicate.at(seriesField, id)],
      page: 1,
      pageSize: 100,
      fetchLinks: seasonsFields,
    });

    // TODO: Currently we don't support pagination on article series, which means
    // anything beyond the first page of results won't be shown.  We should update
    // the design/rendering of this page to fix that.
    //
    // We have at least one series with >100 entries (https://wellcomecollection.org/series/WleP3iQAACUAYEoN);
    // this warning will tell us if there are more.
    //
    // See https://github.com/wellcomecollection/wellcomecollection.org/issues/7633
    if (articlesQuery.total_results_size > articlesQuery.results_size) {
      console.warn(
        `Series ${id} has ${articlesQuery.total_results_size} entries, than fit on a single page; some articles have been omitted`
      );
    }

    // This can occasionally occur if somebody in the Editorial team is
    // trying to preview a series that doesn't have any entries yet.
    //
    // It should never happen for live content so we don't support it;
    // the log is to make it easier to debug if somebody tries it.
    if (articlesQuery.total_results_size === 0) {
      console.warn(`Series ${id} doesn't contain any articles`);
      return { notFound: true };
    }

    const { articles, series } = transformArticleSeries(id, articlesQuery);

    return {
      props: {
        series,
        articles,
        serverData,
        gaDimensions: {
          partOf: series.seasons.map(season => season.id),
        },
      },
    };
  };

const ArticleSeriesPage: FC<Props> = props => {
  const { series, articles } = props;
  const breadcrumbs = {
    items: [
      {
        url: '/stories',
        text: 'Stories',
      },
      {
        url: `/series/${series.id}`,
        text: series.title,
        isHidden: true,
      },
    ],
  };

  const ContentTypeInfo = series.standfirst && (
    <PageHeaderStandfirst html={series.standfirst} />
  );
  const FeaturedMedia = getFeaturedMedia(series);
  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={{ labels: series.labels }}
      title={series.title}
      ContentTypeInfo={ContentTypeInfo}
      Background={
        <HeaderBackground
          hasWobblyEdge={true}
          backgroundTexture={headerBackgroundLs}
        />
      }
      FeaturedMedia={FeaturedMedia}
      HeroPicture={undefined}
      isContentTypeInfoBeforeMedia={true}
    />
  );

  return (
    <PageLayout
      title={series.title}
      description={series.metadataDescription || series.promo?.caption || ''}
      url={{ pathname: `/series/${series.id}` }}
      jsonLd={{ '@type': 'WebPage' }}
      siteSection={'stories'}
      openGraphType={'website'}
      image={series.image}
    >
      <ContentPage
        id={series.id}
        Header={Header}
        Body={<Body body={series.body} pageId={series.id} />}
        contributors={series.contributors}
        seasons={series.seasons}
      >
        {articles.length > 0 && (
          <SearchResults items={series.items} showPosition={true} />
        )}
      </ContentPage>
    </PageLayout>
  );
};

export default ArticleSeriesPage;
