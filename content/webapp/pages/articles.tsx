import type { Article } from '@weco/common/model/articles';
import type { PaginatedResults } from '@weco/common/services/prismic/types';
import { createClient } from '../services/prismic/fetch';
import { fetchArticles } from '../services/prismic/fetch/articles';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import { transformArticle } from '../services/prismic/transformers/articles';
import { convertImageUri } from '@weco/common/utils/convert-image-uri';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { articleLd } from '../services/prismic/transformers/json-ld';
import { getPage } from '../utils/query-params';

type Props = {
  articles: PaginatedResults<Article>;
};

const pageDescription =
  'Our words and pictures explore the connections between science, medicine, life and art. Dive into one no matter where in the world you are.';

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const page = getPage(context.query);

    if (typeof page !== 'number') {
      return appError(context, 400, page.message);
    }

    const client = createClient(context);
    const articlesQuery = await fetchArticles(client, {
      page,
      orderings: [`document.first_publication_date desc`],
    });
    const articles = transformQuery(articlesQuery, transformArticle);
    const serverData = await getServerData(context);

    return {
      props: removeUndefinedProps({
        articles,
        serverData,
      }),
    };
  };

const ArticlesPage: FC<Props> = ({ articles }: Props) => {
  const firstArticle = articles.results[0];

  return (
    <PageLayout
      title={'Articles'}
      description={pageDescription}
      url={{ pathname: `/articles` }}
      jsonLd={articles.results.map(articleLd)}
      openGraphType={'website'}
      siteSection={'stories'}
      imageUrl={
        firstArticle &&
        firstArticle.image &&
        convertImageUri(firstArticle.image.contentUrl, 800)
      }
      imageAltText={
        (firstArticle && firstArticle.image && firstArticle.image.alt) ??
        undefined
      }
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={'Stories'}
          description={[
            {
              type: 'paragraph',
              text: pageDescription,
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
