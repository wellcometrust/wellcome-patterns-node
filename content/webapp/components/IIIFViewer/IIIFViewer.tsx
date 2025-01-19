import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { DigitalLocation } from '@weco/common/model/catalogue';
import { useToggles } from '@weco/common/server-data/Context';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import LL from '@weco/common/views/components/styled/LL';
import { NoScriptImage } from '@weco/content/components/IIIFViewer/NoScriptImage';
import { fromQuery } from '@weco/content/components/ItemLink';
import ItemViewerContext, {
  ParentManifest,
  RotatedImage,
} from '@weco/content/components/ItemViewerContext/ItemViewerContext';
import { SearchResults } from '@weco/content/services/iiif/types/search/v3';
import {
  Work,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import { TransformedManifest } from '@weco/content/types/manifest';

import { DelayVisibility, queryParamToArrayIndex } from '.';
import GridViewer from './GridViewer';
import ImageViewer from './ImageViewer';
import ImageViewerControls from './ImageViewerControls';
import MainViewer from './MainViewer';
import ViewerBottomBar from './ViewerBottomBar';
import ViewerSidebar from './ViewerSidebar';
import ViewerTopBar from './ViewerTopBar';

type IIIFViewerProps = {
  work: WorkBasic & Pick<Work, 'description'>;
  iiifImageLocation?: DigitalLocation;
  iiifPresentationLocation?: DigitalLocation;
  transformedManifest?: TransformedManifest;
  canvasOcr?: string;
  handleImageError?: () => void;
  searchResults: SearchResults | null;
  setSearchResults: (v) => void;
  parentManifest?: ParentManifest;
  accessToken?: string;
};

const LoadingComponent = () => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1000,
    }}
  >
    <LL />
  </div>
);

const ZoomedImage = dynamic(() => import('./ZoomedImage'), {
  ssr: false,
  loading: LoadingComponent,
});

type GridProps = {
  $isFullSupportBrowser: boolean;
};

const Grid = styled.div<GridProps>`
  display: grid;
  height: ${props =>
    props.$isFullSupportBrowser
      ? `calc(100vh - ${props.theme.navHeight}px)`
      : 'auto'};
  overflow: hidden;
  grid-template-columns: [left-edge] minmax(200px, 3fr) [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];
  grid-template-rows: [top-edge] min-content [desktop-main-start desktop-topbar-end] 1fr [mobile-bottombar-start mobile-main-end] min-content [bottom-edge];

  .viewer-desktop {
    display: none;

    ${props => props.theme.media('medium')`
      display: inherit;
    `}
  }

  .viewer-mobile {
    ${props => props.theme.media('medium')`
      display: none;
    `}
  }

  ${props => props.theme.media('xlarge')`
    grid-template-columns: [left-edge] minmax(200px, 330px) [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];
  `}
`;

const Sidebar = styled.div<{
  $isActiveMobile: boolean;
  $isActiveDesktop: boolean;
  $isFullSupportBrowser: boolean;
}>`
  display: ${props =>
    props.$isActiveMobile || !props.$isFullSupportBrowser ? 'inherit' : 'none'};
  align-content: start;

  ${props =>
    props.theme.media('medium')(`
      display: ${props.$isActiveDesktop ? 'inherit' : 'none'};
    `)}

  grid-area: desktop-main-start / left-edge / bottom-edge /right-edge;

  ${props =>
    props.theme.media('medium')(`
      grid-area: desktop-main-start / left-edge / bottom-edge / desktop-sidebar-end;
      border-right: 1px solid ${props.theme.color('black')};
    `)}

  background: ${props => props.theme.color('neutral.700')};
  color: ${props => props.theme.color('white')};
  overflow: auto;
  z-index: 5;
`;

const Topbar = styled.div`
  background: ${props => props.theme.color('neutral.700')};
  grid-area: top-edge / left-edge / desktop-topbar-end / right-edge;
  z-index: 5;
`;

