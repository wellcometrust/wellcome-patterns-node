import { FunctionComponent } from 'react';
import {
  Work as WorkType,
  toWorkBasic,
} from '@weco/catalogue/services/wellcome/catalogue/types';
import {
  Location as LocationType,
  DigitalLocation,
} from '@weco/common/model/catalogue';
import { grid } from '@weco/common/utils/classnames';
import {
  getDigitalLocationOfType,
  getDigitalLocationInfo,
} from '../../utils/works';
import { removeIdiomaticTextTags } from '@weco/common/utils/string';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import CataloguePageLayout from '../CataloguePageLayout/CataloguePageLayout';
import { workLd } from '../../utils/json-ld';
import BackToResults from '@weco/common/views/components/BackToResults/BackToResults';
import WorkHeader from '../WorkHeader/WorkHeader';
import ArchiveBreadcrumb from '../ArchiveBreadcrumb/ArchiveBreadcrumb';
import Space from '@weco/common/views/components/styled/Space';
import WorkDetails from '../WorkDetails/WorkDetails';
import ArchiveTree from '../ArchiveTree';
import SearchForm from '@weco/common/views/components/SearchForm/SearchForm';
import Divider from '@weco/common/views/components/Divider/Divider';
import styled from 'styled-components';
import IsArchiveContext from '../IsArchiveContext/IsArchiveContext';
import WorkTabbedNav from '../WorkTabbedNav/WorkTabbedNav';
import { useToggles } from '@weco/common/server-data/Context';
import useTransformedManifest from '../../hooks/useTransformedManifest';
import { Audio, Video } from 'services/iiif/types/manifest/v3';
import { ApiToolbarLink } from '@weco/common/views/components/ApiToolbar';

const ArchiveDetailsContainer = styled.div`
  display: block;
  ${props => props.theme.media('medium')`
    display: flex;
  `}
`;

const WorkDetailsWrapper = styled(Space).attrs({
  v: {
    size: 'xl',
    properties: ['padding-top'],
  },
})`
  flex: 1;
`;

export const Container = styled.div.attrs({
  className: 'container',
})``;

export const Grid = styled.div.attrs({
  className: 'grid',
})``;

function showItemLink({
  digitalLocation,
  accessCondition,
  audio,
  video,
}: {
  digitalLocation: DigitalLocation | undefined;
  accessCondition: string | undefined;
  audio: Audio | undefined;
  video: Video | undefined;
}): boolean {
  if (accessCondition === 'closed' || accessCondition === 'restricted') {
    return false;
  } else if (digitalLocation && !((audio?.sounds || []).length > 0) && !video) {
    return true;
  } else {
    return false;
  }
}

function createApiToolbarLinks(
  work: WorkType,
  apiUrl: string
): ApiToolbarLink[] {
  const apiLink = {
    id: 'json',
    label: 'JSON',
    link: apiUrl,
  };

  const iiifItem = work.items
    ?.reduce((acc, item) => {
      return acc.concat(item.locations);
    }, [] as LocationType[])
    ?.find(location => location.locationType.id.startsWith('iiif'));

  const iiifLink = iiifItem &&
    iiifItem.type === 'DigitalLocation' && {
      id: 'iiif',
      label: 'IIIF',
      link: iiifItem.url.replace('/v2/', '/v3/'),
    };

  const links = [
    apiLink,
    iiifLink,
    ...work.identifiers.map(id => ({
      id: id.value,
      label: id.identifierType.label,
      value: id.value,
    })),
  ].filter(Boolean) as ApiToolbarLink[];

  return links;
}

type Props = {
  work: WorkType;
  apiUrl: string;
};

const Work: FunctionComponent<Props> = ({ work, apiUrl }) => {
  const { worksTabbedNav } = useToggles();
  const transformedIIIFManifest = useTransformedManifest(work);

  const isArchive = !!(
    work.parts.length ||
    (work.partOf.length > 0 && work.partOf[0].totalParts)
  );

  const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');
  const iiifPresentationLocation = getDigitalLocationOfType(
    work,
    'iiif-presentation'
  );

  // Determine digital location. If the work has a iiif-presentation location and a iiif-image location
  // we use the former
  const digitalLocation: DigitalLocation | undefined =
    iiifPresentationLocation || iiifImageLocation;
  const digitalLocationInfo =
    digitalLocation && getDigitalLocationInfo(digitalLocation);
  const { video, audio } = { ...transformedIIIFManifest };
  const shouldShowItemLink = showItemLink({
    digitalLocation,
    accessCondition: digitalLocationInfo?.accessCondition,
    audio,
    video,
  });
  const showTabbedNav =
    worksTabbedNav &&
    (shouldShowItemLink || (audio?.sounds || []).length > 0 || video);
  // we want to experiment with showing the tabs for audio and video content
  // so we can't rely on shouldShowItemLink if we have that content
  const imageUrl =
    iiifImageLocation && iiifImageLocation.url
      ? iiifImageTemplate(iiifImageLocation.url)({ size: `800,` })
      : undefined;

  const title = removeIdiomaticTextTags(work.title);

  const image = imageUrl
    ? {
        contentUrl: imageUrl,
        alt: title,
        width: 0,
        height: 0,
        crops: {},
      }
    : undefined;

  const { collectionManifestsCount } = { ...transformedIIIFManifest };

  return (
    <IsArchiveContext.Provider value={isArchive}>
      <CataloguePageLayout
        title={title}
        description={work.description || title}
        url={{ pathname: `/works/${work.id}` }}
        openGraphType="website"
        jsonLd={workLd(work)}
        siteSection="collections"
        image={image}
        apiToolbarLinks={createApiToolbarLinks(work, apiUrl)}
        hideNewsletterPromo={true}
      >
        <Container>
          <Grid>
            <Space
              v={{
                size: 'l',
                properties: ['padding-top'],
              }}
              className={grid({ s: 12 })}
            >
              <SearchForm searchCategory="works" location="page" />
            </Space>
          </Grid>
          <Grid>
            <Space
              v={{
                size: 's',
                properties: ['padding-top', 'padding-bottom'],
              }}
              className={grid({ s: 12 })}
            >
              <BackToResults />
            </Space>
          </Grid>
        </Container>

        {isArchive ? (
          <>
            <Container>
              <Grid>
                <Space
                  v={{
                    size: 's',
                    properties: ['padding-top', 'padding-bottom'],
                  }}
                  className={grid({ s: 12 })}
                >
                  <ArchiveBreadcrumb work={work} />
                </Space>
              </Grid>
            </Container>
            <Container>
              <Grid>
                <WorkHeader
                  work={toWorkBasic(work)}
                  collectionManifestsCount={collectionManifestsCount}
                />
              </Grid>
              {showTabbedNav && (
                <WorkTabbedNav work={work} selected="catalogueDetails" />
              )}
            </Container>

            <Container>
              <Divider />
              <ArchiveDetailsContainer>
                <ArchiveTree work={work} />
                <WorkDetailsWrapper>
                  <WorkDetails
                    work={work}
                    shouldShowItemLink={shouldShowItemLink}
                  />
                </WorkDetailsWrapper>
              </ArchiveDetailsContainer>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <Grid>
                <WorkHeader
                  work={toWorkBasic(work)}
                  collectionManifestsCount={collectionManifestsCount}
                />
              </Grid>
              {showTabbedNav && (
                <WorkTabbedNav work={work} selected="catalogueDetails" />
              )}
            </Container>
            <WorkDetails work={work} shouldShowItemLink={shouldShowItemLink} />
          </>
        )}
      </CataloguePageLayout>
    </IsArchiveContext.Provider>
  );
};

export default Work;
