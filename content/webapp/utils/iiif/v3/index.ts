import {
  Annotation,
  AnnotationBody,
  AuthAccessService2,
  AuthAccessService2_Active as AuthAccessService2Active,
  AuthAccessService2_External as AuthAccessService2External,
  AuthAccessTokenService,
  AuthAccessTokenService2,
  AuthExternalService,
  AuthProbeService2,
  Canvas,
  ChoiceBody,
  Collection,
  CollectionItems,
  ContentResource,
  ImageService,
  InternationalString,
  Manifest,
  MetadataItem,
  Range,
  RangeItems,
  Service,
  TechnicalProperties,
} from '@iiif/presentation-3';

import { isString } from '@weco/common/utils/type-guards';
import { IIIFItemProps } from '@weco/content/components/IIIFItem/IIIFItem';
import {
  Auth,
  AuthClickThroughServiceWithPossibleServiceArray,
  BornDigitalStatus,
  CustomContentResource,
  CustomSpecificationBehaviors,
  DownloadOption,
  TransformedCanvas,
} from '@weco/content/types/manifest';

import { getOriginal, getThumbnailImage } from './canvas';

// The label we want to use to distinguish between parts of a multi-volume work
// (e.g. 'Copy 1' or 'Volume 1') can currently exist in either the first or
// second position of an array, with the item title appearing in the other
// position. This is an interim check to give us the label we want, but ideally
// it would be consistent in the manifest. It will eventually be the second
// thing in the array, consistently, at which point this function will be
// redundant.
export function getMultiVolumeLabel(
  internationalString: InternationalString,
  itemTitle: string
): string | undefined {
  const stringAtIndex1 = getDisplayLabel(internationalString, {
    index: 1,
  });
  const stringAtIndex0 = getDisplayLabel(internationalString, {
    index: 0,
  });

  return stringAtIndex1 === itemTitle ? stringAtIndex0 : stringAtIndex1;
}

export function getDisplayLabel(
  internationalString: InternationalString,
  indexProps?: { index: number }
): string | undefined {
  const index = indexProps?.index || 0;
  const label =
    internationalString?.en?.[index] || internationalString?.none?.[index];

  return label !== '-' ? label : undefined;
}

export function transformLabel(
  label: InternationalString | string | undefined
): string | undefined {
  if (typeof label === 'string' || label === undefined) return label;

  return getDisplayLabel(label);
}

// It appears that iiif-manifests for born digital items can exist without the items property
// e.g. https://iiif.wellcomecollection.org/presentation/collections/archives/SA/SRH/B/41/2
// I'm not sure this should be the case, but am doing this temporarily so works/items pages won't error/break
export type BornDigitalManifest = Omit<Manifest, 'items'> & {
  items?: Canvas[];
};

function convertToDownloadOption(item): DownloadOption {
  return {
    id: item.id,
    label: transformLabel(item.label) || 'Download file',
    format: item.format || '',
  };
}

type Rendering = {
  id?: string;
  format?: string;
  label?: string | InternationalString;
};

export function getDownloadOptionsFromManifestRendering(
  manifestRendering: Manifest['rendering']
): DownloadOption[] {
  // The ContentResource type on the Manifest, which applies to the iiifManifest.rendering seems incorrect
  // Temporarily adding this until it is fixed.
  const rendering = (manifestRendering as Rendering[]) || [];
  return rendering
    .filter(({ id, format }) => {
      // Removing application/zip (for now?) as we haven't had these before
      // and the example I've seen is 404ing:
      // (Work) https://wellcomecollection.org/works/mg56yqa4 ->
      // (Catalogue response) https://api.wellcomecollection.org/catalogue/v2/works/mg56yqa4?include=items ->
      // (V3 Manifest) https://iiif.wellcomecollection.org/presentation/v3/b10326947
      // (rendering - application/zip) https://api.wellcomecollection.org/text/v1/b10326947.zip (returns 404)
      // For details of why we remove text/plain see https://github.com/wellcomecollection/wellcomecollection.org/issues/7592
      return id && format !== 'application/zip' && format !== 'text/plain';
    })
    .map(item => convertToDownloadOption(item));
}

