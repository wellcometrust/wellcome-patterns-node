import { FunctionComponent } from 'react';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import { BookBasic } from '@weco/content/types/books';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import LayoutPaginatedResults from '@weco/content/components/LayoutPaginatedResults/LayoutPaginatedResults';
import SpacingSection from '@weco/common/views/components/styled/SpacingSection';
import { pageDescriptions } from '@weco/common/data/microcopy';

type Props = {
  books: PaginatedResults<BookBasic>;
};

const BooksPageComponent: FunctionComponent<Props> = ({ books }) => {
  const firstBook = books.results[0];

  return (
    <PageLayout
      title="Books"
      description={pageDescriptions.books}
      url={{ pathname: '/books' }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType="website"
      siteSection="stories"
      image={firstBook && firstBook.cover}
    >
      <SpacingSection>
        <LayoutPaginatedResults
          title="Books"
          description={pageDescriptions.books}
          paginatedResults={books}
          breadcrumbs={{
            items: [
              {
                text: 'Stories',
                url: '/stories/',
              },
            ],
          }}
        />
      </SpacingSection>
    </PageLayout>
  );
};

export default BooksPageComponent;
