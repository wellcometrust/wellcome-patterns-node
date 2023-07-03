import styled from 'styled-components';
import { useState, JSX, FunctionComponent } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Link, { LinkProps } from 'next/link';

// Helpers/Utils
import { appError, AppErrorProps } from '@weco/common/services/app';
import { serialiseProps } from '@weco/common/utils/json';
import { getServerData } from '@weco/common/server-data';
import { looksLikeCanonicalId } from '@weco/catalogue/services/wellcome/catalogue';
import { getConcept } from '@weco/catalogue/services/wellcome/catalogue/concepts';
import { getWorks } from '@weco/catalogue/services/wellcome/catalogue/works';
import { getImages } from '@weco/catalogue/services/wellcome/catalogue/images';
import { toLink as toImagesLink } from '@weco/catalogue/components/ImagesLink';
import { toLink as toWorksLink } from '@weco/catalogue/components/WorksLink';
import { pageDescriptionConcepts } from '@weco/common/data/microcopy';
import { capitalize, formatNumber } from '@weco/common/utils/grammar';
import { cacheTTL, setCacheControl } from '@weco/common/utils/setCacheControl';

// Components
import BetaMessage from '@weco/common/views/components/BetaMessage/BetaMessage';
import CataloguePageLayout from '@weco/catalogue/components/CataloguePageLayout/CataloguePageLayout';
import ImageEndpointSearchResults from '@weco/catalogue/components/ImageEndpointSearchResults/ImageEndpointSearchResults';
import MoreLink from '@weco/common/views/components/MoreLink/MoreLink';
import WorksSearchResults from '@weco/catalogue/components/WorksSearchResults/WorksSearchResults';

// Types
import {
  CatalogueResultsList,
  Concept as ConceptType,
  Image as ImageType,
  toWorkBasic,
  WorkAggregations,
  WorkBasic,
  Work as WorkType,
} from '@weco/catalogue/services/wellcome/catalogue/types';

// Styles
import Space from '@weco/common/views/components/styled/Space';
import TabNav from '@weco/common/views/components/TabNav/TabNav';
import { font } from '@weco/common/utils/classnames';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';
import { Pageview } from '@weco/common/services/conversion/track';
import theme from '@weco/common/views/themes/default';
import {
  allRecordsLinkParams,
  conceptTypeDisplayName,
  getDisplayIdentifierType,
  queryParams,
} from '@weco/catalogue/utils/concepts';
import {
  emptyResultList,
  WellcomeResultList,
} from '@weco/catalogue/services/wellcome';
import { getQueryResults, ReturnedResults } from '@weco/common/utils/search';

const emptyImageResults: CatalogueResultsList<ImageType> = emptyResultList();

const emptyWorkResults: WellcomeResultList<WorkType, WorkAggregations> =
  emptyResultList();

const tabOrder = ['by', 'in', 'about'];

const linkSources = new Map([
  ['worksAbout', 'concept/works_about'],
  ['worksBy', 'concept/works_by'],
  ['worksIn', 'concept/works_in'],
  ['imagesAbout', 'concept/images_about'],
  ['imagesBy', 'concept/images_by'],
  ['imagesIn', 'concept/images_in'],
]);

const ConceptHero = styled(Space).attrs({
  v: { size: 'l', properties: ['padding-top', 'padding-bottom'] },
})`
  background-color: ${props => props.theme.color('lightYellow')};
`;

const HeroTitle = styled.h1.attrs({ className: font('intb', 1) })`
  margin-bottom: 1rem;
`;

// TODO when LabelColor is refactored, maybe switch to using Label?
const TypeLabel = styled.span.attrs({ className: font('intb', 6) })`
  background-color: ${props => props.theme.color('warmNeutral.300')};
  padding: 5px;
`;

const ConceptDescription = styled.section`
  max-width: 600px;
`;

const ConceptImages = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top', 'padding-bottom'] },
})`
  background-color: ${props => props.theme.color('black')};

  .sectionTitle {
    color: ${props => props.theme.color('white')};
  }
`;

const ConceptWorksHeader = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top'] },
})<{ hasWorksTabs: boolean }>`
  background-color: ${({ hasWorksTabs, theme }) =>
    theme.color(hasWorksTabs ? 'warmNeutral.300' : 'white')};
`;

const withSelectedStatus = (selectedTab: string, tabDefinition) => {
  tabDefinition.selected = selectedTab === tabDefinition.id;
  return tabDefinition;
};

