import type { GetServerSideProps } from 'next';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '../components/LayoutPaginatedResults/LayoutPaginatedResults';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import { appError, AppErrorProps } from '@weco/common/views/pages/_app';
import { FunctionComponent } from 'react';
import { getServerData } from '@weco/common/server-data';
import { createClient } from '../services/prismic/fetch';
import { transformQuery } from '../services/prismic/transformers/paginated-results';
import {
  transformBook,
  transformBookToBookBasic,
} from '../services/prismic/transformers/books';
import { fetchBooks } from '../services/prismic/fetch/books';
import { BookBasic } from '../types/books';
import { getPage } from '../utils/query-params';
import { pageDescriptions } from '@weco/common/data/microcopy';

type Props = {
  books: PaginatedResults<BookBasic>;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const page = getPage(context.query);
    if (typeof page !== 'number') {
      return appError(context, 400, page.message);
    }

    const client = createClient(context);
    const booksQuery = await fetchBooks(client, {
      page,
      pageSize: 21,
    });

    const books = transformQuery(booksQuery, book =>
      transformBookToBookBasic(transformBook(book))
    );

    const serverData = await getServerData(context);
    if (books) {
      return {
        props: {
          books,
          serverData,
        },
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
      description={pageDescriptions.books}
      url={{ pathname: `/books` }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'website'}
      siteSection={null}
      image={firstBook && firstBook.cover}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          showFreeAdmissionMessage={false}
          title={'Books'}
          description={[
            {
              type: 'paragraph',
              text: pageDescriptions.books,
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