export function getDownloadOptionsFromCanvasRenderingAndSupplementing(
  canvas: TransformedCanvas
): DownloadOption[] {
  return [...(canvas.original || []), ...(canvas.supplementing || [])].map(
    item => convertToDownloadOption(item)
  );
}

export function getTitle(
  label: InternationalString | string | undefined
): string {
  if (!label) return '';
  if (typeof label === 'string') return label;

  return getDisplayLabel(label) || '';
}

export function getTransformedCanvases(
  iiifManifest: Manifest | Collection
): TransformedCanvas[] {
  if (isCollection(iiifManifest)) return [];
  const canvases = iiifManifest.items?.filter(
    canvas => canvas.type === 'Canvas'
  );

  return canvases?.map(transformCanvas) || [];
}

export function getLabelString(
  label: InternationalString | null | undefined
): string | undefined {
  if (!label) {
    return label || undefined;
  } else {
    return Object.values(label).flat().join(' ');
  }
}

function getCanvasLabel(canvas: Canvas): string | undefined {
  const label = canvas.label;
  return getLabelString(label);
}

function getCanvasTextServiceId(canvas: Canvas): string | undefined {
  const textAnnotation = canvas?.annotations?.find(annotation => {
    const annotationLabel = getLabelString(annotation.label);
    return (
      annotation.type === 'AnnotationPage' &&
      annotationLabel?.startsWith('Text of page')
    );
  });
  return textAnnotation?.id;
}

export const isChoiceBody = (item: IIIFItemProps): item is ChoiceBody => {
  return typeof item !== 'string' && 'type' in item && item.type === 'Choice';
};

// Temporary types, as the provided AnnotationBody doesn't seem to be correct
type AnnotationPageBody = {
  service: BodyService;
};

export function getImageServiceFromItem(
  item: IIIFItemProps
): ImageService | undefined {
  if ('service' in item) {
    return item.service?.find(
      s => s['@type'] === 'ImageService2'
    ) as ImageService;
  }
}

function getImageServiceFromCanvas(canvas: Canvas): BodyService | undefined {
  const items = canvas?.items;
  const AnnotationPages = items?.[0].items;
  const AnnotationBodies = AnnotationPages?.map(
    annotationPage =>
      annotationPage.body as
        | AnnotationPageBody
        | AnnotationPageBody[]
        | undefined
  ).flat();
  const BodiesServices = AnnotationBodies?.map(body => body?.service).flat();
  const imageService = BodiesServices?.find(
    service => service?.['@type'] === 'ImageService2'
  );
  return imageService;
}

function getImageServiceId(
  imageService: BodyService | undefined
): string | undefined {
  return imageService?.['@id'];
}

// Temporary type until iiif3 types are correct
type BodyService = {
  '@type': string;
  service: Service | Service[];
};
type BodyService2 = {
  type: string;
  service: Service | Service[];
};

function getImageAuthCookieService(
  imageService: BodyService | undefined
): Service | undefined {
  return Array.isArray(imageService?.service)
    ? imageService?.service?.find(s => s['@type'] === 'AuthCookieService1')
    : imageService?.service?.['@type'] === 'AuthCookieService1'
      ? imageService?.service
      : undefined;
}

export function getImageAuthProbeService(
  service: BodyService2 | undefined
): AuthProbeService2 | undefined {
  return Array.isArray(service)
    ? service?.find(s => s.type === 'AuthProbeService2')
    : service?.type === 'AuthProbeService2'
      ? service
      : undefined;
}

