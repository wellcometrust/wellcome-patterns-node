import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { getServerData } from '@weco/common/server-data';
import { useToggles } from '@weco/common/server-data/Context';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { Pageview } from '@weco/common/services/conversion/track';
import { font } from '@weco/common/utils/classnames';
import { formatNumber } from '@weco/common/utils/grammar';
import { serialiseProps } from '@weco/common/utils/json';
import {
  decodeQuery,
  FromCodecMap,
  stringCodec,
} from '@weco/common/utils/routes';
import {
  getQueryPropertyValue,
  getQueryResults,
  ReturnedResults,
} from '@weco/common/utils/search';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import { Container } from '@weco/common/views/components/styled/Container';
import Space from '@weco/common/views/components/styled/Space';
import { NextPageWithLayout } from '@weco/common/views/pages/_app';
import theme from '@weco/common/views/themes/default';
import EventsSearchResults from '@weco/content/components/EventsSearchResults';
import ImageEndpointSearchResults from '@weco/content/components/ImageEndpointSearchResults/ImageEndpointSearchResults';
import MoreLink from '@weco/content/components/MoreLink/MoreLink';
import SearchNoResults from '@weco/content/components/SearchNoResults/SearchNoResults';
import { getSearchLayout } from '@weco/content/components/SearchPageLayout/SearchPageLayout';
import StoriesGrid from '@weco/content/components/StoriesGrid';
import WorksSearchResults from '@weco/content/components/WorksSearchResults/WorksSearchResults';
import useHotjar from '@weco/content/hooks/useHotjar';
import { WellcomeApiError } from '@weco/content/services/wellcome';
import { getImages } from '@weco/content/services/wellcome/catalogue/images';
import {
  Image,
  toWorkBasic,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import { getWorks } from '@weco/content/services/wellcome/catalogue/works';
import { getAddressables } from '@weco/content/services/wellcome/content/all';
import { getArticles } from '@weco/content/services/wellcome/content/articles';
import { getEvents } from '@weco/content/services/wellcome/content/events';
import {
  Addressable,
  Article,
  ContentResultsList,
  EventDocument,
} from '@weco/content/services/wellcome/content/types/api';
import { Query } from '@weco/content/types/search';
import { cacheTTL, setCacheControl } from '@weco/content/utils/setCacheControl';
import { looksLikeSpam } from '@weco/content/utils/spam-detector';

// Creating this version of fromQuery for the overview page only
// No filters or pagination required.
const codecMap = { query: stringCodec };
type CodecMapProps = FromCodecMap<typeof codecMap>;
const fromQuery: (params: ParsedUrlQuery) => CodecMapProps = params => {
  return decodeQuery<CodecMapProps>(params, codecMap);
};

type Props = {
  works?: ReturnedResults<WorkBasic>;
  images?: ReturnedResults<Image>;
  stories?: ReturnedResults<Article>;
  events?: ReturnedResults<EventDocument>;
  contentResults?: ReturnedResults<Addressable>;
  query: Query;
  pageview: Pageview;
};

type NewProps = {
  contentResults?: ReturnedResults<Addressable>;
  catalogueResults: {
    works?: ReturnedResults<WorkBasic>;
    images?: ReturnedResults<Image>;
  };
  queryString?: string;
};

type SeeMoreButtonProps = {
  text: string;
  pathname: string;
  totalResults: number;
};

const BasicSection = styled(Space).attrs({
  as: 'section',
  $v: { size: 'xl', properties: ['padding-top', 'padding-bottom'] },
})``;

const StoriesSection = styled(BasicSection)`
  background-color: ${props => props.theme.color('neutral.200')};
`;

const ImagesSection = styled(BasicSection)`
  background-color: ${props => props.theme.color('black')};
  color: ${props => props.theme.color('white')};
`;

const EventsSection = styled(BasicSection).attrs({
  $v: { size: 'xl', properties: ['padding-bottom'] },
})``;

const SectionTitle = ({ sectionName }: { sectionName: string }) => {
  return (
    <Space $v={{ size: 'l', properties: ['margin-bottom'] }}>
      <h3 className={font('intb', 2)}>{sectionName}</h3>
    </Space>
  );
};

const StoryPromoContainer = styled(Container)`
  ${props =>
    props.theme.mediaBetween(
      'small',
      'medium'
    )(`
  max-width: none;
  width: auto;
  overflow: auto;
  padding: 0;

  &::-webkit-scrollbar {
    height: 18px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0;
    border-style: solid;
    border-width: 0 ${props.theme.containerPadding.small}px 12px;
    background: ${props.theme.color('neutral.400')};
  }
`)}

  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    background: ${props => props.theme.color('neutral.200')};
  }

  &::-webkit-scrollbar-thumb {
    border-color: ${props => props.theme.color('neutral.200')};
  }
`;

const NewSearchPage: NextPageWithLayout<NewProps> = ({
  queryString,
  contentResults,
  catalogueResults,
}) => {
  return (
    <main>
      {!contentResults &&
      !catalogueResults.works &&
      !catalogueResults.images ? (
        <Container>
          <SearchNoResults query={queryString} />
        </Container>
      ) : (
        <Container style={{ display: 'flex' }}>
          <BasicSection>
            <Container>
              <SectionTitle sectionName="Content results" />
              <p>{contentResults?.totalResults || 0} results</p>
              <div
                style={{
                  fontSize: '12px',
                  maxWidth: '780px',
                  overflow: 'scroll',
                }}
              >
                {contentResults && (
                  <pre>{JSON.stringify(contentResults, null, 2)}</pre>
                )}
              </div>
            </Container>
          </BasicSection>

          <div>
            <div>
              <SectionTitle sectionName="Images" />
              <p>{catalogueResults.images?.totalResults || 0} results</p>
            </div>

            <div>
              <SectionTitle sectionName="Catalogue" />

              <p>{catalogueResults.works?.totalResults || 0} results</p>
            </div>
          </div>
        </Container>
      )}
    </main>
  );
};

export const SearchPage: NextPageWithLayout<Props> = ({
  contentResults,
  works,
  images,
  stories,
  events,
  query,
}) => {
  useHotjar(true);
  const { query: queryString } = query;
  const { setLink } = useContext(SearchContext);
  const { allSearch } = useToggles();

  useEffect(() => {
    const pathname = '/search';
    const link = {
      href: {
        pathname,
        query,
      },
      as: {
        pathname,
        query,
      },
    };
    setLink(link);
  }, [query]);

  if (allSearch) {
    return (
      <NewSearchPage
        queryString={queryString}
        contentResults={contentResults}
        catalogueResults={{ works, images }}
      />
    );
  }

  const SeeMoreButton = ({
    text,
    pathname,
    totalResults,
  }: SeeMoreButtonProps) => (
    <MoreLink
      name={`${text} (${formatNumber(totalResults, {
        isCompact: true,
      })})`}
      url={{
        href: {
          pathname,
          query: { ...(queryString && { query: queryString }) },
        },
      }}
      colors={theme.buttonColors.yellowYellowBlack}
    />
  );

  return (
    <main>
      {!stories && !images && !works ? (
        <Container>
          <SearchNoResults query={queryString} />
        </Container>
      ) : (
        <>
          {stories && (
            <StoriesSection>
              <Container>
                <SectionTitle sectionName="Stories" />
              </Container>
              <StoryPromoContainer>
                <StoriesGrid
                  articles={stories.pageResults}
                  dynamicImageSizes={{
                    xlarge: 1 / 5,
                    large: 1 / 5,
                    medium: 1 / 2,
                    small: 1 / 2,
                  }}
                />
              </StoryPromoContainer>
              <Container>
                <Space $v={{ size: 'l', properties: ['padding-top'] }}>
                  <SeeMoreButton
                    text="All stories"
                    pathname="/search/stories"
                    totalResults={stories.totalResults}
                  />
                </Space>
              </Container>
            </StoriesSection>
          )}

          {images && (
            <ImagesSection>
              <Container>
                <SectionTitle sectionName="Images" />

                <ImageEndpointSearchResults images={images.pageResults} />

                <Space $v={{ size: 'l', properties: ['padding-top'] }}>
                  <SeeMoreButton
                    text="All images"
                    pathname="/search/images"
                    totalResults={images.totalResults}
                  />
                </Space>
              </Container>
            </ImagesSection>
          )}

          {works && (
            <BasicSection>
              <Container>
                <SectionTitle sectionName="Catalogue" />

                <WorksSearchResults works={works.pageResults} />

                <Space $v={{ size: 'l', properties: ['padding-top'] }}>
                  <SeeMoreButton
                    text="All works"
                    pathname="/search/works"
                    totalResults={works.totalResults}
                  />
                </Space>
              </Container>
            </BasicSection>
          )}

          {events && (
            <EventsSection>
              <Container>
                <SectionTitle sectionName="Events" />

                <EventsSearchResults events={events.pageResults} />

                <Space $v={{ size: 'l', properties: ['padding-top'] }}>
                  <SeeMoreButton
                    text="All events"
                    pathname="/search/events"
                    totalResults={events.totalResults}
                  />
                </Space>
              </Container>
            </EventsSection>
          )}
        </>
      )}
    </main>
  );
};

SearchPage.getLayout = getSearchLayout;

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res, cacheTTL.search);
  const serverData = await getServerData(context);
  const query = context.query;
  const params = fromQuery(query);

  const pageview: Pageview = {
    name: 'search',
    properties: {},
  };

  const defaultProps = {
    serverData,
    query,
    pageview,
  };

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
        pageview: {
          name: 'search',
          properties: {
            looksLikeSpam: 'true',
          },
        },
      }),
    };
  }

  try {
    let contentResults:
        | ContentResultsList<Addressable>
        | WellcomeApiError
        | undefined,
      stories,
      events;
    let contentQueryFailed = false;
    if (serverData.toggles.allSearch.value) {
      // All/Addressables
      contentResults = await getAddressables({
        params: {
          ...query,
        },
        pageSize: 4,
        toggles: serverData.toggles,
      });

      if (contentResults.type === 'Error') {
        contentQueryFailed = true;
        console.error(contentResults.label + ': Error fetching addressables');
      }
    } else {
      // Stories
      // We want the default order to be "descending publication date" with the Content API
      const storiesResults = await getArticles({
        params: {
          ...query,
          sort: getQueryPropertyValue(query.sort),
          sortOrder: getQueryPropertyValue(query.sortOrder),
        },
        pageSize: 4,
        toggles: serverData.toggles,
      });

      if (storiesResults.type === 'Error') contentQueryFailed = true;

      stories = getQueryResults({
        categoryName: 'stories',
        queryResults: storiesResults as
          | ContentResultsList<Article>
          | WellcomeApiError,
      });

      // Events
      const eventsResults = await getEvents({
        params: {
          ...query,
          sort: getQueryPropertyValue(query.sort),
          sortOrder: getQueryPropertyValue(query.sortOrder),
        },
        pageSize: 3,
        toggles: serverData.toggles,
      });

      if (eventsResults.type === 'Error') contentQueryFailed = true;

      events = getQueryResults({
        categoryName: 'events',
        queryResults: eventsResults as
          | ContentResultsList<EventDocument>
          | WellcomeApiError,
      });
    }

    // Works
    const worksResults = await getWorks({
      params,
      pageSize: 5,
      toggles: serverData.toggles,
    });
    const works = getQueryResults({
      categoryName: 'works',
      queryResults: worksResults,
    });

    // Images
    const imagesResults = await getImages({
      params,
      pageSize: 10,
      toggles: serverData.toggles,
    });
    const images = getQueryResults({
      categoryName: 'images',
      queryResults: imagesResults,
    });

    // If all three queries fail, return an error page
    if (
      imagesResults.type === 'Error' &&
      worksResults.type === 'Error' &&
      contentQueryFailed
    ) {
      // Use the error from the works API as it is the most mature of the 3
      return appError(
        context,
        worksResults.httpStatus,
        worksResults.description || worksResults.label
      );
    }

    return {
      props: serialiseProps({
        ...defaultProps,
        ...(stories && stories.pageResults?.length && { stories }),
        ...(images?.pageResults.length && { images }),
        ...(events?.pageResults.length && { events }),
        ...(contentResults?.type !== 'Error' &&
          contentResults?.results.length && {
            contentResults,
          }),
        works:
          works && works.pageResults.length
            ? {
                ...works,
                pageResults: works.pageResults.map(toWorkBasic),
              }
            : undefined,
      }),
    };
  } catch (error) {
    console.error(error);
    return appError(context, 500, 'Search results error');
  }
};

export default SearchPage;
