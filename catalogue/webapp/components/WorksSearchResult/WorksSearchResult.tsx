import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { classNames, font } from '@weco/common/utils/classnames';
import LinkLabels from '@weco/common/views/components/LinkLabels/LinkLabels';
import { trackEvent } from '@weco/common/utils/ga';
import IIIFImage from '../IIIFImage/IIIFImage';
import { convertIiifImageUri } from '@weco/common/utils/convert-image-uri';
import Space, {
  SpaceComponentProps,
} from '@weco/common/views/components/styled/Space';
import WorkTitle from '../WorkTitle/WorkTitle';
import WorkLink from '@weco/common/views/components/WorkLink/WorkLink';
import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';
import { WorkBasic } from '../../model/catalogue';

type Props = {
  work: WorkBasic;
  resultPosition: number;
};

const Wrapper = styled.div`
  border-top: 1px solid ${props => props.theme.color('pumice')};
`;

const Container = styled.div`
  ${props => props.theme.media.medium`
    display: flex;
  `}
`;
const Details = styled.div`
  ${props => props.theme.media.medium`
    flex-grow: 1;
    max-width: 800px;
  `}
`;
const Preview = styled(Space).attrs<SpaceComponentProps>(() => ({
  h: { size: 'm', properties: ['padding-left'] },
  className: classNames({
    'text-align-center': true,
  }),
}))`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 178px;
  height: 178px;
  margin-left: auto;
  margin-top: ${props => props.theme.spacingUnit * 2}px;
  position: relative;

  ${props => props.theme.media.medium`
    margin-top: 0;
  `}

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

// TODO: remove, hack to handle the fact that we are pulling through PDF thumbnails.
// These will be removed from the API at some stage.
function isPdfThumbnail(thumbnail): boolean {
  // e.g. https://dlcs.io/iiif-img/wellcome/5/b28820769_WG_2006_PAAG-implementing-persistent-identifiers_EN.pdf/full/!200,200/0/default.jpg
  return Boolean(thumbnail.url.match('.pdf/full'));
}

const WorkSearchResult: FunctionComponent<Props> = ({
  work,
  resultPosition,
}: Props) => {
  const {
    productionDates,
    archiveLabels,
    cardLabels,
    primaryContributorLabel,
  } = work;

  return (
    <Wrapper>
      <WorkLink
        id={work.id}
        resultPosition={resultPosition}
        source={`works_search_result`}
        passHref
      >
        <Space
          as="a"
          v={{
            size: 'm',
            properties: ['padding-top', 'padding-bottom'],
          }}
          className={classNames({
            'plain-link': true,
            block: true,
            'card-link': true,
          })}
          onClick={() => {
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
            <Details>
              <h2
                className={classNames({
                  [font('intb', 4)]: true,
                  'card-link__title': true,
                })}
              >
                <WorkTitle title={work.title} />
              </h2>

              {primaryContributorLabel && (
                <Space h={{ size: 'm', properties: ['margin-right'] }}>
                  <LinkLabels
                    items={[
                      {
                        text: primaryContributorLabel,
                      },
                    ]}
                  />
                </Space>
              )}

              {productionDates.length > 0 && (
                <LinkLabels
                  heading={'Date'}
                  items={[
                    {
                      text: productionDates[0],
                      url: null,
                    },
                  ]}
                />
              )}

              {archiveLabels?.reference && (
                <LinkLabels
                  heading="Reference"
                  items={[{ text: archiveLabels.reference }]}
                />
              )}
              {archiveLabels?.partOf && (
                <LinkLabels
                  heading="Part of"
                  items={[{ text: archiveLabels.partOf }]}
                />
              )}
              <Space
                v={{
                  size: 'm',
                  properties: ['margin-top'],
                }}
              >
                <LabelsList labels={cardLabels} defaultLabelColor="cream" />
              </Space>
            </Details>
            {work.thumbnail && !isPdfThumbnail(work.thumbnail) && (
              <Preview>
                <IIIFImage
                  image={{
                    alt: '',
                    contentUrl: convertIiifImageUri(work.thumbnail.url, 178),
                    width: 178,
                    height: 178,
                  }}
                  layout="fill"
                />
              </Preview>
            )}
          </Container>
        </Space>
      </WorkLink>
    </Wrapper>
  );
};
export default WorkSearchResult;
