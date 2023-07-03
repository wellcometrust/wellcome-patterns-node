import { createContext, RefObject } from 'react';
import { WorkBasic } from '@weco/catalogue/services/wellcome/catalogue/types';
import { SearchResults } from '@weco/catalogue/services/iiif/types/search/v3';
import { Manifest } from '@iiif/presentation-3';
import { TransformedManifest } from '../../types/manifest';

export type RotatedImage = { canvas: number; rotation: number };

export type Query = {
  canvas: number;
  manifest: number;
  query: string;
  page: number;
  shouldScrollToCanvas: boolean;
};

type Props = {
  // DATA props:
  query: Query;
  work: WorkBasic;
  transformedManifest: TransformedManifest | undefined;
  parentManifest: Manifest | undefined;
  searchResults: SearchResults | null;
  setSearchResults: ((v) => void);

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
  canvas: 1,
  manifest: 1,
  query: '',
  page: 1,
  shouldScrollToCanvas: true,
};

const work: WorkBasic = {
  id: '',
  title: '',
  productionDates: [],
  cardLabels: [],
};

const ItemViewerContext = createContext<Props>({
  // DATA props:
  query,
  work,
  transformedManifest: undefined,
  parentManifest: undefined,
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
});
export default ItemViewerContext;
