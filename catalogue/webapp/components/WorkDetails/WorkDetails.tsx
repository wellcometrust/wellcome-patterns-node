import NextLink from 'next/link';
import { FunctionComponent, useContext } from 'react';
import { font } from '@weco/common/utils/classnames';
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
} from '../../utils/works';
import CopyUrl from '../CopyUrl/CopyUrl';
import Space from '@weco/common/views/components/styled/Space';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';
import Download from '../Download/Download';
import WorkDetailsSection from '../WorkDetailsSection/WorkDetailsSection';
import WorkDetailsText from '../WorkDetailsText/WorkDetailsText';
import WorkDetailsList from '../WorkDetailsList/WorkDetailsList';
import WorkDetailsTags from '../WorkDetailsTags/WorkDetailsTags';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import AudioList from '../AudioList/AudioList';
import ButtonSolidLink from '@weco/common/views/components/ButtonSolidLink/ButtonSolidLink';
import ExplanatoryText from './ExplanatoryText';
import { toLink as itemLink } from '@weco/common/views/components/ItemLink/ItemLink';
import { trackGaEvent } from '@weco/common/utils/ga';
import PhysicalItems from '../PhysicalItems/PhysicalItems';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import { DigitalLocation, Work } from '@weco/common/model/catalogue';
import useTransformedManifest from '../../hooks/useTransformedManifest';
import useTransformedIIIFImage from '../../hooks/useTransformedIIIFImage';
import IIIFClickthrough from '../IIIFClickthrough/IIIFClickthrough';
import OnlineResources from './OnlineResources';
import ExpandableList from '@weco/common/views/components/ExpandableList/ExpandableList';
import IsArchiveContext from '../IsArchiveContext/IsArchiveContext';
import LibraryMembersBar from '../LibraryMembersBar/LibraryMembersBar';
import { eye } from '@weco/common/icons';
import {
  itemIsRequestable,
  itemIsTemporarilyUnavailable,
} from '../../utils/requesting';
import { themeValues } from '@weco/common/views/themes/config';
import { formatDuration } from '@weco/common/utils/format-date';

type Props = {
  work: Work;
  shouldShowItemLink: boolean;
};

