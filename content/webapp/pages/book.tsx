import { GetServerSideProps } from 'next';
import { Fragment, FunctionComponent } from 'react';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import PageHeader from '@weco/common/views/components/PageHeader/PageHeader';
import ButtonSolidLink from '@weco/common/views/components/ButtonSolidLink/ButtonSolidLink';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import { font, grid, classNames } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import BookImage from '../components/BookImage/BookImage';
import styled from 'styled-components';
import { AppErrorProps, WithGaDimensions } from '@weco/common/views/pages/_app';
import { getServerData } from '@weco/common/server-data';
import Body from '../components/Body/Body';
import ContentPage from '../components/ContentPage/ContentPage';
import { fetchBook } from '../services/prismic/fetch/books';
import { createClient } from '../services/prismic/fetch';
import { transformBook } from '../services/prismic/transformers/books';
import { Book } from '../types/books';
import { looksLikePrismicId } from '@weco/common/services/prismic';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';

const MetadataWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.color('smoke')};
`;

type Props = {
  book: Book;
} & WithGaDimensions;

// FIXME: This is nonsense
type BookMetadataProps = { book: Book };
const BookMetadata = ({ book }: BookMetadataProps) => (
  <Space
    v={{
      size: 'm',
      properties: ['margin-top', 'margin-bottom'],
    }}
    as="dl"
    className="grid"
  >
    {book.datePublished && (
      <Fragment>
        <dt className={'no-margin ' + grid({ s: 4, m: 4, l: 4, xl: 4 })}>
          Date published
        </dt>
        <dd className={'no-margin ' + grid({ s: 8, m: 8, l: 8, xl: 8 })}>
          {book.datePublished && (
            <HTMLDate date={new Date(book.datePublished)} />
          )}
        </dd>
      </Fragment>
    )}
    <dt className={'no-margin ' + grid({ s: 4, m: 4, l: 4, xl: 4 })}>Format</dt>
    <dd className={'no-margin ' + grid({ s: 8, m: 8, l: 8, xl: 8 })}>
      {book.format}
    </dd>

    <dt className={'no-margin ' + grid({ s: 4, m: 4, l: 4, xl: 4 })}>Extent</dt>
    <dd className={'no-margin ' + grid({ s: 8, m: 8, l: 8, xl: 8 })}>
      {book.extent}
    </dd>

    <dt className={'no-margin ' + grid({ s: 4, m: 4, l: 4, xl: 4 })}>ISBN</dt>
    <dd className={'no-margin ' + grid({ s: 8, m: 8, l: 8, xl: 8 })}>
      {book.isbn}
    </dd>
  </Space>
);

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const { id } = context.query;
    if (!looksLikePrismicId(id)) {
      return { notFound: true };
    }
    const client = createClient(context);
    const bookDocument = await fetchBook(client, id);

    if (bookDocument) {
      const serverData = await getServerData(context);
      const book = transformBook(bookDocument);

      return {
        props: {
          book,
          serverData,
          gaDimensions: {
            partOf: book.seasons.map(season => season.id),
          },
        },
      };
    }

    return { notFound: true };
  };

const BookPage: FunctionComponent<Props> = props => {
  if (!('book' in props)) return null;

  const { book } = props;
  const FeaturedMedia = book.cover && (
    <Space v={{ size: 'xl', properties: ['margin-top', 'padding-top'] }}>
      <Layout8>
        <BookImage
          image={{ ...book.cover }}
          sizes={{ xlarge: 1 / 3, large: 1 / 3, medium: 1 / 3, small: 1 }}
          quality="low"
        />
      </Layout8>
    </Space>
  );
  const breadcrumbs = {
    items: [
      {
        text: 'Books',
        url: '/books',
      },
      {
        url: `/books/${book.id}`,
        text: book.title,
        isHidden: true,
      },
    ],
  };
  const Header = (
    <PageHeader
      breadcrumbs={breadcrumbs}
      labels={undefined}
      title={book.title}
      FeaturedMedia={FeaturedMedia}
      ContentTypeInfo={
        <Fragment>
          {book.subtitle && (
            <p
              className={classNames({
                'no-margin': true,
                [font('intb', 3)]: true,
              })}
            >
              {book.subtitle}
            </p>
          )}
        </Fragment>
      }
      isContentTypeInfoBeforeMedia={true}
      HeroPicture={undefined}
      Background={undefined}
    />
  );

  return (
    <PageLayout
      title={book.title}
      description={book.metadataDescription || book.promo?.caption || ''}
      url={{ pathname: `/books/${book.id}`, query: {} }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'book'}
      siteSection={null}
      image={book.image}
    >
      <ContentPage
        id={book.id}
        Header={Header}
        Body={<Body body={book.body} pageId={book.id} />}
        contributors={book.contributors}
        seasons={book.seasons}
      >
        <Fragment>
          <MetadataWrapper>
            <BookMetadata book={book} />
          </MetadataWrapper>
          {book.orderLink && (
            <ButtonSolidLink link={book.orderLink} text="Buy the book" />
          )}
        </Fragment>
      </ContentPage>
    </PageLayout>
  );
};

export default BookPage;