// We don't know at the top-level of a manifest whether any of the canvases contain images that are open access.
// The top-level only holds information about whether the item contains _any_ images with an authService.
// N.B. this will be changed in the future: https://github.com/wellcomecollection/platform/issues/5630
// Individual images hold information about their own authService (if it has one).
// So we check if any canvas _doesn't_ have an authService, and treat the whole item as open access if that's the case.
// This allows us to determine whether or not to show the viewer at all.
// N.B. the individual items within the viewer won't display if they are restricted.
export function checkIsAnyImageOpen(
  transformedCanvases: TransformedCanvas[]
): boolean {
  return transformedCanvases.some(canvas => !canvas.hasRestrictedImage);
}

export function getIIIFMetadata(
  manifest: Manifest | Collection,
  label: string
): MetadataItem | undefined {
  return (manifest.metadata || []).find(
    data => getDisplayLabel(data.label) === label
  );
}

export function getIIIFPresentationCredit(
  manifest: Manifest | Collection
): string | undefined {
  const attribution = getIIIFMetadata(manifest, 'Attribution and usage');
  const maybeValueWithBrTags =
    attribution?.value && getDisplayLabel(attribution.value);

  return maybeValueWithBrTags?.split('<br />')[0];
}

export function getSearchService(
  manifest: Manifest | Collection
): Service | undefined {
  return manifest.service?.find(
    service => service?.['@type'] === 'SearchService1'
  );
}

export function getFirstCollectionManifestLocation(
  iiifManifest: Manifest | Collection
): string | undefined {
  if (isCollection(iiifManifest)) {
    return iiifManifest.items?.find(c => c.type === 'Manifest')?.id;
  }
}

export function getClickThroughService(
  manifest: Manifest | Collection
): AuthClickThroughServiceWithPossibleServiceArray | undefined {
  return manifest.services?.find(
    s => s.profile === 'http://iiif.io/api/auth/1/clickthrough'
  ) as AuthClickThroughServiceWithPossibleServiceArray | undefined;
}

const restrictedAuthServiceUrls = [
  'https://iiif.wellcomecollection.org/auth/restrictedlogin',
  'https://iiif-test.wellcomecollection.org/auth/restrictedlogin',
];

// The image services can contain auth v1 and auth v2 services, or just auth v1 services
// We want to move to using v2, but can't guarantee all manifests will include them (they need to be recently generated to have the v2 services).
// Therefore we check for both. When all manifests have V2 we can remove the V1 code.
function isImageRestricted(canvas: Canvas): boolean {
  const imageService = getImageServiceFromCanvas(canvas);
  const imageAuthCookieService = getImageAuthCookieService(imageService); // V1 service
  const v2Services = imageService?.service as BodyService2;
  const imageAuthProbeService = getImageAuthProbeService(v2Services || []); // V2 service
  return (
    imageAuthProbeService?.service.some(
      s =>
        s?.id ===
          'https://iiif.wellcomecollection.org/auth/v2/access/restrictedlogin' ||
        false
    ) ||
    restrictedAuthServiceUrls.some(
      url => imageAuthCookieService?.['@id'] === url
    ) ||
    false
  );
}

export function getRestrictedLoginService(
  manifest: Manifest | Collection
): AuthExternalService | undefined {
  return manifest.services?.find(service => {
    const typedService = service as AuthExternalService;
    return restrictedAuthServiceUrls.some(url => typedService['@id'] === url);
  }) as AuthExternalService;
}

export function getTokenService(
  clickThroughService:
    | AuthClickThroughServiceWithPossibleServiceArray
    | AuthExternalService
    | undefined
): AuthAccessTokenService | undefined {
  if (!clickThroughService?.service) return;
  return Array.isArray(clickThroughService?.service)
    ? clickThroughService?.service.find(
        s => s?.profile === 'http://iiif.io/api/auth/1/token'
      )
    : clickThroughService?.service;
}

type AuthServices = {
  active?: TransformedAuthService;
  external?: TransformedAuthService;
};

