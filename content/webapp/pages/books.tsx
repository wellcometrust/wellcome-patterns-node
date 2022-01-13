import type { GetServerSideProps } from 'next';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import { convertImageUri } from '@weco/common/utils/convert-image-uri';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { FunctionComponent } from 'react';
import { getServerData } from '@weco/common/server-data';
import { isString } from '@weco/common/utils/array';
import { createClient } from '../services/prismic/fetch';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import { transformBook } from '../services/prismic/transformers/books';
import { fetchBooks } from '../services/prismic/fetch/books';
import { Book } from '../types/books';

type Props = {
  books: PaginatedResults<Book>;
};

const pageDescription =
  'We publish thought-provoking books exploring health and human experiences.';

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const { page = '1' } = context.query;
    if (!isString(page)) {
      return { notFound: true };
    }
    const parsedPage = parseInt(page, 10);
    if (isNaN(parsedPage)) {
      return appError(context, 400, `${page} is not a number`);
    }

    const client = createClient(context);
    const booksQuery = await fetchBooks(client, {
      page: parsedPage,
      pageSize: 21,
    });
    const books = transformQuery(booksQuery, transformBook);

    const serverData = await getServerData(context);
    if (books) {
      return {
        props: removeUndefinedProps({
          books,
          serverData,
        }),
      };
    } else {
      return { notFound: true };
    }
  };
const BooksPage: FunctionComponent<Props> = props => {
  const { books } = props;
  const firstBook = books.results[0];

  return (
    <PageLayout
      title={'Books'}
      description={pageDescription}
      url={{ pathname: `/books` }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'website'}
      siteSection={null}
      imageUrl={
        firstBook &&
        firstBook.image &&
        convertImageUri(firstBook.image.contentUrl, 800)
      }
      imageAltText={
        (firstBook && firstBook.image && firstBook.image.alt) ?? undefined
      }
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={'Books'}
          description={[
            {
              type: 'paragraph',
              text: pageDescription,
              spans: [],
            },
          ]}
          paginatedResults={books}
          paginationRoot={'books'}
        />
      </SpacingSection>
    </PageLayout>
  );
};

export default BooksPage;