// tabDefinitions is an ordered list of the image or works tabs in a page.
// (hence not just having an object and doing a [selectedTab] lookup)
// Return the currently selected one.
function currentTabPanel<T>(
  selectedTab: string,
  tabDefinitions: PageSectionDefinition<T>[]
) {
  // When only one tab exists, there is no selection going on, just return it.
  if (tabDefinitions.length === 1) return tabDefinitions[0].panel;

  for (const definition in tabDefinitions) {
    if (tabDefinitions[definition].id === selectedTab) {
      return tabDefinitions[definition].panel;
    }
  }
  throw new Error(
    `Unexpected selected tab ${selectedTab} not found in ${tabDefinitions}`
  );
}

type SeeMoreButtonType = {
  text: string;
  link: LinkProps;
  totalResults: number;
};

const SeeMoreButton = ({ text, link, totalResults }: SeeMoreButtonType) => (
  <MoreLink
    name={`${text} (${formatNumber(totalResults, {
      isCompact: true,
    })})`}
    url={link}
    colors={theme.buttonColors.yellowYellowBlack}
    hoverUnderline
  />
);

type TabLabelProps = {
  text: string;
  totalResults: number;
};

const TabLabel = ({ text, totalResults }: TabLabelProps) => (
  <>
    {text} <span className="is-hidden-s">({formatNumber(totalResults)})</span>
  </>
);

type ImagesTabPanelProps = {
  id: string;
  link: LinkProps;
  results: ReturnedResults<ImageType>;
};
const ImagesTabPanel: FunctionComponent<ImagesTabPanelProps> = ({
  id,
  link,
  results,
}) => {
  return (
    <div role="tabpanel" id={`tabpanel-${id}`} aria-labelledby={`tab-${id}`}>
      <ImageEndpointSearchResults images={results.pageResults} />
      <Space v={{ size: 'm', properties: ['margin-top'] }}>
        <SeeMoreButton
          text="All images"
          totalResults={results.totalResults}
          link={link}
        />
      </Space>
    </div>
  );
};

type WorksTabPanelProps = {
  id: string;
  link: LinkProps;
  results: ReturnedResults<WorkBasic>;
};
const WorksTabPanel: FunctionComponent<WorksTabPanelProps> = ({
  id,
  link,
  results,
}) => {
  return (
    <div className="container">
      <div role="tabpanel" id={`tabpanel-${id}`} aria-labelledby={`tab-${id}`}>
        <WorksSearchResults works={results.pageResults} />
        <Space v={{ size: 'l', properties: ['padding-top'] }}>
          <SeeMoreButton
            text="All works"
            totalResults={results.totalResults}
            link={link}
          />
        </Space>
      </div>
    </div>
  );
};

// Represents the data for a single tab/tab panel combination.
type PageSectionDefinition<T> = {
  id: string;
  tab: {
    id: string;
    text: JSX.Element;
  };
  panel: {
    id: string;
    link: LinkProps;
    results: ReturnedResults<T>;
  };
};
type PageSectionDefinitionProps<T> = {
  tabId: string;
  resultsGroup: ReturnedResults<T> | undefined;
  tabLabelText: string;
  link: LinkProps;
};

function toPageSectionDefinition<T>({
  tabId,
  resultsGroup,
  tabLabelText,
  link,
}: PageSectionDefinitionProps<T>): PageSectionDefinition<T> | undefined {
  return resultsGroup?.totalResults
    ? {
        id: tabId,
        tab: {
          id: tabId,
          text: TabLabel({
            text: tabLabelText,
            totalResults: resultsGroup.totalResults,
          }),
        },
        panel: { id: tabId, link, results: resultsGroup },
      }
    : undefined;
}

type SectionData = {
  label: string;
  works: ReturnedResults<WorkBasic> | undefined;
  images: ReturnedResults<ImageType> | undefined;
};

type SectionsData = {
  about: SectionData;
  by: SectionData;
  in: SectionData;
};

type Props = {
  conceptResponse: ConceptType;
  sectionsData: SectionsData;
  apiToolbarLinks: ApiToolbarLink[];
  pageview: Pageview;
};