export function getAuthServices({
  auth,
  authV2,
}: {
  auth?: Auth;
  authV2?: boolean;
}): AuthServices | undefined {
  if (authV2) {
    return {
      active: auth?.v2.activeAccessService,
      external: auth?.v2.externalAccessService,
    };
  } else {
    return {
      active: auth?.v1.activeAccessService,
      // Only the v2 external service works (v1 responds with a 404), we therefore try returning the v2 service, so we can use it if it is available. We still need to fallback to the v1 service as the presence of the service helps us determine whether to show the viewer or not.
      external:
        auth?.v2.externalAccessService || auth?.v1.externalAccessService,
    };
  }
}

export function getIframeTokenSrc({
  userIsStaffWithRestricted,
  workId,
  origin,
  auth,
  authV2,
}: {
  userIsStaffWithRestricted: boolean;
  workId: string;
  origin?: string;
  auth: Auth | undefined;
  authV2: boolean | undefined;
}): string | undefined {
  // We want the token source to be from the same auth version as the authService
  // We use v2 if we have a v2 external service and the user has a role of 'StaffWithRestricted'
  // OR if the authV2 toggle is true
  const authServices = getAuthServices({ auth, authV2 });
  const useV2TokenService =
    (authServices?.external?.id ===
      'https://iiif.wellcomecollection.org/auth/v2/access/restrictedlogin' &&
      userIsStaffWithRestricted) ||
    authV2;
  if (useV2TokenService && auth?.v2.tokenService) {
    return `${auth.v2.tokenService.id}?messageId=${workId}&origin=${origin}`;
  } else if (auth?.v1.tokenService) {
    return `${auth.v1.tokenService.id}?messageId=${workId}&origin=${origin}`;
  }
}

type checkModalParams = {
  userIsStaffWithRestricted: boolean;
  auth?: Auth;
  isAnyImageOpen?: boolean;
  authV2?: boolean;
};

