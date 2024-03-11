import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { getSearchLayout } from '@weco/content/components/SearchPageLayout/SearchPageLayout';
import Pagination from '@weco/content/components/Pagination/Pagination';
import SearchNoResults from '@weco/content/components/SearchNoResults/SearchNoResults';
import Sort from '@weco/content/components/Sort/Sort';
import PaginationWrapper from '@weco/common/views/components/styled/PaginationWrapper';
import StoriesGrid from '@weco/content/components/StoriesGrid';
import Space from '@weco/common/views/components/styled/Space';
import SearchFilters from '@weco/content/components/SearchFilters';
import { Container } from '@weco/common/views/components/styled/Container';
import { NextPageWithLayout } from '@weco/common/views/pages/_app';
import { serialiseProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { getServerData } from '@weco/common/server-data';
import { Pageview } from '@weco/common/services/conversion/track';
import { pluralize } from '@weco/common/utils/grammar';
import {
  getQueryPropertyValue,
  linkResolver,
  SEARCH_PAGES_FORM_ID,
} from '@weco/common/utils/search';
import { getActiveFiltersLabel, hasFilters } from '@weco/content/utils/search';
import { getArticles } from '@weco/content/services/wellcome/content/articles';
import { cacheTTL, setCacheControl } from '@weco/content/utils/setCacheControl';
import { looksLikeSpam } from '@weco/content/utils/spam-detector';
import { Query } from '@weco/content/types/search';
import {
  Article,
  ContentResultsList,
} from '@weco/content/services/wellcome/content/types/api';
import { emptyResultList } from '@weco/content/services/wellcome';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';
import {
  fromQuery,
  StoriesProps,
} from '@weco/content/components/SearchPagesLink/Stories';
import { storiesFilters } from '@weco/content/services/wellcome/catalogue/filters';

type Props = {
  storyResponseList: ContentResultsList<Article>;
  query: Query;
  pageview: Pageview;
  apiToolbarLinks: ApiToolbarLink[];
  storiesRouteProps: StoriesProps;
};

const Wrapper = styled(Space)`
  background-color: ${props => props.theme.color('neutral.200')};
`;

const SortPaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${props => props.theme.media('medium', 'max-width')`
    flex: 1 1 50%;
    justify-content: flex-end;
  `}
`;

export const StoriesSearchPage: NextPageWithLayout<Props> = ({
  storyResponseList,
  query,
  storiesRouteProps,
}) => {
  const { query: queryString } = query;

  const filters = storiesFilters({
    stories: storyResponseList,
    props: storiesRouteProps,
  });

  const hasNoResults = storyResponseList.totalResults === 0;
  const hasActiveFilters = hasFilters({
    filters: filters.map(f => f.id),
    queryParams: query,
  });

  const activeFiltersLabels = getActiveFiltersLabel({ filters });

  const sortOptions = [
    // Default value to be left empty as to not be reflected in URL query
    {
      value: '',
      text: 'Relevance',
    },
    {
      value: 'publicationDate.asc',
      text: 'Oldest to newest',
    },
    {
      value: 'publicationDate.desc',
      text: 'Newest to oldest',
    },
  ];

  return (
    <Space $v={{ size: 'l', properties: ['padding-bottom'] }}>
      {(!hasNoResults || (hasNoResults && hasActiveFilters)) && (
        <Container>
          <Space
            $v={{ size: 'l', properties: ['padding-top', 'padding-bottom'] }}
          >
            <SearchFilters
              query={queryString}
              linkResolver={params =>
                linkResolver({ params, pathname: '/search/stories' })
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
        </Container>
      )}
      {storyResponseList && (
        <Wrapper>
          {hasNoResults ? (
            <Container>
              <SearchNoResults
                query={queryString}
                hasFilters={hasActiveFilters}
              />
            </Container>
          ) : (
            <Container>
              <PaginationWrapper $verticalSpacing="l">
                <span role="status">
                  {pluralize(storyResponseList.totalResults, 'result')}
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
                    options={sortOptions}
                    jsLessOptions={{
                      sort: [
                        {
                          value: '',
                          text: 'Relevance',
                        },
                        {
                          value: 'publicationDate',
                          text: 'Publication date',
                        },
                      ],
                      sortOrder: [
                        { value: 'asc', text: 'Ascending' },
                        { value: 'desc', text: 'Descending' },
                      ],
                    }}
                    defaultValues={{
                      sort: query.sort,
                      sortOrder: query.sortOrder,
                    }}
                  />
                  <Pagination
                    formId={SEARCH_PAGES_FORM_ID}
                    totalPages={storyResponseList.totalPages}
                    ariaLabel="Stories search pagination"
                    isHiddenMobile
                  />
                </SortPaginationWrapper>
              </PaginationWrapper>

              <main>
                <StoriesGrid
                  isDetailed
                  articles={storyResponseList.results}
                  dynamicImageSizes={{
                    xlarge: 1 / 5,
                    large: 1 / 5,
                    medium: 1 / 5,
                    small: 1,
                  }}
                />
              </main>

              <PaginationWrapper $verticalSpacing="l" $alignRight>
                <Pagination
                  formId={SEARCH_PAGES_FORM_ID}
                  totalPages={storyResponseList.totalPages}
                  ariaLabel="Stories search pagination"
                />
              </PaginationWrapper>
            </Container>
          )}
        </Wrapper>
      )}
    </Space>
  );
};

StoriesSearchPage.getLayout = getSearchLayout;

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res, cacheTTL.search);
  const serverData = await getServerData(context);
  const query = context.query;
  const params = fromQuery(query);
  const defaultProps = serialiseProps({
    storiesRouteProps: params,
    serverData,
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
        storyResponseList: emptyResultList(),
        pageview: {
          name: 'stories',
          properties: {
            looksLikeSpam: 'true',
          },
        },
        apiToolbarLinks: [],
      }),
    };
  }

  // Sending page=1 to Prismic skips the two first results, which seems to have to do with the cursor work
  // This is a workaround that ensures we only send the page if relevant
  const { page, ...restOfQuery } = query;
  const pageNumber = page !== '1' && getQueryPropertyValue(page);

  const storyResponseList = await getArticles({
    params: {
      ...restOfQuery,
      sort: getQueryPropertyValue(query.sort),
      sortOrder: getQueryPropertyValue(query.sortOrder),
      ...(pageNumber && { page: Number(pageNumber) }),
      aggregations: ['format', 'contributors.contributor'],
    },
    pageSize: 25,
    toggles: serverData.toggles,
  });

  if (storyResponseList?.type === 'Error') {
    return appError(context, storyResponseList.httpStatus, 'Content API error');
  }

  return {
    props: serialiseProps({
      ...defaultProps,
      storyResponseList,
      pageview: {
        name: 'stories',
        properties: {
          totalResults: storyResponseList?.totalResults ?? 0,
        },
      },
      apiToolbarLinks: [
        {
          id: 'content-api',
          label: 'Content API query',
          link: storyResponseList._requestUrl,
        },
      ],
    }),
  };
};

export default StoriesSearchPage;
