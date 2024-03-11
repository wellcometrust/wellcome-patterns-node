import { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Space from '@weco/common/views/components/styled/Space';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import SearchNoResults from '@weco/content/components/SearchNoResults/SearchNoResults';
import WorksSearchResults from '@weco/content/components/WorksSearchResults/WorksSearchResults';
import Pagination from '@weco/content/components/Pagination/Pagination';
import Sort from '@weco/content/components/Sort/Sort';
import SearchFilters from '@weco/content/components/SearchFilters';
import PaginationWrapper from '@weco/common/views/components/styled/PaginationWrapper';
import { getSearchLayout } from '@weco/content/components/SearchPageLayout/SearchPageLayout';
import {
  fromQuery,
  toLink,
  WorksProps as WorksRouteProps,
} from '@weco/content/components/SearchPagesLink/Works';
import { Container } from '@weco/common/views/components/styled/Container';
import { serialiseProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { NextPageWithLayout } from '@weco/common/views/pages/_app';
import { Pageview } from '@weco/common/services/conversion/track';
import { getWorks } from '@weco/content/services/wellcome/catalogue/works';
import { worksFilters } from '@weco/content/services/wellcome/catalogue/filters';
import {
  emptyResultList,
  WellcomeResultList,
} from '@weco/content/services/wellcome';
import convertUrlToString from '@weco/common/utils/convert-url-to-string';
import { linkResolver, SEARCH_PAGES_FORM_ID } from '@weco/common/utils/search';
import { getActiveFiltersLabel, hasFilters } from '@weco/content/utils/search';
import { AppErrorProps, appError } from '@weco/common/services/app';
import { pluralize } from '@weco/common/utils/grammar';
import { cacheTTL, setCacheControl } from '@weco/content/utils/setCacheControl';
import { looksLikeSpam } from '@weco/content/utils/spam-detector';
import {
  toWorkBasic,
  WorkAggregations,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import { Query } from '@weco/content/types/search';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';
import { usePathname } from 'next/navigation';

type Props = {
  works: WellcomeResultList<WorkBasic, WorkAggregations>;
  worksRouteProps: WorksRouteProps;
  query: Query;
  pageview: Pageview;
  apiToolbarLinks: ApiToolbarLink[];
};

const SortPaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const CatalogueSearchPage: NextPageWithLayout<Props> = ({
  works,
  worksRouteProps,
  query,
}) => {
  const { query: queryString } = query;

  const { setLink } = useContext(SearchContext);
  const pathname = usePathname();
  useEffect(() => {
    const link = toLink(
      { ...worksRouteProps },
      `works_search_context_${pathname}`
    );
    setLink(link);
  }, [worksRouteProps]);

  const filters = worksFilters({ works, props: worksRouteProps });

  const hasNoResults = works.totalResults === 0;
  const hasActiveFilters = hasFilters({
    filters: [
      ...filters.map(f => f.id),
      // production.dates is one dropdown but two properties, so we're specifying them in their individual format
      'production.dates.from',
      'production.dates.to',
    ],
    queryParams: query,
  });

  const activeFiltersLabels = getActiveFiltersLabel({ filters });

  return (
    <>
      <Head>
        {works.prevPage && (
          <link
            rel="prev"
            href={convertUrlToString(
              toLink(
                { ...worksRouteProps, page: (worksRouteProps.page || 1) - 1 },
                `search/paginator_${pathname}`
              ).as
            )}
          />
        )}
        {works.nextPage && (
          <link
            rel="next"
            href={convertUrlToString(
              toLink(
                { ...worksRouteProps, page: worksRouteProps.page + 1 },
                `search/paginator_${pathname}`
              ).as
            )}
          />
        )}
      </Head>

      <Space $v={{ size: 'l', properties: ['padding-bottom'] }}>
        <Container>
          {(!hasNoResults || (hasNoResults && hasActiveFilters)) && (
            <>
              <Space
                $v={{
                  size: 'l',
                  properties: ['padding-top', 'padding-bottom'],
                }}
              >
                <SearchFilters
                  query={queryString}
                  linkResolver={params =>
                    linkResolver({ params, pathname: '/search/works' })
                  }
                  searchFormId={SEARCH_PAGES_FORM_ID}
                  changeHandler={() => {
                    const form = document.getElementById(SEARCH_PAGES_FORM_ID);
                    form &&
                      form.dispatchEvent(
                        new window.Event('submit', {
                          cancelable: true,
                          bubbles: true,
                        })
                      );
                  }}
                  filters={filters}
                  hasNoResults={hasNoResults}
                />
              </Space>
            </>
          )}

          {hasNoResults ? (
            <SearchNoResults
              query={queryString}
              hasFilters={hasActiveFilters}
            />
          ) : (
            <>
              <PaginationWrapper $verticalSpacing="l">
                <span role="status">
                  {pluralize(works.totalResults, 'result')}
                  {activeFiltersLabels.length > 0 && (
                    <span className="visually-hidden">
                      {' '}
                      filtered with: {activeFiltersLabels.join(', ')}
                    </span>
                  )}
                </span>

                <SortPaginationWrapper>
                  <Sort
                    formId={SEARCH_PAGES_FORM_ID}
                    options={[
                      // Default value to be left empty so it's not added to the URL query
                      { value: '', text: 'Relevance' },
                      {
                        value: 'production.dates.asc',
                        text: 'Oldest to newest',
                      },
                      {
                        value: 'production.dates.desc',
                        text: 'Newest to oldest',
                      },
                    ]}
                    jsLessOptions={{
                      sort: [
                        { value: '', text: 'Relevance' },
                        {
                          value: 'production.dates',
                          text: 'Production dates',
                        },
                      ],
                      sortOrder: [
                        { value: 'asc', text: 'Ascending' },
                        { value: 'desc', text: 'Descending' },
                      ],
                    }}
                    defaultValues={{
                      sort: worksRouteProps.sort,
                      sortOrder: worksRouteProps.sortOrder,
                    }}
                  />

                  <Pagination
                    formId={SEARCH_PAGES_FORM_ID}
                    totalPages={works.totalPages}
                    ariaLabel="Catalogue search pagination"
                    isHiddenMobile
                  />
                </SortPaginationWrapper>
              </PaginationWrapper>

              <main>
                <WorksSearchResults works={works.results} />
              </main>

              <PaginationWrapper $verticalSpacing="l" $alignRight>
                <Pagination
                  formId={SEARCH_PAGES_FORM_ID}
                  totalPages={works.totalPages}
                  ariaLabel="Catalogue search pagination"
                />
              </PaginationWrapper>
            </>
          )}
        </Container>
      </Space>
    </>
  );
};

CatalogueSearchPage.getLayout = getSearchLayout;

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res, cacheTTL.search);
  const serverData = await getServerData(context);
  const query = context.query;
  const params = fromQuery(query);

  const defaultProps = serialiseProps({
    serverData,
    worksRouteProps: params,
    query,
  });

  // If the request looks like spam, return a 400 error and skip actually fetching
  // the data from the APIs.
  //
  // Users will still see a meaningful error page with instructions about tweaking
  // their query/telling us if they expected results, but they won't be causing load
  // on our back-end APIs.
  //
  // The status code will also allow us to filter out spam-like requests from our analytics.
  if (looksLikeSpam(query.query)) {
    context.res.statusCode = 400;
    return {
      props: serialiseProps({
        ...defaultProps,
        works: emptyResultList(),
        pageview: {
          name: 'works',
          properties: {
            looksLikeSpam: 'true',
          },
        },
        apiToolbarLinks: [],
      }),
    };
  }

  const aggregations = serverData.toggles.aggregationsInSearch?.value
    ? [
        'workType',
        'availabilities',
        'genres.label',
        'languages',
        'subjects.label',
        'contributors.agent.label',
      ]
    : [];

  const worksApiProps = {
    ...params,
    aggregations,
  };

  const works = await getWorks({
    params: worksApiProps,
    pageSize: 25,
    toggles: serverData.toggles,
  });

  if (works.type === 'Error') {
    return appError(
      context,
      works.httpStatus,
      works.description || works.label
    );
  }

  return {
    props: serialiseProps({
      ...defaultProps,
      works: {
        ...works,
        results: works.results.map(toWorkBasic),
      },
      pageview: {
        name: 'works',
        properties: { totalResults: works.totalResults },
      },
      apiToolbarLinks: [
        {
          id: 'catalogue-api',
          label: 'Catalogue API query',
          link: works._requestUrl,
        },
      ],
    }),
  };
};
export default CatalogueSearchPage;
