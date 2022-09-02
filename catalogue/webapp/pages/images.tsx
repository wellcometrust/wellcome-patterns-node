import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState, ReactElement, useContext } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { CatalogueResultsList, Image } from '@weco/common/model/catalogue';
import { grid, classNames } from '@weco/common/utils/classnames';
import convertUrlToString from '@weco/common/utils/convert-url-to-string';
import CataloguePageLayout from '../components/CataloguePageLayout/CataloguePageLayout';
import Paginator from '@weco/common/views/components/Paginator/Paginator';
import { imagesRouteToApiUrl } from '@weco/common/services/catalogue/api';
import Space from '@weco/common/views/components/styled/Space';
import ImageEndpointSearchResults from '../components/ImageEndpointSearchResults/ImageEndpointSearchResults';
import { getImages } from '../services/catalogue/images';
import SearchTabs from '@weco/common/views/components/SearchTabs/SearchTabs';
import SearchNoResults from '../components/SearchNoResults/SearchNoResults';
import SearchTitle from '../components/SearchTitle/SearchTitle';
import {
  appError,
  AppErrorProps,
  WithPageview,
} from '@weco/common/views/pages/_app';
import {
  fromQuery,
  ImagesProps,
  toLink,
} from '@weco/common/views/components/ImagesLink/ImagesLink';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import { imagesFilters } from '@weco/common/services/catalogue/filters';
import { getServerData } from '@weco/common/server-data';

type Props = {
  images?: CatalogueResultsList<Image>;
  imagesRouteProps: ImagesProps;
} & WithPageview;

type ImagesPaginationProps = {
  query?: string;
  page?: number;
  results: CatalogueResultsList<Image>;
  imagesRouteProps: ImagesProps;
  hideMobilePagination?: boolean;
  hideMobileTotalResults?: boolean;
};

const ImagesPagination = ({
  query,
  page,
  results,
  imagesRouteProps,
  hideMobilePagination,
  hideMobileTotalResults,
}: ImagesPaginationProps) => (
  <div className="flex flex--h-space-between flex--v-center flex--wrap">
    <Paginator
      query={query}
      showPortal={false}
      currentPage={page || 1}
      pageSize={results.pageSize}
      totalResults={results.totalResults}
      link={toLink(
        {
          ...imagesRouteProps,
        },
        'search/paginator'
      )}
      onPageChange={async (event, newPage) => {
        event.preventDefault();
        const state = {
          ...imagesRouteProps,
          page: newPage,
        };
        const link = toLink({ ...state }, 'search/paginator');
        Router.push(link.href, link.as).then(() => window.scrollTo(0, 0));
      }}
      hideMobilePagination={hideMobilePagination}
      hideMobileTotalResults={hideMobileTotalResults}
    />
  </div>
);

const Images: NextPage<Props> = ({
  images,
  imagesRouteProps,
}): ReactElement<Props> => {
  const [loading, setLoading] = useState(false);
  const { query, page, color } = imagesRouteProps;
  useEffect(() => {
    function routeChangeStart() {
      setLoading(true);
    }
    function routeChangeComplete() {
      setLoading(false);
    }
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  const filters = images
    ? imagesFilters({ images, props: imagesRouteProps })
    : [];

  const { setLink } = useContext(SearchContext);
  useEffect(() => {
    const link = toLink(
      {
        ...imagesRouteProps,
      },
      'images_search_context'
    );
    setLink(link);
  }, [imagesRouteProps]);

  return (
    <>
      <Head>
        {images?.prevPage && (
          <link
            rel="prev"
            href={convertUrlToString(
              toLink({ ...imagesRouteProps, page: (page || 1) - 1 }, 'unknown')
                .as
            )}
          />
        )}
        {images?.nextPage && (
          <link
            rel="next"
            href={convertUrlToString(
              toLink({ ...imagesRouteProps, page: page + 1 }, 'unknown').as
            )}
          />
        )}
      </Head>
      <CataloguePageLayout
        title={`${query ? `${query} | ` : ''}Image search`}
        description="Search Wellcome Collection images"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        url={toLink({ ...imagesRouteProps, source: 'canonical_link' }).as}
        openGraphType={'website'}
        jsonLd={{ '@type': 'WebPage' }}
        siteSection={'collections'}
        image={undefined}
      >
        <Space
          v={{
            size: 'l',
            properties: ['padding-bottom'],
          }}
          className={classNames(['row'])}
        >
          <div className="container">
            <SearchTitle isVisuallyHidden={Boolean(images)} />

            <div className="grid">
              <div className={grid({ s: 12, m: 12, l: 12, xl: 12 })}>
                <Space v={{ size: 'l', properties: ['margin-top'] }}>
                  <SearchTabs
                    query={imagesRouteProps.query}
                    sort={undefined}
                    sortOrder={undefined}
                    shouldShowDescription={query === ''}
                    activeTabIndex={1}
                    shouldShowFilters={true}
                    showSortBy={Boolean(images)}
                    imagesFilters={filters}
                    worksFilters={[]}
                  />
                </Space>
              </div>
            </div>
          </div>
        </Space>
        {images?.results && images.results.length > 0 && (
          <>
            <Space v={{ size: 'l', properties: ['padding-top'] }}>
              <div className="container">
                <div className="grid">
                  <div
                    className={classNames({
                      [grid({ s: 12, m: 12, l: 12, xl: 12 })]: true,
                    })}
                  >
                    <ImagesPagination
                      query={query}
                      page={page}
                      results={images}
                      imagesRouteProps={imagesRouteProps}
                      hideMobilePagination={true}
                    />
                  </div>
                </div>
              </div>
            </Space>

            <Space
              v={{
                size: 'l',
                properties: ['padding-top'],
              }}
              style={{ opacity: loading ? 0 : 1 }}
            >
              <div className="container">
                {images && <ImageEndpointSearchResults images={images} />}
              </div>

              <Space
                v={{
                  size: 'l',
                  properties: ['padding-top', 'padding-bottom'],
                }}
              >
                <div className="container">
                  <div className="grid">
                    <div
                      className={classNames({
                        [grid({ s: 12, m: 12, l: 12, xl: 12 })]: true,
                      })}
                    >
                      <ImagesPagination
                        query={query}
                        page={page}
                        results={images}
                        imagesRouteProps={imagesRouteProps}
                        hideMobileTotalResults={true}
                      />
                    </div>
                  </div>
                </div>
              </Space>
            </Space>
          </>
        )}
        {images?.results.length === 0 && (
          <SearchNoResults query={query} hasFilters={!!color} />
        )}
      </CataloguePageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const params = fromQuery(context.query);
    const aggregations = [
      'locations.license',
      'source.genres.label',
      'source.subjects.label',
      'source.contributors.agent.label',
    ];
    const apiProps = imagesRouteToApiUrl(params, { aggregations });
    const images = await getImages({
      params: apiProps,
      toggles: serverData.toggles,
      pageSize: 25,
    });

    if (images && images.type === 'Error') {
      return appError(context, images.httpStatus, 'Images API error');
    }

    return {
      props: {
        serverData,
        images,
        imagesRouteProps: params,
        pageview: {
          name: 'images',
          properties: images
            ? {
                totalResults: images.totalResults,
              }
            : {},
        },
      },
    };
  };

export default Images;
