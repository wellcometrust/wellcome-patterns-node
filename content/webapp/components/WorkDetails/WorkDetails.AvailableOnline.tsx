import NextLink from 'next/link';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';
import WorkDetailsSection from './WorkDetails.Section';
import IIIFClickthrough from '@weco/content/components/IIIFClickthrough/IIIFClickthrough';
import Space from '@weco/common/views/components/styled/Space';
import Button from '@weco/common/views/components/Buttons';
import WorkDetailsLicence from './WorkDetails.Licence';
import DownloadList from './WorkDetails.DownloadList';
import { eye } from '@weco/common/icons';
import { font } from '@weco/common/utils/classnames';
import { LinkProps } from '@weco/common/model/link-props';
import { DownloadOption } from '@weco/content/types/manifest';
import useTransformedManifest from '@weco/content/hooks/useTransformedManifest';
import { Note, Work } from '@weco/content/services/wellcome/catalogue/types';
import { DigitalLocationInfo } from '@weco/content/utils/works';
import { DigitalLocation } from '@weco/common/model/catalogue';
import IIIFItemList from '@weco/content/components/IIIFItemList/IIIFItemList';
import DownloadLink from '@weco/content/components/DownloadLink/DownloadLink';
import Download from '@weco/content/components/Download/Download';
import { getLabelString, getFormatString } from '@weco/content/utils/iiif/v3';
import { InternationalString, ContentResource } from '@iiif/presentation-3';
import { useToggles } from '@weco/common/server-data/Context';

type Props = {
  work: Work;
  downloadOptions: DownloadOption[];
  itemUrl: LinkProps;
  shouldShowItemLink: boolean;
  digitalLocation: DigitalLocation | undefined;
  digitalLocationInfo?: DigitalLocationInfo;
  locationOfWork?: Note;
};

const ItemPageLink = ({
  work,
  itemUrl,
  downloadOptions,
  collectionManifestsCount,
  canvasCount,
  digitalLocationInfo,
}) => {
  return (
    <>
      {work.thumbnail && (
        <Space $v={{ size: 's', properties: ['margin-bottom'] }}>
          <ConditionalWrapper
            condition={Boolean(itemUrl)}
            wrapper={children =>
              itemUrl && (
                <NextLink
                  style={{
                    display: 'inline-block',
                  }}
                  href={itemUrl.href}
                  as={itemUrl.as}
                >
                  {children}
                </NextLink>
              )
            }
          >
            <img
              style={{
                width: 'auto',
                height: 'auto',
                display: 'block',
              }}
              alt={`view ${work.title}`}
              src={work.thumbnail.url}
            />
          </ConditionalWrapper>
        </Space>
      )}
      <div style={{ display: 'flex' }}>
        {itemUrl && (
          <Space as="span" $h={{ size: 'm', properties: ['margin-right'] }}>
            <Button
              variant="ButtonSolidLink"
              icon={eye}
              text="View"
              link={{ ...itemUrl }}
            />
          </Space>
        )}
        {digitalLocationInfo?.accessCondition !== 'open-with-advisory' &&
          downloadOptions.length > 0 && (
            <Download
              ariaControlsId="itemDownloads"
              downloadOptions={downloadOptions}
            />
          )}
      </div>
      {(Boolean(collectionManifestsCount && collectionManifestsCount > 0) ||
        Boolean(canvasCount && canvasCount > 0)) && (
        <Space $v={{ size: 'm', properties: ['margin-top'] }}>
          <p className={`${font('lr', 6)}`} style={{ marginBottom: 0 }}>
            Contains:{' '}
            {collectionManifestsCount && collectionManifestsCount > 0
              ? `${collectionManifestsCount} ${
                  collectionManifestsCount === 1 ? 'volume' : 'volumes'
                }`
              : canvasCount && canvasCount > 0
                ? `${canvasCount} ${canvasCount === 1 ? 'image' : 'images'}`
                : ''}
          </p>
        </Space>
      )}
    </>
  );
};

const WorkDetailsAvailableOnline = ({
  work,
  downloadOptions,
  itemUrl,
  shouldShowItemLink,
  digitalLocationInfo,
  digitalLocation,
  locationOfWork,
}: Props) => {
  const { showBornDigital } = useToggles();
  const transformedIIIFManifest = useTransformedManifest(work);
  const {
    collectionManifestsCount,
    canvasCount,
    clickThroughService,
    tokenService,
    structures,
    bornDigitalStatus,
    canvases,
    placeholderId,
    rendering,
  } = { ...transformedIIIFManifest };
  return (
    <WorkDetailsSection headingText="Available online">
      <ConditionalWrapper
        condition={Boolean(tokenService && !shouldShowItemLink)}
        wrapper={children =>
          itemUrl && (
            <IIIFClickthrough
              clickThroughService={clickThroughService}
              tokenService={tokenService}
            >
              {children}
            </IIIFClickthrough>
          )
        }
      >
        {showBornDigital &&
          (bornDigitalStatus === 'mixedBornDigital' ||
            bornDigitalStatus === 'allBornDigital') && (
            <DownloadList
              structures={
                structures && structures.length > 0
                  ? structures
                  : canvases || []
              }
              canvases={canvases || []}
            />
          )}

        {(!showBornDigital ||
          (showBornDigital && bornDigitalStatus === 'noBornDigital')) && (
          <>
            {!shouldShowItemLink && (
              <>
                <IIIFItemList
                  canvases={canvases}
                  exclude={['Image', 'Text']}
                  placeholderId={placeholderId}
                />
                {rendering?.map(r => {
                  const rendering = r as ContentResource & {
                    format?: string;
                  };
                  if (rendering.id && 'label' in rendering) {
                    const labelString = getLabelString(
                      rendering.label as InternationalString
                    );
                    const label = labelString
                      ?.toLowerCase()
                      .includes('transcript')
                      ? `Transcript of ${work.title}`
                      : labelString;
                    return (
                      <Space
                        key={rendering.id}
                        $v={{ size: 's', properties: ['margin-top'] }}
                      >
                        <DownloadLink
                          href={rendering.id}
                          linkText={label || 'Download'}
                          format={getFormatString(rendering.format || '')}
                          mimeType={rendering.format || ''}
                          trackingTags={['annotation']}
                        />
                      </Space>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
            {shouldShowItemLink && (
              <ItemPageLink
                work={work}
                itemUrl={itemUrl}
                collectionManifestsCount={collectionManifestsCount}
                canvasCount={canvasCount}
                downloadOptions={downloadOptions}
                digitalLocationInfo={digitalLocationInfo}
              />
            )}
          </>
        )}
      </ConditionalWrapper>

      {digitalLocationInfo?.license && (
        <WorkDetailsLicence
          digitalLocationLicense={digitalLocationInfo.license}
          accessConditionsTerms={digitalLocation?.accessConditions[0]?.terms}
          credit={digitalLocation?.credit}
          locationOfWork={locationOfWork}
          workId={work.id}
          workTitle={work.title}
        />
      )}
    </WorkDetailsSection>
  );
};

export default WorkDetailsAvailableOnline;
