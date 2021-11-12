import moment from 'moment';
import NextLink from 'next/link';
import { FunctionComponent, useContext, useState } from 'react';
import { classNames, font } from '@weco/common/utils/classnames';
import { downloadUrl } from '../../services/catalogue/urls';
import { toLink as worksLink } from '@weco/common/views/components/WorksLink/WorksLink';
import { toLink as imagesLink } from '@weco/common/views/components/ImagesLink/ImagesLink';
import {
  getDigitalLocationInfo,
  getDigitalLocationOfType,
  getDownloadOptionsFromImageUrl,
  getHoldings,
  getItemsWithPhysicalLocation,
  getLocationLabel,
  getLocationLink,
  getLocationShelfmark,
  sierraIdFromPresentationManifestUrl,
} from '../../utils/works';
import { getMediaClickthroughService, getTokenService } from '../../utils/iiif';
import CopyUrl from '@weco/common/views/components/CopyUrl/CopyUrl';
import Space from '@weco/common/views/components/styled/Space';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';
import Download from '../Download/Download';
import WorkDetailsSection from '../WorkDetailsSection/WorkDetailsSection';
import WorkDetailsText from '../WorkDetailsText/WorkDetailsText';
import WorkDetailsList from '../WorkDetailsList/WorkDetailsList';
import WorkDetailsTags from '../WorkDetailsTags/WorkDetailsTags';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import ButtonSolidLink from '@weco/common/views/components/ButtonSolidLink/ButtonSolidLink';
import ButtonOutlinedLink from '@weco/common/views/components/ButtonOutlinedLink/ButtonOutlinedLink';
import ExplanatoryText from '@weco/common/views/components/ExplanatoryText/ExplanatoryText';
import { toLink as itemLink } from '@weco/common/views/components/ItemLink/ItemLink';
import { trackEvent } from '@weco/common/utils/ga';
import PhysicalItems from '../PhysicalItems/PhysicalItems';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import { DigitalLocation, Work } from '@weco/common/model/catalogue';
import useIIIFManifestData from '../../hooks/useIIIFManifestData';
import IIIFClickthrough from '../IIIFClickthrough/IIIFClickthrough';
import OnlineResources from './OnlineResources';
import ExpandableList from '@weco/common/views/components/ExpandableList/ExpandableList';
import IsArchiveContext from '../IsArchiveContext/IsArchiveContext';
import SignInBar from '../SignInBar/SignInBar';
import { eye } from '@weco/common/icons';
import {
  abortErrorHandler,
  useAbortSignalEffect,
} from '@weco/common/hooks/useAbortSignalEffect';
import { itemIsRequestable } from '../../utils/requesting';
import { useToggles } from '@weco/common/server-data/Context';

type Props = {
  work: Work;
};

// At the moment we aren't set up to cope with access conditions,
// 'permission-required', so we pass them off to the UV on the library site
// If we have audio or video, then we show it in situ and don't link to the Item page
type ItemLinkState = 'useItemLink' | 'useLibraryLink' | 'useNoLink';
function getItemLinkState({
  accessCondition,
  sierraIdFromManifestUrl,
  itemUrl,
  audio,
  video,
}): ItemLinkState | undefined {
  if (accessCondition === 'permission-required' && sierraIdFromManifestUrl) {
    return 'useLibraryLink';
  }
  if (accessCondition === 'closed') {
    return 'useNoLink';
  }
  if (itemUrl && !audio && !video) {
    return 'useItemLink';
  }
}

