import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';

import Space from '@weco/common/views/components/styled/Space';
import SearchNoResults from '@weco/catalogue/components/SearchNoResults/SearchNoResults';
import StoriesGrid from '@weco/catalogue/components/StoriesGrid';
import ImageEndpointSearchResults from '@weco/catalogue/components/ImageEndpointSearchResults/ImageEndpointSearchResults';
import WorksSearchResults from '@weco/catalogue/components/WorksSearchResults/WorksSearchResults';
import MoreLink from '@weco/common/views/components/MoreLink/MoreLink';

import { getSearchLayout } from '@weco/catalogue/components/SearchPageLayout/SearchPageLayout';
import { serialiseProps } from '@weco/common/utils/json';
import { appError, AppErrorProps } from '@weco/common/services/app';
import { getServerData } from '@weco/common/server-data';
import { NextPageWithLayout } from '@weco/common/views/pages/_app';
import { Pageview } from '@weco/common/services/conversion/track';
import { font } from '@weco/common/utils/classnames';
import { getWorks } from '@weco/catalogue/services/wellcome/catalogue/works';
import { Query } from '@weco/catalogue/types/search';
import { getImages } from '@weco/catalogue/services/wellcome/catalogue/images';
import {
  Image,
  toWorkBasic,
  WorkBasic,
} from '@weco/catalogue/services/wellcome/catalogue/types';
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
import { getArticles } from '@weco/catalogue/services/wellcome/content/articles';
import {
  Article,
  ContentResultsList,
} from '@weco/catalogue/services/wellcome/content/types/api';
import { WellcomeApiError } from '@weco/catalogue/services/wellcome';
import { cacheTTL, setCacheControl } from '@weco/common/utils/setCacheControl';
import { looksLikeSpam } from '@weco/catalogue/utils/spam-detector';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import { useContext, useEffect } from 'react';

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
  query: Query;
  pageview: Pageview;
};

type SeeMoreButtonProps = {
  text: string;
  pathname: string;
  totalResults: number;
};

const StoriesSection = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top', 'padding-bottom'] },
})`
  background-color: ${props => props.theme.color('neutral.200')};
`;

const ImagesSection = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top', 'padding-bottom'] },
})`
  background-color: ${props => props.theme.color('black')};
  color: ${props => props.theme.color('white')};
`;

const WorksSection = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top', 'padding-bottom'] },
})``;

const SectionTitle = ({ sectionName }: { sectionName: string }) => {
  return (
    <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
      <h3 className={font('intb', 2)}>{sectionName}</h3>
    </Space>
  );
};

export const SearchPage: NextPageWithLayout<Props> = ({
  works,
  images,
  stories,
  query,
}) => {
  const { query: queryString } = query;
  const { setLink } = useContext(SearchContext);

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
      hoverUnderline
    />
  );

  return (
    <main>
      <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
        {!stories && !images && !works ? (
          <div className="container">
            <SearchNoResults query={queryString} />
          </div>
        ) : (
          <>
            {stories && (
              <StoriesSection as="section">
                <div className="container">
                  <SectionTitle sectionName="Stories" />
                  <StoriesGrid
                    articles={stories.pageResults}
                    dynamicImageSizes={{
                      xlarge: 1 / 5,
                      large: 1 / 5,
                      medium: 1 / 2,
                      small: 1 / 2,
                    }}
                  />
                  <Space v={{ size: 'l', properties: ['padding-top'] }}>
                    <SeeMoreButton
                      text="All stories"
                      pathname="/search/stories"
                      totalResults={stories.totalResults}
                    />
                  </Space>
                </div>
              </StoriesSection>
            )}

            {images && (
              <ImagesSection>
                <div className="container">
                  <SectionTitle sectionName="Images" />

                  <ImageEndpointSearchResults images={images.pageResults} />

                  <Space v={{ size: 'l', properties: ['padding-top'] }}>
                    <SeeMoreButton
                      text="All images"
                      pathname="/search/images"
                      totalResults={images.totalResults}
                    />
                  </Space>
                </div>
              </ImagesSection>
            )}

            {works && (
              <WorksSection>
                <div className="container">
                  <SectionTitle sectionName="Catalogue" />

                  <WorksSearchResults works={works.pageResults} />

                  <Space v={{ size: 'l', properties: ['padding-top'] }}>
                    <SeeMoreButton
                      text="All works"
                      pathname="/search/works"
                      totalResults={works.totalResults}
                    />
                  </Space>
                </div>
              </WorksSection>
            )}
          </>
        )}
      </Space>
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

  const defaultProps = serialiseProps({
    serverData,
    query,
    pageview,
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
    return { props: defaultProps };
  }

  try {
    // Stories
    // We want the default order to be "descending publication date" with the Prismic API

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
    ) {
      return appError(context, 500, 'Search results error');
    }

    return {
      props: {
        ...defaultProps,
        ...(stories && stories.pageResults?.length && { stories }),
        ...(images?.pageResults.length && { images }),
        works: works
          ? { ...works, pageResults: works.pageResults.map(toWorkBasic) }
          : undefined,
      },
    };
  } catch (error) {
    console.error(error);
    return appError(context, 500, 'Search results error');
  }
};

export default SearchPage;
