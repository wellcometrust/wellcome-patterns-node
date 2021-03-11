import { createContext } from 'react';
type Props = {
  work: any;
  manifest: any;
  manifestIndex: any;
  activeIndex: any;
  setActiveIndex: any;
  canvases: any;
  canvasIndex: any;
  gridVisible: any;
  setGridVisible: any;
  currentManifestLabel: any;
  licenseInfo: any;
  iiifImageLocationCredit: any;
  downloadOptions: any;
  iiifPresentationDownloadOptions: any;
  parentManifest: any;
  lang: any;
  pageHeight: any;
  pageWidth: any;
  setShowZoomed: any;
  showZoomed: any;
  setZoomInfoUrl: any;
  setIsFullscreen: any;
  zoomInfoUrl: any;
  setRotatedImages: any;
  showControls: any;
  isLoading: any;
  setIsLoading: any;
  setImageJson: any;
  setParentManifest: any;
  rotatedImages: any;
  setShowControls: any;
  errorHandler: any;
  setCurrentManifestLabel: any;
};
const ItemViewerContext = createContext<Props | null>(null);
export default ItemViewerContext;
