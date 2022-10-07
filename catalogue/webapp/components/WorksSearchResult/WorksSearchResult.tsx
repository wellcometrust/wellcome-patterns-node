import { FC } from 'react';

// Types
import { Work } from '@weco/common/model/catalogue';

// Helpers/Utils
import {
  getArchiveLabels,
  getProductionDates,
  getCardLabels,
} from '../../utils/works';
import { trackEvent } from '@weco/common/utils/ga';
import { convertIiifImageUri } from '@weco/common/utils/convert-image-uri';

// Components
import Space from '@weco/common/views/components/styled/Space';
import WorkTitle from '../WorkTitle/WorkTitle';
import WorkLink from '@weco/common/views/components/WorkLink/WorkLink';
import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';
import {
  Container,
  Wrapper,
  Details,
  Preview,
  PreviewImage,
  WorkInformation,
  WorkInformationItem,
  WorkTitleHeading,
} from './WorksSearchResult.styles';

type Props = {
  work: Work;
  resultPosition: number;
};

// TODO: remove, hack to handle the fact that we are pulling through PDF thumbnails.
// These will be removed from the API at some stage.
function isPdfThumbnail(thumbnail): boolean {
  // e.g. https://dlcs.io/iiif-img/wellcome/5/b28820769_WG_2006_PAAG-implementing-persistent-identifiers_EN.pdf/full/!200,200/0/default.jpg
  return Boolean(thumbnail.url.match('.pdf/full'));
}

const WorkSearchResultV2: FC<Props> = ({ work, resultPosition }: Props) => {
  const productionDates = getProductionDates(work);
  const archiveLabels = getArchiveLabels(work);
  const cardLabels = getCardLabels(work);

  const primaryContributorLabel = work.contributors.find(
    contributor => contributor.primary
  )?.agent.label;

  return (
    <WorkLink
      id={work.id}
      resultPosition={resultPosition}
      source="works_search_result"
      passHref
    >
      <Wrapper
        as="a"
        onClick={() => {
          // TODO remove?
          // We've left `WorkCard` here for legacy tracking.
          // We don't really use it.
          trackEvent({
            category: 'WorkCard',
            action: 'follow link',
            label: work.id,
          });
        }}
      >
        <Container>
          {work.thumbnail && !isPdfThumbnail(work.thumbnail) && (
            <Preview>
              <PreviewImage
                alt={`view ${work.title}`}
                src={convertIiifImageUri(work.thumbnail.url, 120)}
              />
            </Preview>
          )}
          <Details>
            <Space v={{ size: 's', properties: ['margin-bottom'] }}>
              <LabelsList
                labels={cardLabels}
                defaultLabelColor="warmNeutral.300"
              />
            </Space>
            <WorkTitleHeading>
              <WorkTitle title={work.title} />
            </WorkTitleHeading>

            <WorkInformation>
              {primaryContributorLabel && (
                <WorkInformationItem>
                  {primaryContributorLabel}
                </WorkInformationItem>
              )}

              {productionDates.length > 0 && (
                <WorkInformationItem>
                  Date: {productionDates[0]}
                </WorkInformationItem>
              )}

              {archiveLabels?.reference && (
                <WorkInformationItem>
                  Reference: {archiveLabels && archiveLabels?.reference}
                </WorkInformationItem>
              )}
            </WorkInformation>
            {archiveLabels?.partOf && (
              <WorkInformation>
                Part of: {archiveLabels && archiveLabels?.partOf}
              </WorkInformation>
            )}
          </Details>
        </Container>
      </Wrapper>
    </WorkLink>
  );
};
export default WorkSearchResultV2;