export const ConceptPage: NextPage<Props> = ({
  conceptResponse,
  sectionsData,
  apiToolbarLinks,
}) => {
  const worksTabs = tabOrder
    .map(relationship => {
      const tabId = `works${capitalize(relationship)}`;

      const data = sectionsData[relationship] as SectionData;

      return toPageSectionDefinition<WorkBasic>({
        tabId,
        resultsGroup: data.works,
        tabLabelText: data.label,
        link: toWorksLink(
          allRecordsLinkParams(tabId, conceptResponse),
          linkSources[tabId]
        ),
      });
    })
    .filter(e => !!e) as PageSectionDefinition<WorkBasic>[];

  const hasWorks = worksTabs.length > 0;
  const hasWorksTabs = worksTabs.length > 1;

  const imagesTabs: PageSectionDefinition<ImageType>[] = tabOrder
    .map(relationship => {
      const tabId = `images${relationship
        .charAt(0)
        .toUpperCase()}${relationship.slice(1)}`;
      return toPageSectionDefinition({
        tabId,
        resultsGroup: sectionsData[relationship].images,
        tabLabelText: sectionsData[relationship].label,
        link: toImagesLink(
          allRecordsLinkParams(tabId, conceptResponse),
          linkSources[tabId]
        ),
      });
    })
    .filter(e => !!e) as PageSectionDefinition<ImageType>[];

  const hasImages = imagesTabs.length > 0;
  const hasImagesTabs = imagesTabs.length > 1;

  // Set the default tab in each group to the first populated tab
  // the two tabs lists are ordered consistently as defined by tabOrder,
  // which is ordered so that the more specific tabs come first.
  // Maximally one "more specific" tab is expected to be populated for any given concept.
  const [selectedWorksTab, setSelectedWorksTab] = useState(
    worksTabs[0]?.id || ''
  );
  const [selectedImagesTab, setSelectedImagesTab] = useState(
    imagesTabs[0]?.id || ''
  );

  return (
    <CataloguePageLayout
      title={conceptResponse.label}
      description={pageDescriptionConcepts(conceptResponse.label)}
      url={{ pathname: `/concepts/${conceptResponse.id}`, query: {} }}
      openGraphType="website"
      siteSection="collections"
      jsonLd={{ '@type': 'WebPage' }}
      hideNewsletterPromo={true}
      apiToolbarLinks={apiToolbarLinks}
    >
      <ConceptHero>
        <div className="container">
          <TypeLabel>{conceptTypeDisplayName(conceptResponse)}</TypeLabel>
          <Space v={{ size: 's', properties: ['margin-top', 'margin-bottom'] }}>
            <HeroTitle>{conceptResponse.label}</HeroTitle>
            <ConceptDescription className={font('intr', 5)}>
              <BetaMessage
                message={
                  <>
                    We&rsquo;re working to improve the information on this page.
                    You can <Link href="/user-panel">join our user panel</Link>{' '}
                    or{' '}
                    <Link href="https://roadmap.wellcomecollection.org/">
                      submit an idea
                    </Link>{' '}
                    that would help you use our website.
                  </>
                }
              />
            </ConceptDescription>
          </Space>
        </div>
      </ConceptHero>

      {/* Images */}
      {hasImages && (
        <ConceptImages as="section">
          <div className="container">
            <h2 className="h2 sectionTitle">Images</h2>
            {hasImagesTabs && (
              <TabNav
                id="images"
                selectedTab={selectedImagesTab}
                variant="white"
                items={imagesTabs.map(tabData =>
                  withSelectedStatus(selectedImagesTab, tabData.tab)
                )}
                setSelectedTab={setSelectedImagesTab}
                trackWithSegment={true}
              />
            )}
            <Space v={{ size: 'l', properties: ['margin-top'] }}>
              <ImagesTabPanel
                {...currentTabPanel(selectedImagesTab, imagesTabs)}
              />
            </Space>
          </div>
        </ConceptImages>
      )}

      {/* Works */}
      {hasWorks && (
        <>
          <ConceptWorksHeader hasWorksTabs={hasWorksTabs}>
            <div className="container">
              <h2 className="h2">Catalogue</h2>

              {hasWorksTabs && (
                <TabNav
                  id="works"
                  selectedTab={selectedWorksTab}
                  items={worksTabs.map(tabData =>
                    withSelectedStatus(selectedWorksTab, tabData.tab)
                  )}
                  setSelectedTab={setSelectedWorksTab}
                  trackWithSegment={true}
                />
              )}
            </div>
          </ConceptWorksHeader>

          <Space
            as="section"
            v={{
              size: 'xl',
              properties: ['margin-top', 'margin-bottom'],
            }}
          >
            <WorksTabPanel {...currentTabPanel(selectedWorksTab, worksTabs)} />
          </Space>
        </>
      )}
    </CataloguePageLayout>
  );
};

function createApiToolbarLinks(concept: ConceptType): ApiToolbarLink[] {
  const apiUrl = `https://api.wellcomecollection.org/catalogue/v2/concepts/${concept.id}`;

  const apiLink = {
    id: 'json',
    label: 'JSON',
    link: apiUrl,
  };

  const identifiers = (concept.identifiers || []).map(id =>
    id.identifierType.id === 'label-derived'
      ? {
          id: id.value,
          label: 'Label-derived identifier',
        }
      : {
          id: id.value,
          label: getDisplayIdentifierType(id.identifierType),
          value: id.value,
        }
  );

  return [apiLink, ...identifiers];
}