const WorkDetails: FunctionComponent<Props> = ({
  work,
  shouldShowItemLink,
}: Props) => {
  const isArchive = useContext(IsArchiveContext);
  const itemUrl = itemLink({ workId: work.id }, 'work');
  const transformedIIIFImage = useTransformedIIIFImage(work);
  const transformedIIIFManifest = useTransformedManifest(work);
  const {
    video,
    iiifCredit,
    downloadEnabled,
    downloadOptions: manifestDownloadOptions,
    collectionManifestsCount,
    canvasCount,
    audio,
    clickThroughService,
    tokenService,
  } = transformedIIIFManifest;

  const iiifImageLocation = getDigitalLocationOfType(work, 'iiif-image');
  const iiifPresentationLocation = getDigitalLocationOfType(
    work,
    'iiif-presentation'
  );

  // Works can have a DigitalLocation of type iiif-presentation and/or iiif-image.
  // For a iiif-presentation DigitalLocation we get the download options from the manifest to which it points.
  // For a iiif-image DigitalLocation we create the download options
  // from a combination of the DigitalLocation and the iiif-image json to which it points.
  // The json provides the image width and height used in the link text.
  // Since this isn't vital to rendering the links, the useTransformedIIIFImage hook
  // gets this data client side.
  const iiifImageLocationUrl = iiifImageLocation?.url;
  const iiifImageDownloadOptions = iiifImageLocationUrl
    ? getDownloadOptionsFromImageUrl({
        url: iiifImageLocationUrl,
        width: transformedIIIFImage?.width,
        height: transformedIIIFImage?.height,
      })
    : [];

  const downloadOptions = [
    ...manifestDownloadOptions,
    ...iiifImageDownloadOptions,
  ];

  // Determine digital location. If the work has a iiif-presentation location and a iiif-image location
  // we use the former
  const digitalLocation: DigitalLocation | undefined =
    iiifPresentationLocation || iiifImageLocation;
  const digitalLocationInfo =
    digitalLocation && getDigitalLocationInfo(digitalLocation);

  // iiif-image locations have credit info.
  // iiif-presentation locations don't have credit info., so we fall back to the data in the manifest
  const credit = digitalLocation?.credit || iiifCredit;

  // 'About this work' data
  const duration = work.duration && formatDuration(work.duration);

  // 'Identifiers' data
  const isbnIdentifiers = work.identifiers.filter(id => {
    return id.identifierType.id === 'isbn';
  });

  const issnIdentifiers = work.identifiers.filter(id => {
    return id.identifierType.id === 'issn';
  });
  const seriesPartOfs = work.partOf.filter(p => !p['id']);

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

  function determineDownloadVisibility(downloadEnabled: boolean | undefined) {
    if (digitalLocationInfo?.accessCondition === 'open-with-advisory') {
      return false;
    } else {
      return downloadEnabled !== undefined ? downloadEnabled : true;
    }
  }

  const showDownloadOptions = determineDownloadVisibility(downloadEnabled);

  const holdings = getHoldings(work);

  const showAvailableOnlineSection =
    digitalLocation && (shouldShowItemLink || audio || video);

  const renderWhereToFindIt = () => {
    return (
      <WorkDetailsSection headingText="Where to find it">
        {physicalItems.some(
          item => itemIsRequestable(item) || itemIsTemporarilyUnavailable(item)
        ) && (
          <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
            <LibraryMembersBar />
          </Space>
        )}
        {locationOfWork && (
          <WorkDetailsText
            title={locationOfWork.noteType.label}
            html={locationOfWork.contents}
            allowDangerousRawHtml={true}
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
                      <a className={font('intr', 5)} href={locationLink.url}>
                        {locationLink.linkText}
                      </a>
                    )}

                    {locationShelfmark && (
                      <WorkDetailsText
                        title="Location"
                        noSpacing={true}
                        text={`${locationLabel} ${locationShelfmark}`}
                      />
                    )}

                    {holding.note && (
                      <WorkDetailsText
                        title="Note"
                        inlineHeading={true}
                        noSpacing={true}
                        text={holding.note}
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
      {showAvailableOnlineSection && (
        <WorkDetailsSection headingText="Available online">
          <ConditionalWrapper
            condition={Boolean(tokenService && !shouldShowItemLink)}
            wrapper={children =>
              itemUrl && (
                <IIIFClickthrough
                  clickThroughService={clickThroughService}
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

            {audio?.sounds && audio.sounds.length > 0 && (
              <AudioList
                items={audio?.sounds || []}
                thumbnail={audio?.thumbnail}
                transcript={audio?.transcript}
                workTitle={work.title}
              />
            )}

            {shouldShowItemLink && (
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
                                trackGaEvent({
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

                <div className="flex flex-h-center">
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
                {(collectionManifestsCount > 0 || canvasCount > 0) && (
                  <Space
                    v={{
                      size: 'm',
                      properties: ['margin-top'],
                    }}
                  >
                    <p className={`no-margin ${font('lr', 6)}`}>
                      Contains:{' '}
                      {collectionManifestsCount > 0
                        ? `${collectionManifestsCount} ${
                            collectionManifestsCount === 1
                              ? 'volume'
                              : 'volumes'
                          }`
                        : canvasCount > 0
                        ? `${canvasCount} ${
                            canvasCount === 1 ? 'image' : 'images'
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
                    text={digitalLocation?.accessConditions[0]?.terms}
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
                    {digitalLocationInfo.license.humanReadableText && (
                      <WorkDetailsText
                        contents={digitalLocationInfo.license.humanReadableText}
                      />
                    )}
                    <WorkDetailsText
                      contents={
                        <>
                          Credit: {work.title.replace(/\.$/g, '')}.
                          {credit && (
                            <>
                              {' '}
                              <a
                                href={`https://wellcomecollection.org/works/${work.id}`}
                              >
                                {credit}
                              </a>
                              .
                            </>
                          )}{' '}
                          {digitalLocationInfo.license.url ? (
                            <a href={digitalLocationInfo.license.url}>
                              {digitalLocationInfo.license.label}
                            </a>
                          ) : (
                            digitalLocationInfo.license.label
                          )}
                        </>
                      }
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
          <ButtonSolidLink
            colors={themeValues.buttonColors.greenTransparentGreen}
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
        {/*
          Note: although alternative titles sometimes contain angle brackets, it's
          normally used to denote a period of time, not HTML tags.

          e.g. Florida Historical Society quarterly, Apr. 1908-<July 1909>
        */}
        {work.alternativeTitles.length > 0 && (
          <WorkDetailsText
            title="Also known as"
            text={work.alternativeTitles}
          />
        )}

        {work.description && (
          <WorkDetailsText
            title="Description"
            html={work.description}
            allowDangerousRawHtml={true}
          />
        )}

        {/*
          Note: although production event labels sometimes contain angle brackets, it's
          normally used to denote a period of time, not HTML tags.

          e.g. London : County Council, 1900-<1983>
        */}
        {work.production.length > 0 && (
          <WorkDetailsText
            title="Publication/Creation"
            text={work.production.map(productionEvent => productionEvent.label)}
          />
        )}
        {work.currentFrequency && (
          <WorkDetailsText
            title="Current frequency"
            text={work.currentFrequency}
          />
        )}
        {work.formerFrequency.length > 0 && (
          <WorkDetailsText
            title="Former frequency"
            text={work.formerFrequency}
          />
        )}
        {work.designation.length > 0 && (
          <WorkDetailsText title="Designation" text={work.designation} />
        )}
        {work.physicalDescription && (
          <WorkDetailsText
            title="Physical description"
            html={work.physicalDescription}
            allowDangerousRawHtml={true}
          />
        )}
        {seriesPartOfs.length > 0 && (
          // Only show partOfs with no id here.
          // A partOf object with an id will be represented in
          // the archive hierarchy.
          // partOfs with no id are Series Links.
          <WorkDetailsTags
            title="Series"
            tags={seriesPartOfs.map(partOf => ({
              textParts: [partOf.title],
              linkAttributes: worksLink(
                {
                  'partOf.title': partOf.title,
                },
                'work_details/partOf'
              ),
            }))}
          />
        )}
        {work.contributors.length > 0 && (
          <WorkDetailsTags
            title="Contributors"
            tags={work.contributors.map(contributor => {
              const textParts = [
                contributor.agent.label,
                ...contributor.roles.map(role => role.label),
              ];
              /*
              If this is an identified contributor, link to the concepts prototype
              page instead.
              */
              return contributor.agent.id
                ? {
                    textParts,
                    linkAttributes: {
                      href: {
                        pathname: `/concepts/${contributor.agent.id}`,
                      },
                      as: {
                        pathname: `/concepts/${contributor.agent.id}`,
                      },
                    },
                  }
                : {
                    textParts,
                    linkAttributes: worksLink(
                      {
                        'contributors.agent.label': [contributor.agent.label],
                      },
                      'work_details/contributors'
                    ),
                  };
            })}
            separator=""
          />
        )}

        {orderedNotes.map(note => (
          <WorkDetailsText
            key={note.noteType.label}
            title={note.noteType.label}
            html={note.contents}
            allowDangerousRawHtml={true}
          />
        ))}

        {/*
          Note: although angle brackets are sometimes used in the lettering field,
          it's usually to denote missing or unclear text, not HTML.

          e.g. Patient <...>, sup<erior> mesenteric a<rtery>
          */}
        {work.lettering && (
          <WorkDetailsText title="Lettering" text={work.lettering} />
        )}

        {work.edition && (
          <WorkDetailsText title="Edition" text={work.edition} />
        )}

        {duration && <WorkDetailsText title="Duration" text={duration} />}

        {remainingNotes.map(note => (
          <WorkDetailsText
            key={note.noteType.label}
            title={note.noteType.label}
            html={note.contents}
            allowDangerousRawHtml={true}
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
              /*
              If this is an identified subject, link to the concepts prototype
              page instead.
              */
              return s.id
                ? {
                    textParts: [s.concepts[0].label].concat(
                      s.concepts.slice(1).map(c => c.label)
                    ),
                    linkAttributes: {
                      href: {
                        pathname: '/concept',
                        query: { id: s.id },
                      },
                      as: {
                        pathname: `/concepts/${s.id}`,
                      },
                    },
                  }
                : {
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
        <div className={font('intr', 5)}>
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
