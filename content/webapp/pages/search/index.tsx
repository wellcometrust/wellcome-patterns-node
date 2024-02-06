import { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';

import Space from '@weco/common/views/components/styled/Space';
import SearchNoResults from '@weco/content/components/SearchNoResults/SearchNoResults';
import StoriesGrid from '@weco/content/components/StoriesGrid';
import ImageEndpointSearchResults from '@weco/content/components/ImageEndpointSearchResults/ImageEndpointSearchResults';
import WorksSearchResults from '@weco/content/components/WorksSearchResults/WorksSearchResults';
import EventsSearchResults from '@weco/content/components/EventsSearchResults';
import MoreLink from '@weco/content/components/MoreLink/MoreLink';
import { Container } from '@weco/common/views/components/styled/Container';
import { getSearchLayout } from '@weco/content/components/SearchPageLayout/SearchPageLayout';
import { serialiseProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { getServerData } from '@weco/common/server-data';
import { NextPageWithLayout } from '@weco/common/views/pages/_app';
import { Pageview } from '@weco/common/services/conversion/track';
import { font } from '@weco/common/utils/classnames';
import { getWorks } from '@weco/content/services/wellcome/catalogue/works';
import { Query } from '@weco/content/types/search';
import { getImages } from '@weco/content/services/wellcome/catalogue/images';
import {
  Image,
  toWorkBasic,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import {
  getQueryResults,
  getQueryPropertyValue,
  ReturnedResults,
} from '@weco/common/utils/search';
import {
  decodeQuery,
  FromCodecMap,
  stringCodec,
} from '@weco/common/utils/routes';
import theme from '@weco/common/views/themes/default';
import { formatNumber } from '@weco/common/utils/grammar';
import { getArticles } from '@weco/content/services/wellcome/content/articles';
import { getEvents } from '@weco/content/services/wellcome/content/events';
import {
  Article,
  ContentResultsList,
  EventDocument,
} from '@weco/content/services/wellcome/content/types/api';
import { WellcomeApiError } from '@weco/content/services/wellcome';
import { cacheTTL, setCacheControl } from '@weco/content/utils/setCacheControl';
import { looksLikeSpam } from '@weco/content/utils/spam-detector';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import { useToggles } from '@weco/common/server-data/Context';

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
  query: Query;
  pageview: Pageview;
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

export const SearchPage: NextPageWithLayout<Props> = ({
  works,
  images,
  stories,
  events,
  query,
}) => {
  const { query: queryString } = query;
  const { setLink } = useContext(SearchContext);
  const { eventsSearch } = useToggles();

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

          {eventsSearch && events && (
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

    const stories = getQueryResults({
      categoryName: 'stories',
      queryResults: storiesResults as
        | ContentResultsList<Article>
        | WellcomeApiError,
    });

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
      storiesResults.type === 'Error'
      //  && eventsResults.type === 'Error' // TODO uncomment when removing eventsSearch toggle
    ) {
      // Use the error from the works API as it is the most mature of the 3
      return appError(
        context,
        worksResults.httpStatus,
        worksResults.description || worksResults.label
      );
    }

    // TODO reorganise when removing eventsSearch toggle
    // Events
    const { eventsSearch } = serverData?.toggles;

    if (eventsSearch) {
      const eventsResults = await getEvents({
        params: {
          ...query,
          sort: getQueryPropertyValue(query.sort),
          sortOrder: getQueryPropertyValue(query.sortOrder),
        },
        pageSize: 3,
        toggles: serverData.toggles,
      });

      const events = getQueryResults({
        categoryName: 'events',
        queryResults: eventsResults as
          | ContentResultsList<EventDocument>
          | WellcomeApiError,
      });

      return {
        props: serialiseProps({
          ...defaultProps,
          ...(stories && stories.pageResults?.length && { stories }),
          ...(images?.pageResults.length && { images }),
          ...(events?.pageResults.length && { events }),
          works:
            works && works.pageResults.length
              ? {
                  ...works,
                  pageResults: works.pageResults.map(toWorkBasic),
                }
              : undefined,
        }),
      };
    }

    return {
      props: serialiseProps({
        ...defaultProps,
        ...(stories && stories.pageResults?.length && { stories }),
        ...(images?.pageResults.length && { images }),
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
