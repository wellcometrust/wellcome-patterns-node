import {
  memo,
  useState,
  useRef,
  CSSProperties,
  FunctionComponent,
  useEffect,
  useContext,
} from 'react';
import { FixedSizeList, areEqual, VariableSizeList } from 'react-window';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import LL from '@weco/common/views/components/styled/LL';
import useScrollVelocity from '@weco/content/hooks/useScrollVelocity';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import { convertRequestUriToInfoUri } from '@weco/content/utils/convert-iiif-uri';
import { missingAltTextMessage } from '@weco/content/services/wellcome/catalogue/works';
import { font } from '@weco/common/utils/classnames';
import { SearchResults } from '@weco/content/services/iiif/types/search/v3';
import ItemViewerContext, {
  RotatedImage,
} from '../ItemViewerContext/ItemViewerContext';
import ImageViewer from './ImageViewer';
import { TransformedCanvas } from '@weco/content/types/manifest';
import { fetchCanvasOcr } from '@weco/content/services/iiif/fetch/canvasOcr';
import { transformCanvasOcr } from '@weco/content/services/iiif/transformers/canvasOcr';
import { AuthExternalService } from '@iiif/presentation-3';
import { queryParamToArrayIndex } from '.';
import IIIFItem from '@weco/content/components/IIIFItem/IIIFItem';

// TODO temporary styling
// TODO don't really want to use this if poss.
// Can we use VariableSizeList instead?
// TODO pdf iframe viewer has spacing above it
const ItemWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  /* right: 20px; */
  right: 0;
  padding: 0;

  img,
  figure,
  .video {
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 95%;
  }

  iframe {
    /* TODO prevent the weird scrolling */
    width: 100%;
    height: 100%;
    border: 0;
  }

  .video {
    /* TODO get rid of this wrapping div and class if possible */
    video {
      width: 100%;
    }
  }

  img {
    overflow: scroll; /* for alt text, which can be long */
  }
`;

type OverlayPositionData = {
  canvasNumber: number;
  overlayTop: number;
  overlayLeft: number;
  highlight: {
    w: number;
    h: number;
  };
  rotation: number;
};

type SearchTermHighlightProps = {
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $rotation: number;
};

type RotationValue = 0 | 90 | 180 | 270;

const SearchTermHighlight = styled.div<SearchTermHighlightProps>`
  background: ${props => props.theme.color('accent.purple')};
  opacity: 0.5;
  position: absolute;
  z-index: 1;
  top: ${props => `${props.$top}px`};
  left: ${props => `${props.$left}px`};
  width: ${props => `${props.$width}px`};
  height: ${props => `${props.$height}px`};
  transform-origin: 0 0;
  transform: ${props => `rotate(${props.$rotation}deg)`};
`;

const MessageContainer = styled.div`
  min-width: 360px;
  max-width: 60%;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.color('neutral.600')};
  height: 80%;
  margin-top: 50%;
  transform: translateY(-50%);
  padding: 10%;