export function checkModalRequired(params: checkModalParams): boolean {
  const { userIsStaffWithRestricted, auth, isAnyImageOpen, authV2 } = params;
  const authServices = getAuthServices({ auth, authV2 });
  if (authServices?.active) {
    return true;
  } else if (authServices?.external) {
    if (isAnyImageOpen || userIsStaffWithRestricted) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function checkIsTotallyRestricted(
  restrictedAuthService: AuthExternalService | undefined,
  isAnyImageOpen: boolean
): boolean {
  return Boolean(restrictedAuthService && !isAnyImageOpen);
}

export function checkIsTotallyRestrictedV2(
  externalAuthService: AuthAccessService2External | undefined,
  isAnyImageOpen: boolean
): boolean {
  return Boolean(externalAuthService && !isAnyImageOpen);
}

export function getAnnotationsOfMotivation(
  items: Canvas['items'],
  motivation: TechnicalProperties['motivation']
): Annotation[] {
  return ((
    items?.map(annotationPage => {
      return annotationPage.items?.filter(
        item => item.motivation === motivation
      );
    }) || []
  ).flat() || []) as Annotation[];
}

// Annotation["body"] can be a AnnotationBody | AnnotationBody[] | undefined
// we make sure that it is always an array so we can treat it the same way
function convertAnnotationBodyToArray(
  annotationBody: Annotation['body']
): AnnotationBody[] {
  if (!annotationBody) return [];
  if (Array.isArray(annotationBody)) {
    return annotationBody;
  } else {
    return [annotationBody];
  }
}

export function getDisplayData(
  annotation: Annotation
): (ChoiceBody | ContentResource)[] {
  const annotationBodyArray = convertAnnotationBodyToArray(annotation?.body);
  return annotationBodyArray
    ?.map(body => {
      if (typeof body === 'object' && 'type' in body) {
        return body;
      } else {
        return undefined;
      }
    })
    .filter(Boolean) as (ChoiceBody | ContentResource)[];
}
export function transformCanvas(canvas: Canvas): TransformedCanvas {
  const imageService = getImageServiceFromCanvas(canvas);
  const imageServiceId = getImageServiceId(imageService);
  const hasRestrictedImage = isImageRestricted(canvas);
  const label = getCanvasLabel(canvas);
  const textServiceId = getCanvasTextServiceId(canvas);
  const thumbnailImage = getThumbnailImage(canvas);
  const { id, type, width, height } = canvas; // TODO if/when we use IIIFItem to render images, we should get width/height from each painting

  // Resources associated with a Canvas by an Annotation that has the motivation value painting
  // must be presented to the user as the representation of the Canvas.
  // This is what we use for displayData.
  const paintings = getAnnotationsOfMotivation(canvas.items || [], 'painting');
  const painting = paintings.map(getDisplayData).flat();
  // A rendering item with a behavior value that includes 'original'
  // will be present when something is considered Born Digital, this is what we'll need
  // in order to offer a download of the original file.
  const original = getOriginal(canvas.rendering || []);
  // Resources associated with a Canvas by an Annotation that has the motivation value supplementing
  // may be presented to the user as part of the representation of the Canvas, or
  // may be presented in a different part of the user interface.
  // We need to do this for two reasons:
  // 1) to find the pdfs that were added to manifests before DLCS changes, which took place in May 2023.
  // (N.B. after this time the pdfs follow the Born Digital pattern)
  // 2) they can provide alternative content such as transcriptions for Videos
  const supplementings = getAnnotationsOfMotivation(
    canvas.annotations || [],
    'supplementing'
  );
  const supplementing = supplementings.map(getDisplayData).flat();

  return {
    id,
    type,
    width,
    height,
    imageServiceId,
    hasRestrictedImage,
    label,
    textServiceId,
    thumbnailImage,
    painting,
    original,
    supplementing,
    metadata: canvas.metadata || [],
  };
}

// When lots of the works were digitised, ranges with multiple items, such as a table of contents,
// were created individually rather than as a single range with multiple items.
// This means we would display repetitive links to the essentially the same thing.
// This function groups ranges that have the same label and consecutive pages into a single structure,
// So we can display one link to the first item in the range.
export function groupRanges(
  items: TransformedCanvas[],
  ranges: Range[]
): Range[] {
  return ranges.reduce(
    (acc, range) => {
      if (!range.items) return acc;

      const [lastCanvasInRange] = range.items.slice(-1);
      const [firstCanvasInRange] = range.items;
      const firstCanvasIndex = items.findIndex(
        canvas =>
          !isString(firstCanvasInRange) && canvas.id === firstCanvasInRange.id
      );

      if (
        getDisplayLabel(acc.previousLabel) === getDisplayLabel(range.label) &&
        acc.previousLastCanvasIndex &&
        firstCanvasIndex === acc.previousLastCanvasIndex + 1
      ) {
        acc.groupedArray[acc.groupedArray.length - 1].items!.push(
          lastCanvasInRange
        );
      } else if (range.items.length > 0) {
        acc.groupedArray.push(range);
      }
      acc.previousLabel = range.label;
      acc.previousLastCanvasIndex = items.findIndex(
        canvas =>
          !isString(lastCanvasInRange) && canvas.id === lastCanvasInRange.id
      );
      return acc;
    },
    {
      previousLastCanvasIndex: null,
      previousLabel: { none: [''] },
      groupedArray: [],
    } as {
      previousLastCanvasIndex: number | null;
      previousLabel: InternationalString;
      groupedArray: Range[];
    }
  ).groupedArray;
}

export const isCanvas = (
  rangeItem: TransformedCanvas | RangeItems
): rangeItem is TransformedCanvas | Canvas => {
  return typeof rangeItem === 'object' && rangeItem.type === 'Canvas';
};

export const isRange = (
  rangeItem: TransformedCanvas | RangeItems
): rangeItem is Range => {
  return typeof rangeItem === 'object' && rangeItem.type === 'Range';
};

export const isTransformedCanvas = (
  canvas: TransformedCanvas | Canvas
): canvas is TransformedCanvas => {
  return Boolean(canvas && 'painting' in canvas);
};

export function hasItemType(
  canvases: TransformedCanvas[] | undefined,
  type: string
): boolean {
  return (
    canvases?.some(canvas => {
      return canvas.painting.some(item => {
        if (isChoiceBody(item)) {
          return item.items.some(item => {
            if (typeof item !== 'string') {
              return item.type === type;
            } else {
              return false;
            }
          });
        } else {
          return item.type === type;
        }
      });
    }) || false
  );
}

export function hasOriginalPdf(
  canvases: TransformedCanvas[] | undefined
): boolean {
  return (
    canvases?.some(canvas => {
      return canvas.original.some(item => {
        return 'format' in item && item.format === 'application/pdf';
      });
    }) || false
  );
}

export function isCollection(
  manifest: Manifest | Collection
): manifest is Collection {
  return manifest.type === 'Collection';
}

// We sometimes want to offer the original file for download.
// There are 3 potential sources for this.
// 1) the rendering property of the item with a behavior value that includes 'original'.
// This will exist if the canvas is for a 'Born Digital'
// see: https://github.com/wellcomecollection/docs/blob/main/rfcs/046-born-digital-iiif/README.md
// 2) the Annotations with a motivation of 'painting'.
// which is the thing we would normally display to the user.
// 3) the Annotations with a motivation of 'supplementing'.
// We do this to find pdfs that were added to manifests before DLCS changes, which took place in May 2023.
// (N.B. after this time the pdfs follow the Born Digital pattern)
export function getOriginalFiles(
  canvas: TransformedCanvas
): (ContentResource | CustomContentResource | ChoiceBody)[] {
  const downloadData =
    canvas.original.length > 0
      ? canvas.original
      : canvas.painting.length > 0
        ? canvas.painting
        : canvas.supplementing;
  return downloadData || [];
}

// If we have a file size, it is found in the metadata array of the canvas
export function getFileSize(canvas: TransformedCanvas): string | undefined {
  const fileSizeMeta = canvas.metadata.find(
    metadata => getLabelString(metadata.label) === 'File size'
  );
  return fileSizeMeta ? getLabelString(fileSizeMeta.value) : undefined;
}

type CollectionItemsWithItems = CollectionItems & {
  items: CollectionItemsWithItems[];
};
export function getCollectionManifests(
  manifest:
    | Manifest
    | Collection
    | (CollectionItems & { items: CollectionItemsWithItems[] })
): CollectionItems[] {
  if (manifest.type === 'Collection') {
    return manifest.items
      .map(item => {
        if (item.type === 'Manifest') {
          return item;
        } else {
          return getCollectionManifests(item);
        }
      })
      .flat(Infinity) as CollectionItems[];
  } else {
    return [];
  }
}

// Whether something is born digital or not is determined at the canvas level within a iiifManifest
// It is therefore possible to have a iiifManifest that contains:
// - only born digital items
// - no born digital items
// - a mix of the two.
// We need to know which we have to determine the required UI.
export function getBornDigitalStatus(
  manifest: Manifest | Collection
): BornDigitalStatus {
  const hasBornDigital = manifest?.items.some(canvas => {
    const behavior = canvas?.behavior as
      | CustomSpecificationBehaviors[]
      | undefined;
    return behavior?.includes('placeholder') || false;
  });

  const hasNonBornDigital = manifest?.items.some(canvas => {
    const behavior = canvas?.behavior as
      | CustomSpecificationBehaviors[]
      | undefined;
    return !behavior?.includes('placeholder') || false;
  });

  if (hasBornDigital && !hasNonBornDigital) {
    return 'allBornDigital';
  } else if (hasBornDigital && hasNonBornDigital) {
    return 'mixedBornDigital';
  } else {
    return 'noBornDigital';
  }
}

export function getFormatString(format: string): string | undefined {
  switch (format) {
    case 'application/pdf':
      return 'PDF';
    case 'text/plain':
      return 'PLAIN';
    case 'image/jpeg':
      return 'JPG';
    case 'video/mp4':
      return 'MP4';
    case 'audio/mp3':
      return 'MP3';
    default:
      return 'unknown format';
  }
}

export function getStructures(manifest: Manifest | Collection): Range[] {
  if (isCollection(manifest)) {
    return [];
  } else {
    return manifest.structures || [];
  }
}

export function isAllOriginalPdfs(canvases: TransformedCanvas[]): boolean {
  return canvases?.every(canvas =>
    canvas.original.find(original => original.format === 'application/pdf')
  );
}

// https://iiif.io/api/auth/2.0/#access-service-description
export function getAuthAccessServices(manifest): AuthAccessService2[] {
  const services = manifest.services || [];
  return services.filter(s => s.type === 'AuthAccessService2');
}

// https://iiif.io/api/auth/2.0/#external-interaction-pattern
export function getExternalAuthAccessService(
  services: AuthAccessService2[]
): AuthAccessService2External | undefined {
  return services.find(s => s.profile === 'external') as
    | AuthAccessService2External
    | undefined;
}

// Docs (https://iiif.io/api/auth/2.0/#profile) say the profile value should be active, but before the Auth 2 spec was finalised the value was interactive and we have still have manifests with this value. N.B. the values will update if the manifest is regenerated.
export type AuthAccessService2WithInteractiveProfile = Omit<
  AuthAccessService2Active,
  'profile'
> & {
  profile: AuthAccessService2['profile'] | 'interactive';
};

// https://iiif.io/api/auth/2.0/#active-interaction-pattern
export function getActiveAuthAccessService(
  services: AuthAccessService2WithInteractiveProfile[]
): AuthAccessService2WithInteractiveProfile | undefined {
  return services.find(
    s => s.profile === 'active' || s.profile === 'interactive'
  ) as AuthAccessService2WithInteractiveProfile | undefined;
}

// https://iiif.io/api/auth/2.0/#access-token-service-description
// not sure if the service can be an object or an array,
// but we do this check for v1 token services, so putting it in to be safe
export function getV2TokenService(
  accessService: AuthAccessService2 | undefined
): AuthAccessTokenService2 | undefined {
  const authServiceArray = Array.isArray(accessService?.service)
    ? accessService?.service
    : [accessService?.service];
  return authServiceArray.find(s => s?.type === 'AuthAccessTokenService2') as
    | AuthAccessTokenService2
    | undefined;
}

export type TransformedAuthService = {
  id: string;
  label?: string;
  description?: string;
};
export function transformRestrictedService(
  service: AuthExternalService | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service['@id'],
    label: service.label,
    description: service.description,
  };
}

export function transformClickThroughService(
  service: AuthClickThroughServiceWithPossibleServiceArray | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service['@id'],
    label: service.label,
    description: service.description,
  };
}

export function transformTokenService(
  service: AuthAccessTokenService | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service['@id'],
  };
}

export function transformExternalAccessService(
  service:
    | (AuthAccessService2External & { note?: InternationalString }) // We can have a note on this type in the manifest
    | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service.id,
    label: getLabelString(service.label),
    description: getLabelString(service.note),
  };
}

export function transformActiveAccessService(
  service: AuthAccessService2WithInteractiveProfile | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service.id,
    label: getLabelString(service.label),
    description: getLabelString(service.note),
  };
}

export function transformV2TokenService(
  service: AuthAccessTokenService2 | undefined
): TransformedAuthService | undefined {
  if (!service) return;
  return {
    id: service.id,
  };
}
