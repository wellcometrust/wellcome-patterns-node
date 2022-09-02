import { FC } from 'react';
import { classNames } from '@weco/common/utils/classnames';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import { ArticleBasic } from '../types/articles';
import { Series } from '../types/series';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import Space from '@weco/common/views/components/styled/Space';
import {
  prismicPageIds,
  featuredStoriesSeriesId,
} from '@weco/common/data/hardcoded-ids';
import FeaturedText from '../components/FeaturedText/FeaturedText';
import { defaultSerializer } from '../components/HTMLSerializers/HTMLSerializers';
import {
  getPageFeaturedText,
  transformPage,
} from '../services/prismic/transformers/pages';
import { FeaturedText as FeaturedTextType } from '../types/text';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import { GetServerSideProps } from 'next';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import StoryPromo from '../components/StoryPromo/StoryPromo';
import CardGrid from '../components/CardGrid/CardGrid';
import { FeaturedCardArticle } from '../components/FeaturedCard/FeaturedCard';
import { articleLd } from '../services/prismic/transformers/json-ld';
import { createClient } from '../services/prismic/fetch';
import { fetchArticles } from '../services/prismic/fetch/articles';
import { fetchFeaturedBooks } from '../services/prismic/fetch/featured-books';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformArticle,
  transformArticleToArticleBasic,
} from '../services/prismic/transformers/articles';
import { fetchPage } from '../services/prismic/fetch/pages';
import {
  pageDescriptions,
  booksPromoOnStoriesPage,
} from '@weco/common/data/microcopy';
import * as prismic from '@prismicio/client';
import { transformArticleSeries } from '../services/prismic/transformers/article-series';
import { transformFeaturedBooks } from '../services/prismic/transformers/featured-books';
import { transformBookToBookBasic } from '../services/prismic/transformers/books';
import { BookBasic } from '../types/books';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

type Props = {
  articles: ArticleBasic[];
  series: Series;
  featuredText?: FeaturedTextType;
  featuredBooks: BookBasic[];
  jsonLd: JsonLdObj[];
};

const SerialisedSeries = ({ series }: { series: Series }) => {
  return (
    <div>
      <Layout12>
        <Space v={{ size: 'xl', properties: ['margin-bottom'] }}>
          <h2
            className={classNames({
              h1: true,
              [`font-${series.color}`]: true,
              'plain-link': true,
              'no-margin': true,
            })}
          >
            <a
              className={classNames({
                'plain-link': true,
              })}
              href={`/series/${series.id}`}
            >
              {series.title}
            </a>
          </h2>
          <Space v={{ size: 'm', properties: ['margin-top'] }}>
            <p
              className={classNames({
                'no-margin': true,
              })}
            >
              {series.promo?.caption}
            </p>
          </Space>
        </Space>
      </Layout12>
      <CardGrid
        items={series.items as ArticleBasic[]}
        hidePromoText={true}
        itemsPerRow={3}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);

    const client = createClient(context);

    const articlesQueryPromise = fetchArticles(client);
    const featuredBooksPromise = fetchFeaturedBooks(client);

    // TODO: If we're only looking up this page to get the featured text slice,
    // would it be faster to skip all the fetchLinks?  Is that possible?
    const storiesPagePromise = fetchPage(client, prismicPageIds.stories);

    const featuredSeriesArticlesQueryPromise = fetchArticles(client, {
      predicates: [
        prismic.predicate.at(
          'my.articles.series.series',
          featuredStoriesSeriesId
        ),
      ],
      page: 1,
      pageSize: 100,
    });

    const [
      articlesQuery,
      featuredSeriesArticles,
      storiesPage,
      featuredBooksDoc,
    ] = await Promise.all([
      articlesQueryPromise,
      featuredSeriesArticlesQueryPromise,
      storiesPagePromise,
      featuredBooksPromise,
    ]);

    const articles = transformQuery(articlesQuery, transformArticle);
    const jsonLd = articles.results.map(articleLd);
    const basicArticles = articles.results.map(transformArticleToArticleBasic);

    const featuredBooks = transformFeaturedBooks(featuredBooksDoc).map(
      transformBookToBookBasic
    );

    // The featured series and stories page should always exist
    const series = transformArticleSeries(
      featuredStoriesSeriesId,
      featuredSeriesArticles
    )!.series;
    const featuredText = getPageFeaturedText(transformPage(storiesPage!));

    if (articles && articles.results) {
      return {
        props: {
          articles: basicArticles,
          series,
          featuredText,
          serverData,
          featuredBooks,
          jsonLd,
        },
      };
    } else {
      return { notFound: true };
    }
  };

const StoriesPage: FC<Props> = ({
  series,
  articles,
  featuredText,
  featuredBooks,
  jsonLd,
}) => {
  const firstArticle = articles[0];

  return (
    <PageLayout
      title={'Stories'}
      description={pageDescriptions.stories}
      url={{ pathname: `/stories` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'stories'}
      image={firstArticle && firstArticle.image}
      rssUrl={'https://rss.wellcomecollection.org/stories'}
    >
      <PageHeader
        breadcrumbs={{ items: [] }}
        title={'Stories'}
        isContentTypeInfoBeforeMedia={false}
        sectionLevelPage={true}
      />
      <>
        {featuredText && featuredText.value && (
          <Layout8 shift={false}>
            <div className="body-text spaced-text">
              <Space
                v={{
                  size: 'xl',
                  properties: ['margin-bottom'],
                }}
              >
                <FeaturedText
                  html={featuredText.value}
                  htmlSerializer={defaultSerializer}
                />
              </Space>
            </div>
          </Layout8>
        )}
      </>

      <SpacingSection>
        <div
          className={classNames({
            'row bg-cream row--has-wobbly-background': true,
          })}
        >
          <Space v={{ size: 'xl', properties: ['margin-bottom'] }}>
            <Layout12>
              <FeaturedCardArticle
                article={firstArticle}
                background={'charcoal'}
                color={'white'}
              />
            </Layout12>
          </Space>
          <div className="row__wobbly-background" />
          <div className="container container--scroll container--scroll-cream touch-scroll">
            <Space v={{ size: 'l', properties: ['padding-bottom'] }}>
              <div className="grid grid--scroll grid--theme-4 card-theme card-theme--transparent">
                {articles.slice(1, 5).map((article, i) => {
                  return (
                    <div className="grid__cell" key={article.id}>
                      <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
                        <StoryPromo article={article} position={i} />
                      </Space>
                    </div>
                  );
                })}
              </div>
            </Space>
          </div>
        </div>
      </SpacingSection>

      <SpacingSection>
        <SerialisedSeries series={series} />
      </SpacingSection>

      {/* TODO: work out logic for making these dynamic */}
      <SpacingSection>
        <SpacingComponent>
          <SectionHeader title="Books" />
        </SpacingComponent>
        <SpacingComponent>
          <Layout12>
            <p>{booksPromoOnStoriesPage}</p>
          </Layout12>
        </SpacingComponent>
        <SpacingComponent>
          <CardGrid
            items={featuredBooks}
            itemsPerRow={3}
            links={[{ text: 'More books', url: '/books' }]}
          />
        </SpacingComponent>
      </SpacingSection>

      <SpacingSection>
        <SpacingComponent>
          <SectionHeader title="You may have missed" />
        </SpacingComponent>
        <SpacingComponent>
          <CardGrid
            items={articles.slice(5, 11)}
            itemsPerRow={3}
            links={[{ text: 'More stories', url: '/articles' }]}
          />
        </SpacingComponent>
      </SpacingSection>
    </PageLayout>
  );
};

export default StoriesPage;