`;

type ItemRendererProps = {
  style: CSSProperties;
  index: number;
  data: {
    scrollVelocity: number;
    canvases: TransformedCanvas[];
    rotatedImages: RotatedImage[];
    errorHandler?: () => void;
    restrictedService: AuthExternalService | undefined;
    placeholderId: string | undefined;
  };
};

function getOverlayTopLeft({
  imageContainerRect,
  imageRect,
  rotation,
  x,
  y,
}: {
  imageContainerRect: DOMRect;
  imageRect: DOMRect;
  rotation: RotationValue;
  x: number;
  y: number;
}): {
  overlayTop: number;
  overlayLeft: number;
} {
  const imageContainerTop = imageContainerRect?.top || 0;
  const imageTop = imageRect?.top || 0;
  const imageContainerLeft = imageContainerRect?.left || 0;
  const imageLeft = imageRect?.left || 0;
  const startTop = imageTop - imageContainerTop;
  const startLeft = imageLeft - imageContainerLeft;
  if (rotation === 90) {
    return {
      overlayTop: startTop + x,
      overlayLeft: startLeft + imageRect.width - y,
    };
  } else if (rotation === 180) {
    return {
      overlayTop: startTop + imageRect.height - y,
      overlayLeft: startLeft + imageRect.width - x,
    };
  } else if (rotation === 270) {
    return {
      overlayTop: imageTop - imageContainerTop + imageRect.height - x,
      overlayLeft: imageLeft - imageContainerLeft + y,
    };
  } else {
    return {
      overlayTop: imageTop - imageContainerTop + y,
      overlayLeft: imageLeft - imageContainerLeft + x,
    };
  }
}

function getScale({
  imageRect,
  currentCanvas,
  rotation,
}: {
  imageRect: DOMRect;
  currentCanvas: TransformedCanvas;
  rotation: RotationValue;
}): number {
  if (!rotation || rotation === 180) {
    return imageRect && currentCanvas.width
      ? imageRect.width / currentCanvas.width
      : 1;
  } else {
    return imageRect && currentCanvas.height
      ? imageRect.width / currentCanvas.height
      : 1;
  }
}

function getPositionData({
  imageContainerRect,
  imageRect,
  currentCanvas,
  searchResults,
  canvases,
  rotatedImages,
}: {
  imageContainerRect: DOMRect;
  imageRect: DOMRect;
  currentCanvas: TransformedCanvas;
  searchResults: SearchResults | null;
  canvases: TransformedCanvas[];
  rotatedImages: RotatedImage[];
}): OverlayPositionData[] {
  const highlightsPositioningData = searchResults?.resources.map(resource => {
    // on: "https://wellcomelibrary.org/iiif/b30330002/canvas/c55#xywh=2301,662,157,47"
    // OR
    // on: https://iiif.wellcomecollection.org/presentation/b29338062/canvases/b29338062_0031.jp2#xywh=148,2277,259,59"
    const canvasNumber = canvases.findIndex(canvas => {
      return new URL(resource.on).pathname === new URL(canvas.id).pathname;
    });
    const matchingRotation = rotatedImages.find(image => {
      return queryParamToArrayIndex(image.canvas) === canvasNumber;
    });
    const scale = getScale({
      imageRect,
      currentCanvas,
      rotation: (matchingRotation?.rotation || 0) as RotationValue,
    });
    const coordsMatch = resource.on.match(/(#xywh=)(.*)/);
    const coords = coordsMatch && coordsMatch[2].split(',');
    const x = coords ? Math.round(Number(coords[0]) * scale) : 0;
    const y = coords ? Math.round(Number(coords[1]) * scale) : 0;
    const w = coords ? Math.round(Number(coords[2]) * scale) : 0;
    const h = coords ? Math.round(Number(coords[3]) * scale) : 0;
    const { overlayTop, overlayLeft } = getOverlayTopLeft({
      imageContainerRect,
      imageRect,
      rotation: (matchingRotation?.rotation || 0) as RotationValue,
      x,
      y,
    });

    return {
      canvasNumber: Number(canvasNumber),
      overlayTop,
      overlayLeft,
      highlight: {
        w,
        h,
      },
      rotation: matchingRotation?.rotation || 0,
    };
  });
  return highlightsPositioningData || [];
}

const ItemRenderer = memo(({ style, index, data }: ItemRendererProps) => {
  const { scrollVelocity, canvases, restrictedService } = data;
  const [mainLoaded, setMainLoaded] = useState(false);
  const currentCanvas = canvases[index];
  const mainImageService = { '@id': currentCanvas.imageServiceId };
  const urlTemplateMain = mainImageService['@id']
    ? iiifImageTemplate(mainImageService['@id'])
    : undefined;
  const infoUrl =
    mainImageService['@id'] &&
    convertRequestUriToInfoUri(mainImageService['@id']);
  const imageType = scrollVelocity >= 1 ? 'none' : 'main';
  const isRestricted = currentCanvas.hasRestrictedImage;
  const { searchResults, rotatedImages } = useContext(ItemViewerContext);
  const [imageRect, setImageRect] = useState<DOMRect | undefined>();
  const [imageContainerRect, setImageContainerRect] = useState<
    DOMRect | undefined
  >();
  const [ocrText, setOcrText] = useState(missingAltTextMessage);

  const [overlayPositionData, setOverlayPositionData] = useState<
    OverlayPositionData[]
  >([]);

  useEffect(() => {
    const fetchOcr = async () => {
      const ocrText = await fetchCanvasOcr(canvases[index]);
      const ocrString = transformCanvasOcr(ocrText);
      setOcrText(ocrString || missingAltTextMessage);
    };
    fetchOcr();
  }, []);

  useEffect(() => {
    // The search hit dimensions and coordinates are given relative to the full size image.
    // The highlights are positioned relative to the image container.
    // Therefore, in order to display the highlights correctly over the search hits,
    // we need to get the position of the image relative to the container and the display scale of the image relative to the full size.
    // We then need to calculate the position of the highlight factoring in the orientation of the image.
    // This needs to be recalculated whenever the image changes size or orientation.
    const highlightsPositioningData =
      imageContainerRect &&
      imageRect &&
      getPositionData({
        imageContainerRect,
        imageRect,
        currentCanvas,
        searchResults,
        canvases,
        rotatedImages,
      });
    if (highlightsPositioningData) {
      setOverlayPositionData(
        highlightsPositioningData.filter(item => {
          return item.canvasNumber === index;
        })
      );
    }
  }, [imageRect, imageContainerRect, currentCanvas, searchResults]);

  const displayItems =
    currentCanvas.painting.length > 0
      ? currentCanvas.painting
      : currentCanvas.supplementing; // We fall back to supplementing for some of the pdfs

  return (
    <div style={style}>
      {scrollVelocity === 3 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LL $lighten={true} />
        </div>
      ) : isRestricted ? (
        <MessageContainer>
          <h2 className={font('intb', 4)}>{restrictedService?.label}</h2>
          <p
            className={font('intr', 5)}
            dangerouslySetInnerHTML={{
              __html: restrictedService?.description || '',
            }}
          />
        </MessageContainer>
      ) : (
        <>
          {!mainLoaded && <LL $lighten={true} />}
          {/* {(imageType === 'main' || mainLoaded) &&
            urlTemplateMain &&
            infoUrl && ( */}
          <>
            {/* // TODO could rotated images just live on in MainViewer? */}
            {overlayPositionData &&
              overlayPositionData.map((item, i) => {
                return (
                  <SearchTermHighlight
                    key={i}
                    $top={item.overlayTop}
                    $left={item.overlayLeft}
                    $width={item.highlight.w}
                    $height={item.highlight.h}
                    $rotation={item.rotation}
                  />
                );
              })}
            {displayItems.map((item, i) => {
              // TODO if it's a behavior placeholder, should we render text rather than the placeholder image?
              // How could we know if it's a placeholder?
              return (
                <ItemWrapper key={i}>
                  <IIIFItem
                    placeholderId={data.placeholderId}
                    item={item}
                    canvas={currentCanvas}
                    i={i}
                    exclude={[]}
                  />
                </ItemWrapper>
              );
            })}
            {/* //TODO replicate the other properties and what they're used for they should be on a wrapping component not the IIIFItem itself as much as possible */}
            {/* <ImageViewer
                  id="item-page"
                  infoUrl={infoUrl}
                  width={currentCanvas.width || 0}
                  height={currentCanvas.height || 0}
                  alt={ocrText}
                  urlTemplate={urlTemplateMain}
                  index={index}
                  loadHandler={() => {
                    setMainLoaded(true);
                  }}
                  setImageRect={setImageRect}
                  setImageContainerRect={setImageContainerRect}
                /> */}
          </>
          {/* )} */}
        </>
      )}
    </div>
  );
}, areEqual);

ItemRenderer.displayName = 'ItemRenderer';

function scrollViewer({
  currentCanvas,
  canvas,
  viewer,
  mainAreaWidth,
}: {
  currentCanvas: TransformedCanvas | undefined;
  canvas: number;
  viewer: FixedSizeList | null;
  mainAreaWidth: number;
}): void {
  const isLandscape =
    currentCanvas?.width && currentCanvas?.height
      ? currentCanvas.width > currentCanvas.height
      : false;

  // TODO will VariableSizeList be better for this?
  // If an image is landscape, it will tend to appear too low in the viewport
  // on account of the FixedSizedList necessarily being comprised of square items.
  // To circumvent this, if the image is landscape
  // 1. We calculate the rendered height of the image
  // 2. We half the difference between that and the square item it sits inside
  // 3. We scroll that distance, putting the top of the image at the top of the viewport

  if (isLandscape) {
    const ratio =
      currentCanvas?.height && currentCanvas?.width
        ? currentCanvas.height / currentCanvas.width
        : 1;
    const renderedHeight = mainAreaWidth * ratio * 0.8; // TODO: 0.8 = 80% max-width image in container. Variable.
    const heightOfPreviousItems =
      queryParamToArrayIndex(canvas) * (viewer?.props.itemSize || 0);
    const distanceToScroll =
      heightOfPreviousItems +
      ((viewer?.props.itemSize || 0) - renderedHeight) / 2;
    viewer?.scrollTo(distanceToScroll);
  } else {
    // 4. Otherwise, if it's portrait, we go to the start of the image
    viewer?.scrollToItem(queryParamToArrayIndex(canvas), 'start');
  }
}

const MainViewer: FunctionComponent = () => {
  const {
    mainAreaHeight,
    mainAreaWidth,
    transformedManifest,
    query,
    setShowZoomed,
    rotatedImages,
    setShowControls,
    errorHandler,
  } = useContext(ItemViewerContext);
  const { shouldScrollToCanvas, canvas } = query;
  const mainViewerRef = useRef<FixedSizeList>(null);
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const firstRenderRef = useRef(firstRender);
  firstRenderRef.current = firstRender;
  const scrollVelocity = useScrollVelocity(newScrollOffset);
  const debounceHandleOnItemsRendered = useRef(
    debounce(handleOnItemsRendered, 500)
  );
  // const timer = useRef<ReturnType<typeof setTimeout> | undefined>();
  const { canvases, restrictedService, placeholderId } = {
    ...transformedManifest,
  };

  // TODO setShowControls elsewhere, where we determine the canvas index to display
  // We hide the zoom and rotation controls while the user is scrolling
  // TODO - PUT BACK?
  // function handleOnScroll({ scrollOffset }) {
  //   timer.current && clearTimeout(timer.current);
  //   setShowControls(false);
  //   setNewScrollOffset(scrollOffset);

  //   timer.current = setTimeout(() => {
  //     // TODO only if current canvas has image service
  //     setShowControls(true);
  //   }, 500);
  // }

  // We display the canvas indicated by the canvas (index) when the page first loads
  function handleOnItemsRendered() {
    let currentCanvas: TransformedCanvas | undefined;
    if (firstRenderRef.current) {
      currentCanvas = canvases?.[queryParamToArrayIndex(canvas)];
      const viewer = mainViewerRef?.current;
      scrollViewer({ currentCanvas, canvas, viewer, mainAreaWidth });
      setFirstRender(false);
      // TODO if canvas has imageService then show controls
      // setShowControls(true);
    }
  }

  // Scroll to the correct canvas  when the canvas changes.
  // But we don't want this to happen if the canvas changes as a result of the viewer being scrolled,
  // so ItemLink href prop can include a shouldScrollToCanvas query param on the href object to prevent this.
  useEffect(() => {
    if (shouldScrollToCanvas) {
      scrollViewer({
        currentCanvas: canvases?.[queryParamToArrayIndex(canvas)],
        canvas,
        viewer: mainViewerRef?.current,
        mainAreaWidth,
      });
    }
  }, [canvas]);

  return (
    <div data-testid="main-viewer">
      {/* // TODO use VariableSizeList row heights should be based on content */}
      {/* <VariableSizeList
        height={75}
        itemCount={1000}
        itemSize={() => mainAreaWidth}
        layout="horizontal"
        width={300}
        itemData={{
          scrollVelocity,
          canvases: canvases || [],
          setShowZoomed,
          rotatedImages,
          errorHandler,
          restrictedService,
          canvas,
        }}
        onItemsRendered={debounceHandleOnItemsRendered.current}
        onScroll={handleOnScroll}
        ref={mainViewerRef}
      >
        {ItemRenderer}
      </VariableSizeList> */}
      <FixedSizeList
        width={mainAreaWidth}
        style={{ width: `${mainAreaWidth}px`, margin: '0 auto' }}
        height={mainAreaHeight}
        itemCount={canvases?.length || 0}
        itemData={{
          scrollVelocity,
          canvases: canvases || [],
          setShowZoomed,
          rotatedImages,
          errorHandler,
          restrictedService,
          canvas,
          placeholderId,
        }}
        itemSize={mainAreaWidth}
        onItemsRendered={debounceHandleOnItemsRendered.current}
        onScroll={handleOnScroll}
        ref={mainViewerRef}
      >
        {ItemRenderer}
      </FixedSizeList>
    </div>
  );
};

export default MainViewer;
