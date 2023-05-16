import { createContext, RefObject } from 'react';
import { Work } from '@weco/catalogue/services/wellcome/catalogue/types';
import { SearchResults } from '@weco/catalogue/services/iiif/types/search/v3';
import { Manifest } from '@iiif/presentation-3';
import {
  TransformedManifest,
  createDefaultTransformedManifest,
} from '../../types/manifest';
import { UrlTemplate } from 'url-template';

export type RotatedImage = { canvasParam: number; rotation: number };

type Props = {
  // DATA props:
  query: {
    pageParam: number;
    canvasParam: number;
    manifestParam: number;
    shouldScrollToCanvas: boolean;
  };
  work: Work;
  transformedManifest: TransformedManifest;
  searchResults: SearchResults;
  setSearchResults: (v) => void;

  // UI props:
  viewerRef: RefObject<HTMLDivElement> | undefined;
  mainAreaRef: RefObject<HTMLDivElement> | undefined;
  mainAreaWidth: number;
  mainAreaHeight: number;
  gridVisible: boolean;
  setGridVisible: (v: boolean) => void;
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  isDesktopSidebarActive: boolean;
  setIsDesktopSidebarActive: (v: boolean) => void;
  isMobileSidebarActive: boolean;
  setIsMobileSidebarActive: (v: boolean) => void;
  showZoomed: boolean;
  setShowZoomed: (v: boolean) => void;
  showControls: boolean;
  setShowControls: (v: boolean) => void;
  rotatedImages: RotatedImage[];
  setRotatedImages: (v: RotatedImage[]) => void;
  isResizing: boolean;
  errorHandler?: () => void;

  urlTemplate?: UrlTemplate;
  parentManifest: Manifest | undefined;
  setParentManifest: (v: Manifest) => void;
};

export const results = {
  '@context': '',
  '@id': '',
  '@type': 'sc:AnnotationList',
  within: {
    '@type': '',
    total: null,
  },
  startIndex: 0,
  resources: [],
  hits: [],
};

const query = {
  canvasParam: 1,
  pageParam: 1,
  manifestParam: 1,
  shouldScrollToCanvas: true,
};

const work = {
  type: 'Work',
  id: '',
  title: '',
  alternativeTitles: [],
  physicalDescription: '',
  workType: {
    id: '',
    label: '',
    type: 'Format',
  },
  contributors: [],
  identifiers: [],
  subjects: [],
  genres: [],
  production: [],
  languages: [],
  notes: [],
  formerFrequency: [],
  designation: [],
  parts: [],
  partOf: [],
  precededBy: [],
  succeededBy: [],
  availabilities: [],
  availableOnline: false,
  holdings: [],
} as Work;

const ItemViewerContext = createContext<Props>({
  // DATA props:
  query,
  work,
  transformedManifest: createDefaultTransformedManifest(),
  searchResults: results,
  setSearchResults: () => undefined,

  // UI props:
  viewerRef: undefined,
  mainAreaRef: undefined,
  mainAreaWidth: 1000,
  mainAreaHeight: 500,
  gridVisible: false,
  setGridVisible: () => false,
  isFullscreen: false,
  setIsFullscreen: () => undefined,
  isDesktopSidebarActive: true,
  setIsDesktopSidebarActive: () => undefined,
  isMobileSidebarActive: false,
  setIsMobileSidebarActive: () => undefined,
  showZoomed: false,
  setShowZoomed: () => undefined,
  showControls: false,
  setShowControls: () => undefined,
  rotatedImages: [],
  setRotatedImages: () => undefined,
  isResizing: false,
  errorHandler: () => undefined,

  // TODO move to correct section / remove?
  parentManifest: undefined,
  setParentManifest: () => undefined,
  urlTemplate: undefined,
});
export default ItemViewerContext;
