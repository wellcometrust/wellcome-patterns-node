import { FunctionComponent, useContext } from 'react';
import { WorkBasic } from '@weco/catalogue/services/wellcome/catalogue/types';
import { font, grid } from '@weco/common/utils/classnames';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import LinkLabels from '@weco/common/views/components/LinkLabels/LinkLabels';
import Space from '@weco/common/views/components/styled/Space';
import Number from '@weco/common/views/components/Number/Number';
import styled from 'styled-components';
import WorkTitle from '../WorkTitle/WorkTitle';
import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';
import Divider from '@weco/common/views/components/Divider/Divider';
import IsArchiveContext from '../IsArchiveContext/IsArchiveContext';

const WorkHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-content: flex-start;
`;

const WorkTitleWrapper = styled.h1.attrs({ className: font('intb', 2) })`
  margin: 0;
  display: inline-block;
`;

type Props = {
  work: WorkBasic;
  collectionManifestsCount: number | undefined;
};

const WorkHeader: FunctionComponent<Props> = ({
  work,
  collectionManifestsCount,
}) => {
  const isArchive = useContext(IsArchiveContext);
  const {
    productionDates,
    archiveLabels,
    cardLabels,
    primaryContributorLabel,
  } = work;

  return (
    <>
      <WorkHeaderContainer>
        <Space
          v={{
            size: 'm',
            properties: ['margin-bottom'],
          }}
          className={grid({ s: 12, m: 12, l: 10, xl: 10 })}
        >
          <SpacingComponent>
            <WorkTitleWrapper
              aria-live="polite"
              id="work-info"
              lang={work.languageId}
            >
              <WorkTitle title={work.title} />
            </WorkTitleWrapper>

            {primaryContributorLabel && (
              <Space h={{ size: 'm', properties: ['margin-right'] }}>
                <LinkLabels items={[{ text: primaryContributorLabel }]} />
              </Space>
            )}

            {productionDates.length > 0 && (
              <LinkLabels
                heading="Date"
                items={[{ text: productionDates[0] }]}
              />
            )}

            {work.referenceNumber && (
              <LinkLabels
                heading="Reference"
                items={[{ text: work.referenceNumber }]}
              />
            )}

            {archiveLabels?.partOf && (
              <LinkLabels
                heading="Part of"
                items={[{ text: archiveLabels.partOf }]}
              />
            )}

            {cardLabels.length > 0 && (
              <Space
                v={{
                  size: 'm',
                  properties: ['margin-top'],
                }}
              >
                <LabelsList
                  labels={cardLabels}
                  defaultLabelColor="warmNeutral.300"
                />
              </Space>
            )}

            {Boolean(
              collectionManifestsCount && collectionManifestsCount > 0
            ) && (
              <Space v={{ size: 'm', properties: ['margin-top'] }}>
                <p className={font('intb', 5)} style={{ marginBottom: 0 }}>
                  <Number
                    backgroundColor="yellow"
                    number={collectionManifestsCount as number}
                  />
                  {collectionManifestsCount === 1 ? ' volume ' : ' volumes '}
                  online
                </p>
              </Space>
            )}
          </SpacingComponent>
        </Space>
      </WorkHeaderContainer>
      {!isArchive && (
        <WorkHeaderContainer>
          <Space
            v={{
              size: 'm',
              properties: ['margin-bottom'],
            }}
            className={grid({ s: 12, m: 12, l: 12, xl: 12 })}
          >
            <Divider lineColor="neutral.400" />
          </Space>
        </WorkHeaderContainer>
      )}
    </>
  );
};
export default WorkHeader;
