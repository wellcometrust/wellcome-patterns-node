// @flow
import styled from 'styled-components';
import { useState, memo, useEffect, useRef, useContext } from 'react';
import { FixedSizeGrid, FixedSizeList, areEqual } from 'react-window';
import useScrollVelocity from '@weco/common/hooks/useScrollVelocity';
import LL from '@weco/common/views/components/styled/LL';
import IIIFCanvasThumbnail from './IIIFCanvasThumbnail';
import Space from '@weco/common/views/components/styled/Space';
import {
  headerHeight,
  topBarHeight,
} from '@weco/common/views/components/IIIFViewer/IIIFViewer';
// $FlowFixMe(tsx)
import GlobalInfoBarContext from '@weco/common/views/components/GlobalInfoBarContext/GlobalInfoBarContext';
const ThumbnailSpacer = styled(Space).attrs({
  v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
})`
  height: 200px;
`;

type CellProps = {|
  style: any,
  columnIndex: number,
  rowIndex: number,
  index: number,
  data: {|
    scrollVelocity: number,
    columnCount: number,
    gridVisible: boolean,
    setGridVisible: (value: boolean) => void,
    mainViewerRef: { current: FixedSizeList | null },
    activeIndex: number,
    setActiveIndex: number => void,
    canvases: any,
  |},
|};

const Cell = memo(
  ({ columnIndex, rowIndex, style, data, index }: CellProps) => {
    const {
      columnCount,
      mainViewerRef,
      gridVisible,
      setGridVisible,
      scrollVelocity,
      activeIndex,
      setActiveIndex,
      canvases,
    } = data;
    const itemIndex = rowIndex * columnCount + columnIndex;
    const currentCanvas = canvases[itemIndex];
    return (
      <div style={style}>
        {scrollVelocity > 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LL lighten={true} />
          </div>
        ) : (
          currentCanvas && (
            <ThumbnailSpacer>
              <IIIFCanvasThumbnail
                canvas={currentCanvas}
                clickHandler={() => {
                  mainViewerRef &&
                    mainViewerRef.current &&
                    mainViewerRef.current.scrollToItem(itemIndex);
                  setActiveIndex(itemIndex);
                  setGridVisible(false);
                }}
                isActive={activeIndex === itemIndex}
                thumbNumber={itemIndex + 1}
                isFocusable={gridVisible}
              />
            </ThumbnailSpacer>
          )
        )}
      </div>
    );
  },
  areEqual
);

Cell.displayName = 'Cell';

const GridViewerEl = styled.div`
  outline: none;
  position: fixed;
  top: ${props => {
    const viewerOffset = props?.viewerRef?.current?.offsetTop | 0;
    if (props.isVisible && props.isFullscreen) {
      return `${topBarHeight}px`;
    } else if (props.isVisible && !props.isFullscreen) {
      if (props.infoBannerVisible) {
        return `${viewerOffset + topBarHeight}px`;
      } else {
        return `${headerHeight}px`;
      }
    } else {
      return `100vh`;
    }
  }};
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 1;
  background: ${props => props.theme.color('viewerBlack')};
  transition: top 500ms ease;
`;

type Props = {|
  gridHeight: number,
  gridWidth: number,
  gridVisible: boolean,
  gridViewerRef: { current: HTMLElement | null },
  mainViewerRef: { current: FixedSizeList | null },
  setGridVisible: boolean => void,
  activeIndex: number,
  setActiveIndex: number => void,
  canvases: [],
  isFullscreen: boolean,
  viewerRef: { current: HTMLElement | null },
|};

const GridViewer = ({
  gridHeight,
  gridWidth,
  gridVisible,
  gridViewerRef,
  mainViewerRef,
  setGridVisible,
  activeIndex,
  setActiveIndex,
  canvases,
  isFullscreen,
  viewerRef,
}: Props) => {
  const { showInfoBanner } = useContext(GlobalInfoBarContext);
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const scrollVelocity = useScrollVelocity(newScrollOffset);
  const itemWidth = 250;
  const columnCount = Math.round(gridWidth / itemWidth);
  const columnWidth = gridWidth / columnCount;
  const grid = useRef();
  useEffect(() => {
    const rowIndex = Math.floor(activeIndex / columnCount);
    grid &&
      grid.current &&
      grid.current.scrollToItem({ align: 'start', rowIndex });
  }, [activeIndex]);
  useEffect(() => {
    // required to be set as we are setting the body to overflow hidden to stop multiple scrolls in view bug issue.
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    const body = document && document.body ? document.body : null;
    // there are multiple scrolls in this view, we have to set the body to hidden to stop flickering and offset
    if (body && body.style) {
      body.style.overflow = 'hidden';
    }

    return () => {
      // unmounting
      if (body && body.style) {
        body.style.overflow = '';
      }
    };
  }, []);
  return (
    <GridViewerEl
      isVisible={gridVisible}
      isFullscreen={isFullscreen}
      ref={gridViewerRef}
      viewerRef={viewerRef}
      tabIndex={0}
      infoBannerVisible={showInfoBanner}
    >
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={gridHeight}
        rowCount={canvases.length / columnCount + 1}
        rowHeight={230}
        width={gridWidth}
        itemData={{
          columnCount,
          mainViewerRef,
          gridVisible,
          setGridVisible,
          scrollVelocity,
          activeIndex,
          setActiveIndex,
          canvases,
        }}
        onScroll={({ scrollTop }) => setNewScrollOffset(scrollTop)}
        ref={grid}
      >
        {Cell}
      </FixedSizeGrid>
    </GridViewerEl>
  );
};

export default GridViewer;