export const getServerSideProps: GetServerSideProps<
  Props | AppErrorProps
> = async context => {
  setCacheControl(context.res, cacheTTL.search);
  const serverData = await getServerData(context);
  const { conceptId } = context.query;

  if (!looksLikeCanonicalId(conceptId)) {
    return { notFound: true };
  }

  const conceptResponse = await getConcept({
    id: conceptId,
    toggles: serverData.toggles,
  });

  if (conceptResponse.type === 'Error') {
    if (conceptResponse.httpStatus === 404) {
      return { notFound: true };
    }
    return appError(
      context,
      conceptResponse.httpStatus,
      conceptResponse.description
    );
  }

  const getConceptWorks = (sectionName: string) =>
    getWorks({
      params: queryParams(sectionName, conceptResponse),
      toggles: serverData.toggles,
      pageSize: 5,
    });

  const getConceptImages = (sectionName: string) =>
    getImages({
      params: queryParams(sectionName, conceptResponse),
      toggles: serverData.toggles,
      pageSize: 10,
    });

  const worksAboutPromise = getConceptWorks('worksAbout');
  const imagesAboutPromise = getConceptImages('imagesAbout');

  // Only Genres can have works or images "in" them
  // so don't bother executing this query for other types
  // just pretend that we have.
  const worksInPromise =
    conceptResponse.type === 'Genre'
      ? getConceptWorks('worksIn')
      : Promise.resolve(emptyWorkResults);

  const imagesInPromise =
    conceptResponse.type === 'Genre'
      ? getConceptImages('imagesIn')
      : Promise.resolve(emptyImageResults);

  // Genres cannot be creators of works or images.
  // Semantically, we could claim that only Agents can be creators
  // but some metonymy exists in the source data, meaning that some
  // concepts that do not strictly have agency are present in
  // the contributor fields.
  // Therefore, we can only really be certain that a Concept
  // is not (and should never be) a contributor when it is a genre.
  const worksByPromise =
    conceptResponse.type !== 'Genre'
      ? getConceptWorks('worksBy')
      : Promise.resolve(emptyWorkResults);

  const imagesByPromise =
    conceptResponse.type !== 'Genre'
      ? getConceptImages('imagesBy')
      : Promise.resolve(emptyImageResults);

  const [
    worksAboutResponse,
    worksByResponse,
    worksInResponse,
    imagesAboutResponse,
    imagesByResponse,
    imagesInResponse,
  ] = await Promise.all([
    worksAboutPromise,
    worksByPromise,
    worksInPromise,
    imagesAboutPromise,
    imagesByPromise,
    imagesInPromise,
  ]);

  const worksAbout = getQueryResults({
    categoryName: 'works about',
    queryResults: worksAboutResponse,
  });
  const worksBy = getQueryResults({
    categoryName: 'works by',
    queryResults: worksByResponse,
  });
  const imagesAbout = getQueryResults({
    categoryName: 'images about',
    queryResults: imagesAboutResponse,
  });
  const imagesBy = getQueryResults({
    categoryName: 'images by',
    queryResults: imagesByResponse,
  });
  const worksIn = getQueryResults({
    categoryName: 'works in',
    queryResults: worksInResponse,
  });
  const imagesIn = getQueryResults({
    categoryName: 'images in',
    queryResults: imagesInResponse,
  });

  const apiToolbarLinks = createApiToolbarLinks(conceptResponse);

  const conceptTypeName = conceptTypeDisplayName(conceptResponse).toLowerCase();

  const sectionsData = {
    about: {
      label: `About this ${conceptTypeName}`,
      works: worksAbout
        ? {
            ...worksAbout,
            pageResults: worksAbout.pageResults.map(toWorkBasic),
          }
        : undefined,
      images: imagesAbout,
    },
    by: {
      label: `By this ${conceptTypeName}`,
      works: worksBy
        ? { ...worksBy, pageResults: worksBy.pageResults.map(toWorkBasic) }
        : undefined,
      images: imagesBy,
    },
    in: {
      label: `Using this ${conceptTypeName}`,
      works: worksIn
        ? { ...worksIn, pageResults: worksIn.pageResults.map(toWorkBasic) }
        : undefined,
      images: imagesIn,
    },
  };

  return {
    props: serialiseProps({
      conceptResponse,
      sectionsData,
      apiToolbarLinks,
      serverData,
      pageview: {
        name: 'concept',
        properties: {},
      },
    }),
  };
};

export default ConceptPage;
