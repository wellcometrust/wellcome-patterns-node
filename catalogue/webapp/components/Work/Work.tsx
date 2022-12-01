import { Work as WorkType } from '@weco/common/model/catalogue';
import { useContext, FunctionComponent, ReactElement } from 'react';
import { grid } from '@weco/common/utils/classnames';
import { getDigitalLocationOfType } from '../../utils/works';
import { removeIdiomaticTextTags } from '@weco/common/utils/string';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import CataloguePageLayout from '../CataloguePageLayout/CataloguePageLayout';
import { workLd } from '../../utils/json-ld';
import BackToResults from '@weco/common/views/components/BackToResults/BackToResults';
import WorkHeader from '../WorkHeader/WorkHeader';
import ArchiveBreadcrumb from '../ArchiveBreadcrumb/ArchiveBreadcrumb';
import Space from '@weco/common/views/components/styled/Space';
import WorkDetails from '../WorkDetails/WorkDetails';
import ArchiveTree from '../ArchiveTree/ArchiveTree';
import SearchTabs from '@weco/common/views/components/SearchTabs/SearchTabs';
import Divider from '@weco/common/views/components/Divider/Divider';
import styled from 'styled-components';
import SearchContext from '@weco/common/views/components/SearchContext/SearchContext';
import IsArchiveContext from '../IsArchiveContext/IsArchiveContext';

const ArchiveDetailsContainer = styled.div`
  display: block;
  ${props => props.theme.media('medium')`
    display: flex;
  `}
`;

const WorkDetailsWrapper = styled(Space).attrs({
  v: { size: 'xl', properties: ['padding-top'] },
})`
  flex: 1;
`;

const Container = styled.div.attrs({
  className: 'container',
})``;

const Grid = styled.div.attrs({
  className: 'grid',
})``;

type Props = {
  work: WorkType;
};

const Work: FunctionComponent<Props> = ({
  work,
}: Props): ReactElement<Props> => {
  const { link: searchLink } = useContext(SearchContext);

  const isArchive = !!(
    work.parts.length ||
    (work.partOf.length > 0 && work.partOf[0].totalParts)
  );

  const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');

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

  return (
    <IsArchiveContext.Provider value={isArchive}>
      <CataloguePageLayout
        title={title}
        description={work.description || title}
        url={{ pathname: `/works/${work.id}`, query: {} }}
        openGraphType="website"
        jsonLd={workLd(work)}
        siteSection="collections"
        image={image}
        hideNewsletterPromo={true}
      >
        <Container>
          <Grid>
            <div className={grid({ s: 12, m: 12, l: 12, xl: 12 })}>
              <Space v={{ size: 'l', properties: ['margin-top'] }}>
                <SearchTabs
                  query={searchLink.as.query?.query?.toString() || ''}
                  worksFilters={[]}
                  imagesFilters={[]}
                  shouldShowDescription={false}
                  shouldShowFilters={false}
                />
              </Space>
            </div>
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
                <WorkHeader work={work} />
              </Grid>
            </Container>

            <Container>
              <Divider />
              <ArchiveDetailsContainer>
                <ArchiveTree work={work} />
                <WorkDetailsWrapper>
                  <WorkDetails work={work} />
                </WorkDetailsWrapper>
              </ArchiveDetailsContainer>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <Grid>
                <WorkHeader work={work} />
              </Grid>
            </Container>
            <WorkDetails work={work} />
          </>
        )}
      </CataloguePageLayout>
    </IsArchiveContext.Provider>
  );
};

export default Work;