const WorkDetails: FunctionComponent<Props> = ({ work }: Props) => {
  const { enableRequesting } = useToggles();
  const isArchive = useContext(IsArchiveContext);

  const itemUrl = itemLink({ workId: work.id }, 'work');

  // Determine digital location
  const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');

  const iiifPresentationLocation = getDigitalLocationOfType(
    work,
    'iiif-presentation'
  );

  const digitalLocation: DigitalLocation | undefined =
    iiifPresentationLocation || iiifImageLocation;

  const [imageJson, setImageJson] = useState<{
    width: number;
    height: number;
  }>();

  useAbortSignalEffect(signal => {
    const fetchImageJson = async () => {
      try {
        const imageJson =
          iiifImageLocation &&
          (await fetch(iiifImageLocation.url, { signal }).then(resp =>
            resp.json()
          ));

        setImageJson(imageJson);
      } catch (e) {}
    };
    fetchImageJson().catch(abortErrorHandler);
  }, []);

  const digitalLocationInfo =
    digitalLocation && getDigitalLocationInfo(digitalLocation);

  const {
    imageCount,
    childManifestsCount,
    audio,
    video,
    iiifCredit,
    iiifPresentationDownloadOptions = [],
    iiifDownloadEnabled,
  } = useIIIFManifestData(work);

  const authService =
    (video && getMediaClickthroughService(video)) ||
    (audio && getMediaClickthroughService(audio));

  const tokenService = authService && getTokenService(authService);

  // iiif-presentation locations don't have credit info in the work API currently, so we try and get it from the manifest
  const credit = (digitalLocation && digitalLocation.credit) || iiifCredit;

  const iiifImageLocationUrl = iiifImageLocation && iiifImageLocation.url;

  const iiifImageDownloadOptions = iiifImageLocationUrl
    ? getDownloadOptionsFromImageUrl({
        url: iiifImageLocationUrl,
        width: imageJson && imageJson.width,
        height: imageJson && imageJson.height,
      })
    : [];

  const downloadOptions = [
    ...iiifImageDownloadOptions,
    ...iiifPresentationDownloadOptions,
  ];

  // 'About this work' data
  const duration =
    work.duration && moment.utc(work.duration).format('HH:mm:ss');

  // 'Identifiers' data
  const isbnIdentifiers = work.identifiers.filter(id => {
    return id.identifierType.id === 'isbn';
  });

  const issnIdentifiers = work.identifiers.filter(id => {
    return id.identifierType.id === 'issn';
  });

  const sierraIdFromManifestUrl =
    iiifPresentationLocation &&
    sierraIdFromPresentationManifestUrl(iiifPresentationLocation.url);

  const physicalItems = getItemsWithPhysicalLocation(work.items ?? []);

  const locationOfWork = work.notes.find(
    note => note.noteType.id === 'location-of-original'
  );
  const arrangementNote = work.notes.filter(
    note => note.noteType.id === 'arrangement-note'
  );
  const biographicalNote = work.notes.filter(
    note => note.noteType.id === 'biographical-note'
  );
  const relatedMaterial = work.notes.filter(
    note => note.noteType.id === 'related-material'
  );
  const acquisitionNote = work.notes.filter(
    note => note.noteType.id === 'acquisition-note'
  );

  const orderedNotes = [
    ...arrangementNote,
    ...acquisitionNote,
    ...biographicalNote,
    ...relatedMaterial,
  ];

  const remainingNotes = work.notes.filter(note => {
    return ![...orderedNotes, locationOfWork].some(n => n === note);
  });

  function determineDownloadVisibility(iiifDownloadEnabled) {
    if (digitalLocationInfo?.accessCondition === 'open-with-advisory') {
      return false;
    } else {
      return iiifDownloadEnabled !== undefined ? iiifDownloadEnabled : true;
    }
  }

  const showDownloadOptions = determineDownloadVisibility(iiifDownloadEnabled);

  const itemLinkState = getItemLinkState({
    accessCondition: digitalLocationInfo?.accessCondition,
    sierraIdFromManifestUrl,
    itemUrl,
    audio,
    video,
  });

  const holdings = getHoldings(work);

  const renderWhereToFindIt = () => {
    return (
      <WorkDetailsSection headingText="Where to find it">
        {enableRequesting && physicalItems.some(itemIsRequestable) && (
          <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
            <SignInBar />
          </Space>
        )}
        {locationOfWork && (
          <WorkDetailsText
            title={locationOfWork.noteType.label}
            text={locationOfWork.contents}
          />
        )}
        <PhysicalItems work={work} items={physicalItems} />
      </WorkDetailsSection>
    );
  };

  const renderHoldings = () => {
    return (
      <>
        {holdings.length > 0 ? (
          <WorkDetailsSection headingText="Holdings">
            {holdings.map((holding, i) => {
              const locationLabel =
                holding.location && getLocationLabel(holding.location);
              const locationShelfmark =
                holding.location && getLocationShelfmark(holding.location);
              const locationLink =
                holding.location && getLocationLink(holding.location);
              return (
                <Space
                  key={i}
                  v={
                    i + 1 !== holdings.length
                      ? { size: 'l', properties: ['margin-bottom'] }
                      : { size: 'l', properties: [] }
                  }
                >
                  {holding.enumeration.length > 0 && (
                    <Space
                      key={i}
                      v={{ size: 's', properties: ['margin-bottom'] }}
                    >
                      <ExpandableList
                        listItems={holding.enumeration}
                        initialItems={10}
                      />
                    </Space>
                  )}
                  <Space
                    key={i}
                    v={{ size: 's', properties: ['margin-bottom'] }}
                  >
                    {locationLink && (
                      <a
                        className={classNames({
                          [font('hnr', 5)]: true,
                        })}
                        href={locationLink.url}
                      >
                        {locationLink.linkText}
                      </a>
                    )}

                    {locationShelfmark && (
                      <WorkDetailsText
                        title="Location"
                        noSpacing={true}
                        text={[`${locationLabel} ${locationShelfmark}`]}
                      />
                    )}

                    {holding.note && (
                      <WorkDetailsText
                        title="Note"
                        inlineHeading={true}
                        noSpacing={true}
                        text={[holding.note]}
                      />
                    )}
                  </Space>
                </Space>
              );
            })}
          </WorkDetailsSection>
        ) : null}
      </>
    );
  };

  const renderContent = () => (
    <>
      {digitalLocation && itemLinkState !== 'useNoLink' && (
        <WorkDetailsSection headingText="Available online">
          <ConditionalWrapper
            condition={Boolean(tokenService)}
            wrapper={children =>
              itemUrl && (
                <IIIFClickthrough
                  authService={authService}
                  tokenService={tokenService}
                  trackingId={work.id}
                >
                  {children}
                </IIIFClickthrough>
              )
            }
          >
            {video && (
              <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                <VideoPlayer
                  video={video}
                  showDownloadOptions={showDownloadOptions}
                />
              </Space>
            )}
            {audio && (
              <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                <AudioPlayer audio={audio} />
              </Space>
            )}
            {itemLinkState === 'useLibraryLink' && (
              <Space
                as="span"
                h={{
                  size: 'm',
                  properties: ['margin-right'],
                }}
              >
                <ButtonSolidLink
                  icon={eye}
                  text="View"
                  trackingEvent={{
                    category: 'WorkDetails',
                    action: 'follow view link',
                    label: work.id,
                  }}
                  link={`https://wellcomelibrary.org/item/${
                    sierraIdFromManifestUrl || ''
                  }`}
                />
              </Space>
            )}
            {itemLinkState === 'useItemLink' && (
              <>
                {work.thumbnail && (
                  <Space
                    v={{
                      size: 's',
                      properties: ['margin-bottom'],
                    }}
                  >
                    <ConditionalWrapper
                      condition={Boolean(itemUrl)}
                      wrapper={children =>
                        itemUrl && (
                          <NextLink href={itemUrl.href} as={itemUrl.as}>
                            <a
                              onClick={() =>
                                trackEvent({
                                  category: 'WorkDetails',
                                  action: 'follow image link',
                                  label: work.id,
                                })
                              }
                            >
                              {children}
                            </a>
                          </NextLink>
                        )
                      }
                    >
                      <img
                        style={{
                          width: 'auto',
                          height: 'auto',
                        }}
                        alt={`view ${work.title}`}
                        src={work.thumbnail.url}
                      />
                    </ConditionalWrapper>
                  </Space>
                )}

                <div
                  className={classNames({
                    'flex flex-h-center': true,
                  })}
                >
                  {itemUrl && (
                    <Space
                      as="span"
                      h={{
                        size: 'm',
                        properties: ['margin-right'],
                      }}
                    >
                      <ButtonSolidLink
                        icon={eye}
                        text="View"
                        trackingEvent={{
                          category: 'WorkDetails',
                          action: 'follow view link',
                          label: itemUrl?.href?.query?.workId?.toString(),
                        }}
                        link={{ ...itemUrl }}
                      />
                    </Space>
                  )}

                  {showDownloadOptions && (
                    <Download
                      ariaControlsId="itemDownloads"
                      workId={work.id}
                      downloadOptions={downloadOptions}
                    />
                  )}
                </div>
                {!(downloadOptions.length > 0) &&
                  sierraIdFromManifestUrl &&
                  childManifestsCount === 0 && (
                    <NextLink
                      {...downloadUrl({
                        workId: work.id,
                        sierraId: sierraIdFromManifestUrl,
                      })}
                    >
                      <a>Download options</a>
                    </NextLink>
                  )}
                {(childManifestsCount > 0 || imageCount > 0) && (
                  <Space
                    v={{
                      size: 'm',
                      properties: ['margin-top'],
                    }}
                  >
                    <p
                      className={classNames({
                        'no-margin': true,
                        [font('lr', 6)]: true,
                      })}
                    >
                      Contains:{' '}
                      {childManifestsCount > 0
                        ? `${childManifestsCount} volumes`
                        : imageCount > 0
                        ? `${imageCount} ${
                            imageCount === 1 ? 'image' : 'images'
                          }`
                        : ''}
                    </p>
                  </Space>
                )}
              </>
            )}
          </ConditionalWrapper>

          {digitalLocationInfo?.license && (
            <>
              <Space
                v={{
                  size: 'l',
                  properties: ['margin-top'],
                }}
              >
                <WorkDetailsText
                  title="Licence"
                  text={[digitalLocationInfo.license.label]}
                />
              </Space>
              {digitalLocation?.accessConditions[0]?.terms && (
                <Space
                  v={{
                    size: 'l',
                    properties: ['margin-top'],
                  }}
                >
                  <WorkDetailsText
                    title="Access conditions"
                    noSpacing={true}
                    text={[digitalLocation?.accessConditions[0]?.terms]}
                  />
                </Space>
              )}
              <Space
                v={{
                  size: 'l',
                  properties: ['margin-top'],
                }}
              >
                <ExplanatoryText
                  id="licenseDetail"
                  controlText="Can I use this?"
                >
                  <>
                    {digitalLocationInfo.license.humanReadableText.length >
                      0 && (
                      <WorkDetailsText
                        text={digitalLocationInfo.license.humanReadableText}
                      />
                    )}
                    <WorkDetailsText
                      text={[
                        [
                          `Credit: ${work.title.replace(/\.$/g, '')}.`,
                          credit &&
                            `<a href="https://wellcomecollection.org/works/${work.id}">${credit}</a>.`,
                          digitalLocationInfo.license.url
                            ? `<a href="${digitalLocationInfo.license.url}">${digitalLocationInfo.license.label}</a>`
                            : digitalLocationInfo.license.label,
                        ]
                          .filter(Boolean)
                          .join(' '),
                      ]}
                    />
                  </>
                </ExplanatoryText>
              </Space>
            </>
          )}
        </WorkDetailsSection>
      )}

      <OnlineResources work={work} />

      {work.images && work.images.length > 0 && (
        <WorkDetailsSection headingText="Selected images from this work">
          <ButtonOutlinedLink
            text={
              work.images.length > 1
                ? `View ${work.images.length} images`
                : 'View 1 image'
            }
            link={imagesLink(
              {
                query: work.id,
              },
              'work_details/images'
            )}
          />
        </WorkDetailsSection>
      )}

      <WorkDetailsSection headingText="About this work">
        {work.alternativeTitles.length > 0 && (
          <WorkDetailsText
            title="Also known as"
            text={work.alternativeTitles}
          />
        )}

        {work.description && (
          <WorkDetailsText title="Description" text={[work.description]} />
        )}

        {work.production.length > 0 && (
          <WorkDetailsText
            title="Publication/Creation"
            text={work.production.map(productionEvent => productionEvent.label)}
          />
        )}

        {work.physicalDescription && (
          <WorkDetailsText
            title="Physical description"
            text={[work.physicalDescription]}
          />
        )}

        {work.contributors.length > 0 && (
          <WorkDetailsTags
            title="Contributors"
            tags={work.contributors.map(contributor => ({
              textParts: [
                contributor.agent.label,
                ...contributor.roles.map(role => role.label),
              ],
              linkAttributes: worksLink(
                {
                  'contributors.agent.label': [contributor.agent.label],
                },
                'work_details/contributors'
              ),
            }))}
            separator=""
          />
        )}

        {orderedNotes.map(note => (
          <WorkDetailsText
            key={note.noteType.label}
            title={note.noteType.label}
            text={note.contents}
          />
        ))}

        {work.lettering && (
          <WorkDetailsText title="Lettering" text={[work.lettering]} />
        )}

        {work.edition && (
          <WorkDetailsText title="Edition" text={[work.edition]} />
        )}

        {duration && <WorkDetailsText title="Duration" text={[duration]} />}

        {remainingNotes.map(note => (
          <WorkDetailsText
            key={note.noteType.label}
            title={note.noteType.label}
            text={note.contents}
          />
        ))}

        {work.genres.length > 0 && (
          <WorkDetailsTags
            title="Type/Technique"
            tags={work.genres.map(g => {
              return {
                textParts: g.concepts.map(c => c.label),
                linkAttributes: worksLink(
                  {
                    'genres.label': [g.label],
                  },
                  'work_details/genres'
                ),
              };
            })}
          />
        )}

        {work.languages.length > 0 && (
          <WorkDetailsList
            title="Languages"
            list={work.languages.map(lang => lang.label)}
          />
        )}
      </WorkDetailsSection>
      {work.subjects.length > 0 && (
        <WorkDetailsSection headingText="Subjects">
          <WorkDetailsTags
            tags={work.subjects.map(s => {
              return {
                textParts: s.concepts.map(c => c.label),
                linkAttributes: worksLink(
                  {
                    'subjects.label': [s.label],
                  },
                  'work_details/subjects'
                ),
              };
            })}
          />
        </WorkDetailsSection>
      )}

      {renderHoldings()}

      {(locationOfWork || physicalItems.length > 0) && renderWhereToFindIt()}

      <WorkDetailsSection headingText="Permanent link">
        <div className={`${font('hnr', 5)}`}>
          <CopyUrl
            id={work.id}
            url={`https://wellcomecollection.org/works/${work.id}`}
          />
        </div>
      </WorkDetailsSection>

      {isbnIdentifiers.length > 0 && (
        <WorkDetailsSection headingText="Identifiers">
          {isbnIdentifiers.length > 0 && (
            <WorkDetailsList
              title="ISBN"
              list={isbnIdentifiers.map(id => id.value)}
            />
          )}
          {issnIdentifiers.length > 0 && (
            <WorkDetailsList
              title="ISSN"
              list={issnIdentifiers.map(id => id.value)}
            />
          )}
        </WorkDetailsSection>
      )}
    </>
  );

  return isArchive ? (
    <Space h={{ size: 'l', properties: ['padding-left', 'padding-right'] }}>
      {renderContent()}
    </Space>
  ) : (
    <Layout12>{renderContent()}</Layout12>
  );
};

export default WorkDetails;
