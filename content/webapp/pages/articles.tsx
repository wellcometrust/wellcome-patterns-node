import { ArticleBasic } from '../types/articles';
import type { PaginatedResults } from '@weco/common/services/prismic/types';
import { createClient } from '../services/prismic/fetch';
import { fetchArticles } from '../services/prismic/fetch/articles';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformArticle,
  transformArticleToArticleBasic,
} from '../services/prismic/transformers/articles';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import { articleLd } from '../services/prismic/transformers/json-ld';
import { getPage } from '../utils/query-params';
import { pageDescriptions } from '@weco/common/data/microcopy';
import { JsonLdObj } from '@weco/common/views/components/JsonLd/JsonLd';

type Props = {
  articles: PaginatedResults<ArticleBasic>;
  jsonLd: JsonLdObj[];
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const page = getPage(context.query);

    if (typeof page !== 'number') {
      return appError(context, 400, page.message);
    }

    const client = createClient(context);
    const articlesQuery = await fetchArticles(client, { page });

    const articles = transformQuery(articlesQuery, transformArticle);
    const jsonLd = articles.results.map(articleLd);
    const basicArticles = {
      ...articles,
      results: articles.results.map(transformArticleToArticleBasic),
    };

    const serverData = await getServerData(context);

    return {
      props: {
        articles: basicArticles,
        jsonLd,
        serverData,
      },
    };
  };

const ArticlesPage: FC<Props> = ({ articles, jsonLd }: Props) => {
  // `articles` could be empty if somebody paginates off the end of the list,
  // e.g. /articles?page=500
  const image = articles.results[0]?.image;

  return (
    <PageLayout
      title={'Articles'}
      description={pageDescriptions.articles}
      url={{ pathname: `/articles` }}
      jsonLd={jsonLd}
      openGraphType={'website'}
      siteSection={'stories'}
      image={image}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={'Stories'}
          description={[
            {
              type: 'paragraph',
              text: pageDescriptions.articles,
              spans: [],
            },
          ]}
          paginatedResults={articles}
          paginationRoot={'articles'}
        />
      </SpacingSection>
    </PageLayout>
  );
};

export default ArticlesPage;