const Main = styled.div<{
  $isDesktopSidebarActive: boolean;
  $isFullSupportBrowser: boolean;
}>`
  background: ${props => props.theme.color('black')};
  color: ${props => props.theme.color('white')};
  position: relative;

  img {
    transition: filter ${props => props.theme.transitionProperties};
  }

  width: ${props => (props.$isFullSupportBrowser ? 'auto' : '100vw')};
  grid-area: ${props =>
    props.$isFullSupportBrowser
      ? 'desktop-main-start / left-edge / mobile-main-end / right-edge'
      : 'auto'};

  ${props =>
    props.theme.media('medium')(`
      width: auto;
      grid-area: desktop-main-start / ${
        props.$isDesktopSidebarActive ? 'main-start' : 'left-edge'
      } / bottom-edge / right-edge;
    `)}
`;

const Zoom = styled.div`
  grid-area: desktop-main-start / left-edge / bottom-edge / right-edge;
`;

const BottomBar = styled.div`
  display: inherit;

  ${props => props.theme.media('medium')`
    display: none;
  `}

  grid-area: mobile-bottombar-start / left-edge / bottom-edge / right-edge;
  background: hotpink;
  z-index: 6;
`;

// TODO: check that we can't reach thumbnails by keyboard/screenreader
const ThumbnailsWrapper = styled.div<{
  $isActive: boolean;
  $isDesktopSidebarActive: boolean;
}>`
  background: ${props => props.theme.color('black')};
  transform: translateY(${props => (props.$isActive ? '0' : '100%')});
  transition: transform 250ms ease;
  z-index: 3;
  grid-area: desktop-main-start / left-edge / bottom-edge / right-edge;

  ${props => props.theme.media('medium')`
    grid-area: desktop-main-start / desktop-sidebar-end / bottom-edge / right-edge;
  `}

  ${props =>
    !props.$isDesktopSidebarActive &&
    props.theme.media('medium')`
      grid-area: desktop-main-start / left-edge / bottom-edge / right-edge;
  `}
`;

