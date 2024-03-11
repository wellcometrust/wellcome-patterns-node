import { TransformedManifest } from '@weco/content/types/manifest';
import { Manifest, Collection } from '@iiif/presentation-3';
import {
  getFirstCollectionManifestLocation,
  getTitle,
  getTransformedCanvases,
  checkIsAnyImageOpen,
  getRestrictedLoginService,
  getIIIFPresentationCredit,
  getSearchService,
  getClickThroughService,
  getTokenService,
  getCollectionManifests,
  checkModalRequired,
  checkIsTotallyRestricted,
  getBornDigitalStatus,
  groupRanges,
  getAnnotationsOfMotivation,
  getDisplayData,
  isCollection,
  getStructures,
} from '@weco/content/utils/iiif/v3';

export function transformManifest(
  manifestV3: Manifest | Collection
): TransformedManifest {
  const title = getTitle(manifestV3.label);
  const services = manifestV3.services || [];
  const iiifCredit = getIIIFPresentationCredit(manifestV3);
  const id = manifestV3.id || '';
  const parentManifestUrl = manifestV3.partOf?.[0].id;
  const manifests = getCollectionManifests(manifestV3);
  const collectionManifestsCount = manifests.length;
  const transformedCanvases = getTransformedCanvases(manifestV3);
  const canvasCount = transformedCanvases.length;
  const isAnyImageOpen = checkIsAnyImageOpen(transformedCanvases);
  const restrictedService = getRestrictedLoginService(manifestV3);
  const clickThroughService = getClickThroughService(manifestV3);
  const tokenService = getTokenService(
    clickThroughService || restrictedService
  );
  const firstCollectionManifestLocation =
    getFirstCollectionManifestLocation(manifestV3);
  const isTotallyRestricted = checkIsTotallyRestricted(
    restrictedService,
    isAnyImageOpen
  );
  const needsModal = checkModalRequired({
    clickThroughService,
    restrictedService,
    isAnyImageOpen,
  });
  const searchService = getSearchService(manifestV3);
  const structures = getStructures(manifestV3);
  const groupedStructures = groupRanges(
    transformedCanvases || [],
    structures || []
  );

  const bornDigitalStatus = getBornDigitalStatus(manifestV3);
  // Manifests can have a placeholderCanvas: https://iiif.io/api/presentation/3.0/#placeholdercanvas
  // "...that provides additional content for use before the main content of the resource.."
  // We use this to provide a poster image for video content.
  // In future, we may want to use it to display an image for audio content too,
  // but we don't so this at present because many of them are a generic speaker gif,
  // e.g. https://iiif.wellcomecollection.org/posters/audioplaceholder.png, which we don't want to display.
  // The underlying placeholderCanvas data would have to change to remove these.
  const placeholderCanvasPaintings = getAnnotationsOfMotivation(
    manifestV3.placeholderCanvas?.items || [],
    'painting'
  );

  // We use this to provide a poster image for video content.
  // We are only interested in the first one.
  // In reality there is probably only ever one available.
  // We don't use them for audio content because they either don't exist or are probably a generic speaker gif.
  // For interest, the only audio with a real image is /works/tp9njewm
  const firstPlaceholderId = placeholderCanvasPaintings
    .map(getDisplayData)
    .flat()[0]?.id;

  // Manifests can have a rendering property: https://iiif.io/api/presentation/3.0/#rendering
  // "...an alternative, non - IIIF representation of the resource"
  // We use this to provide a transcript for audio files for example.
  const rendering = manifestV3.rendering || [];

  return {
    bornDigitalStatus,
    id,
    firstCollectionManifestLocation,
    services,
    iiifCredit,
    parentManifestUrl,
    title,
    manifests,
    collectionManifestsCount,
    isAnyImageOpen,
    canvases: transformedCanvases,
    canvasCount,
    structures: groupedStructures,
    isCollectionManifest: isCollection(manifestV3),
    searchService,
    clickThroughService,
    tokenService,
    restrictedService,
    isTotallyRestricted,
    needsModal,
    placeholderId: firstPlaceholderId,
    rendering,
  };
}
