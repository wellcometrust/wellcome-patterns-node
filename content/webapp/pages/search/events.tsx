import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { getSearchLayout } from '@weco/content/components/SearchPageLayout/SearchPageLayout';
import Pagination from '@weco/content/components/Pagination/Pagination';
import SearchNoResults from '@weco/content/components/SearchNoResults/SearchNoResults';
import Sort from '@weco/content/components/Sort/Sort';
import PaginationWrapper from '@weco/common/views/components/styled/PaginationWrapper';
import Space from '@weco/common/views/components/styled/Space';
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
import { cacheTTL, setCacheControl } from '@weco/content/utils/setCacheControl';
import { looksLikeSpam } from '@weco/content/utils/spam-detector';
import { Query } from '@weco/content/types/search';
import {
  ContentResultsList,
  EventDocument,
} from '@weco/content/services/wellcome/content/types/api';
import { emptyResultList } from '@weco/content/services/wellcome';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';
import {
  fromQuery,
  EventsProps,
} from '@weco/content/components/SearchPagesLink/Events';
import { getEvents } from '@weco/content/services/wellcome/content/events';
import EventsSearchResults from '@weco/content/components/EventsSearchResults';
import SearchFilters from '@weco/content/components/SearchFilters';
import { hasFilters } from '@weco/content/utils/search';
import { eventsFilters } from '@weco/content/services/wellcome/catalogue/filters';

type Props = {
  eventResponseList: ContentResultsList<EventDocument>;
  query: Query;
  pageview: Pageview;
  apiToolbarLinks: ApiToolbarLink[];
  eventsRouteProps: EventsProps;
};

const SortPaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${props => props.theme.media('medium', 'max-width')`
    flex: 1 1 50%;
    justify-content: flex-end;
  `}
`;

export const EventsSearchPage: NextPageWithLayout<Props> = ({
  eventResponseList,
  query,
  eventsRouteProps,
}) => {
  const { query: queryString } = query;

  const filters = eventsFilters({
    events: eventResponseList,
    props: eventsRouteProps,
  });

  const hasNoResults = eventResponseList.totalResults === 0;
  const hasActiveFilters = hasFilters({
    filters: filters.map(f => f.id),
    queryParams: query,
  });

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
                linkResolver({ params, pathname: '/search/events' })
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
      {eventResponseList && (
        <>
          {hasNoResults ? (
            <Container>
              <SearchNoResults query={queryString} />
            </Container>
          ) : (
            <Container>
              <PaginationWrapper $verticalSpacing="l">
                <span role="status">
                  {pluralize(eventResponseList.totalResults, 'result')}
                </span>

                <SortPaginationWrapper>
                  <Sort
                    formId={SEARCH_PAGES_FORM_ID}
                    options={[
                      // Default value to be left empty as to not be reflected in URL query
                      // TODO: 'oldest to newest' and 'newest to oldest' should be changed / option to sort should be better reflected
                      {
                        value: '',
                        text: 'Relevance',
                      },
                      {
                        value: 'times.startDateTime.asc',
                        text: 'Oldest to newest',
                      },
                      {
                        value: 'times.startDateTime.desc',
                        text: 'Newest to oldest',
                      },
                    ]}
                    jsLessOptions={{
                      sort: [
                        {
                          value: '',
                          text: 'Relevance',
                        },
                        {
                          value: 'times.startDateTime',
                          text: 'Event date',
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
                    totalPages={eventResponseList.totalPages}
                    ariaLabel="Events search pagination"
                    isHiddenMobile
                  />
                </SortPaginationWrapper>
              </PaginationWrapper>

              <main>
                <EventsSearchResults events={eventResponseList.results} />
              </main>

              <PaginationWrapper $verticalSpacing="l" $alignRight>
                <Pagination
                  formId={SEARCH_PAGES_FORM_ID}
                  totalPages={eventResponseList.totalPages}
                  ariaLabel="Events search pagination"
                />
              </PaginationWrapper>
            </Container>
          )}
        </>
      )}
    </Space>
  );
};

EventsSearchPage.getLayout = getSearchLayout;

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res, cacheTTL.search);
  const serverData = await getServerData(context);

  const { eventsSearch } = serverData?.toggles;

  if (!eventsSearch.value) {
    return { notFound: true };
  }
  const query = context.query;
  const params = fromQuery(query);

  const defaultProps = serialiseProps({
    eventsRouteProps: params,
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
        eventResponseList: emptyResultList(),
        pageview: {
          name: 'events',
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

  const eventResponseList = await getEvents({
    params: {
      ...restOfQuery,
      sort: getQueryPropertyValue(query.sort),
      sortOrder: getQueryPropertyValue(query.sortOrder),
      ...(pageNumber && { page: Number(pageNumber) }),
      aggregations: ['format', 'audience', 'interpretation'],
    },
    pageSize: 24,
    toggles: serverData.toggles,
  });

  if (eventResponseList?.type === 'Error') {
    return appError(context, eventResponseList.httpStatus, 'Content API error');
  }

  return {
    props: serialiseProps({
      ...defaultProps,
      eventResponseList,
      pageview: {
        name: 'events',
        properties: {
          totalResults: eventResponseList?.totalResults ?? 0,
        },
      },
      apiToolbarLinks: [
        {
          id: 'content-api',
          label: 'Content API query',
          link: eventResponseList._requestUrl,
        },
      ],
    }),
  };
};

export default EventsSearchPage;