const IIIFViewer: FunctionComponent<IIIFViewerProps> = ({
  work,
  iiifImageLocation,
  iiifPresentationLocation,
  transformedManifest,
  canvasOcr,
  handleImageError,
  searchResults,
  setSearchResults,
  parentManifest,
  accessToken,
}: IIIFViewerProps) => {
  const router = useRouter();
  const {
    page = 1,
    canvas = 1,
    manifest = 1,
    shouldScrollToCanvas = true,
    query = '',
  } = fromQuery(router.query);
  const { extendedViewer } = useToggles();
  const [gridVisible, setGridVisible] = useState(false);
  const { isFullSupportBrowser } = useContext(AppContext);
  const viewerRef = useRef<HTMLDivElement>(null);
  const mainAreaRef = useRef<HTMLDivElement>(null);
  const [isDesktopSidebarActive, setIsDesktopSidebarActive] = useState(true);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(false);
  const [showZoomed, setShowZoomed] = useState(false);
  const [rotatedImages, setRotatedImages] = useState<RotatedImage[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mainAreaHeight, setMainAreaHeight] = useState(500);
  const [mainAreaWidth, setMainAreaWidth] = useState(1000);
  const [isResizing, setIsResizing] = useState(false);
  const currentCanvas =
    transformedManifest?.canvases[queryParamToArrayIndex(canvas)];
  const mainImageService = { '@id': currentCanvas?.imageServiceId };
  const urlTemplate =
    (iiifImageLocation && iiifImageTemplate(iiifImageLocation.url)) ||
    (mainImageService['@id'] && iiifImageTemplate(mainImageService['@id']));
  const imageUrl = urlTemplate && urlTemplate({ size: '800,' });
  const hasIiifImage = imageUrl && iiifImageLocation;
  const hasImageService = Boolean(mainImageService['@id'] && currentCanvas);
  const [showControls, setShowControls] = useState(
    Boolean(hasIiifImage && !hasImageService)
  );

  // We need to reset the MainAreaWidth and MainAreaHeight
  // when the available space changes.
  // This can happen when the browser is resized
  // or if the sidebar is collapsed/expanded.
  // Previously, we used a ResizeObserver on the mainAreaRef.current
  // which took care of both these scenarios.
  // However, in Safari when 'Show scroll bars' was set to always in the system settings
  // the viewer would constantly reload itself.
  // To fix this we now reset the MainAreaWidth and MainAreaHeight
  // when the window is resized or the isDesktopSidebarActive value changes
  let timeout;
  const handleResize = () => {
    setIsResizing(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsResizing(false);
      setMainAreaWidth(mainAreaRef.current?.clientWidth || 0);
      setMainAreaHeight(mainAreaRef.current?.clientHeight || 0);
    }, 500); // debounce
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [isDesktopSidebarActive]);

  return (
    <ItemViewerContext.Provider
      value={{
        // DATA props:
        query: {
          page,
          canvas,
          manifest,
          shouldScrollToCanvas,
          query,
        },
        work,
        transformedManifest,
        parentManifest,
        searchResults,
        setSearchResults,

        // UI Props:
        viewerRef,
        mainAreaRef,
        mainAreaWidth,
        mainAreaHeight,
        gridVisible,
        setGridVisible,
        isFullscreen,
        setIsFullscreen,
        isDesktopSidebarActive,
        setIsDesktopSidebarActive,
        isMobileSidebarActive,
        setIsMobileSidebarActive,
        showZoomed,
        setShowZoomed,
        showControls,
        setShowControls,
        rotatedImages,
        setRotatedImages,
        isResizing,
        errorHandler: handleImageError,
        accessToken,
      }}
    >
      <Grid ref={viewerRef} $isFullSupportBrowser={isFullSupportBrowser}>
        <Sidebar
          $isActiveMobile={isMobileSidebarActive}
          $isActiveDesktop={isDesktopSidebarActive}
          $isFullSupportBrowser={isFullSupportBrowser}
        >
          <DelayVisibility>
            <ViewerSidebar
              iiifImageLocation={iiifImageLocation}
              iiifPresentationLocation={iiifPresentationLocation}
            />
          </DelayVisibility>
        </Sidebar>
        <Topbar>
          <DelayVisibility>
            <ViewerTopBar iiifImageLocation={iiifImageLocation} />
          </DelayVisibility>
        </Topbar>
        <Main
          ref={mainAreaRef}
          $isDesktopSidebarActive={isDesktopSidebarActive}
          $isFullSupportBrowser={isFullSupportBrowser}
        >
          <DelayVisibility>
            {!showZoomed && <ImageViewerControls />}
            {hasIiifImage && !hasImageService && isFullSupportBrowser && (
              <ImageViewer
                infoUrl={iiifImageLocation.url}
                id={imageUrl}
                width={800}
                index={0}
                alt={work?.description || work?.title || ''}
                urlTemplate={urlTemplate}
              />
            )}

            {imageUrl && !isFullSupportBrowser && (
              <NoScriptImage urlTemplate={urlTemplate} canvasOcr={canvasOcr} />
            )}

            {/* If we hide the MainViewer when resizing the browser, it will then rerender with the correct canvas displayed */}
            {(hasImageService || extendedViewer) &&
              !isResizing &&
              isFullSupportBrowser && <MainViewer />}
          </DelayVisibility>
        </Main>
        {showZoomed && isFullSupportBrowser && (
          <Zoom>
            <ZoomedImage iiifImageLocation={iiifImageLocation} />
          </Zoom>
        )}
        {isFullSupportBrowser && (
          <>
            <BottomBar>
              <ViewerBottomBar />
            </BottomBar>
            <ThumbnailsWrapper
              $isActive={gridVisible}
              $isDesktopSidebarActive={isDesktopSidebarActive}
            >
              <GridViewer />
            </ThumbnailsWrapper>
          </>
        )}
      </Grid>
    </ItemViewerContext.Provider>
  );
};

export default IIIFViewer;
