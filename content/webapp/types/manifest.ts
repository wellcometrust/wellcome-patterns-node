import {
  Service,
  AuthExternalService,
  Range,
  AuthClickThroughService,
  AuthAccessTokenService,
  Canvas,
  InternationalString,
  SpecificationBehaviors,
  ContentResource,
  ResourceType,
} from '@iiif/presentation-3';
import { Audio, Video } from '@weco/content/services/iiif/types/manifest/v3';

export type ThumbnailImage = { url: string; width: number };

export type Original = {
  originalFile: string | undefined;
  label: InternationalString | null | undefined;
  format?: string;
};

export type Display = {
  canvasLabel: string | undefined;
  itemLabel: InternationalString | null | undefined;
  downloadUri: string | undefined;
  format: string | undefined;
};

export type TransformedCanvas = {
  id: string;
  type: NonNullable<ResourceType>;
  width: number | undefined;
  height: number | undefined;
  imageServiceId: string | undefined;
  hasRestrictedImage: boolean;
  label: string | undefined;
  textServiceId: string | undefined;
  thumbnailImage: ThumbnailImage | undefined;
  original: Original | undefined;
  display: Display | undefined;
};

export type DownloadOption = {
  id: string;
  label: string;
  format: string;
  width?: 'full' | number;
};

export type AuthClickThroughServiceWithPossibleServiceArray = Omit<
  AuthClickThroughService,
  'service'
> & {
  label?: string;
  description?: string;
  service: AuthAccessTokenService | AuthAccessTokenService[];
};

export type BornDigitalStatus =
  | 'allBornDigital'
  | 'noBornDigital'
  | 'mixedBornDigital';

export type TransformedRange = Omit<Range, 'items'> & {
  items: (TransformedRange | TransformedCanvas)[];
};

export type TransformedManifest = {
  downloadEnabled?: boolean;
  firstCollectionManifestLocation?: string;
  bornDigitalStatus: BornDigitalStatus;
  title: string;
  id: string;
  audio: Audio | undefined;
  video?: Video;
  services: Service[];
  downloadOptions: DownloadOption[];
  pdf: DownloadOption | undefined;
  canvases: TransformedCanvas[];
  canvasCount: number;
  collectionManifestsCount: number;
  iiifCredit?: string;
  isAnyImageOpen: boolean;
  isTotallyRestricted: boolean;
  isCollectionManifest: boolean;
  parentManifestUrl: string | undefined;
  needsModal: boolean;
  restrictedService: AuthExternalService | undefined;
  searchService: Service | undefined;
  structures: TransformedRange[];
  manifests: Canvas[];
  clickThroughService:
    | AuthClickThroughServiceWithPossibleServiceArray
    | undefined;
  tokenService: AuthAccessTokenService | undefined;
};

export type CustomSpecificationBehaviors =
  | SpecificationBehaviors
  | 'placeholder';

export type CustomContentResource = ContentResource & {
  behavior: 'original' | undefined;
  label: InternationalString | null | undefined;
  format: string | undefined;
};
