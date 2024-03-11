// https://stackoverflow.com/questions/25993861/how-do-i-get-typescript-to-stop-complaining-about-functions-it-doesnt-know-abou
/* eslint-disable dot-notation */
import styled from 'styled-components';
import { font } from '@weco/common/utils/classnames';
import Download from '@weco/content/components/Download/Download';
import Icon from '@weco/common/views/components/Icon/Icon';
import Space from '@weco/common/views/components/styled/Space';
import { FunctionComponent, useContext } from 'react';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';
import { DigitalLocation } from '@weco/common/model/catalogue';
import useIsFullscreenEnabled from '@weco/content/hooks/useIsFullscreenEnabled';
import ToolbarSegmentedControl from '@weco/content/components/ToolbarSegmentedControl/ToolbarSegmentedControl';
import {
  chevrons,
  collapse,
  expand,
  gridView,
  singlePage,
} from '@weco/common/icons';
import { queryParamToArrayIndex } from '.';
import { getDownloadOptionsFromImageUrl } from '@weco/content/utils/works';
import {
  getDownloadOptionsFromCanvasRenderingAndSupplementing,
  getDownloadOptionsFromManifestRendering,
} from '@weco/content/utils/iiif/v3';
import useTransformedIIIFImage from '@weco/content/hooks/useTransformedIIIFImage';
import { OptionalToUndefined } from '@weco/common/utils/utility-types';

// TODO: update this with a more considered button from our system
export const ShameButton = styled.button.attrs({
  className: font('intb', 5),
})<{ $isDark?: boolean }>`
  line-height: 1.5;
  border-radius: ${props => props.theme.borderRadiusUnit}px;
  text-decoration: none;
  text-align: center;
  transition: all ${props => props.theme.transitionProperties};
  white-space: nowrap;
  padding: 6px 12px;
  position: relative;
  display: flex;
  align-items: center;

  &:not([disabled]):hover {
    cursor: pointer;
  }

  &[disabled],
  &.disabled {
    background: ${props => props.theme.color('neutral.600')};
    border-color: ${props => props.theme.color('neutral.600')};
    cursor: not-allowed;
  }

  &.disabled {
    pointer-events: none;
  }

  .icon {
    display: inline-block;
    vertical-align: middle;
  }

  overflow: hidden;

  ${props =>
    props.$isDark &&
    `
    border: 2px solid transparent;
    color: ${props.theme.color('white')};
    background: transparent;
    outline: none;
    transition: all ${props.theme.transitionProperties};

    .btn__text {
      position: absolute;
      right: 100%;

      ${props.theme.media('large')`
        position: static;
      `}
    }

    &:not([disabled]):hover {
      border: 2px solid ${props.theme.color('white')};
    }
  `}

  ${props =>
    !props.$isDark &&
    `
    background: ${props.theme.color('white')};
    color: ${props.theme.color('accent.green')};
    border: 1px solid ${props.theme.color('accent.green')};

    &:not([disabled]):hover {
      background: ${props.theme.color('accent.green')};
      color: ${props.theme.color('white')};
    }
  `}
`;

const TopBar = styled.div<{
  $isZooming: boolean;
  $isDesktopSidebarActive: boolean;
}>`
  display: ${props => (props.$isZooming ? 'none' : 'grid')};
  min-height: 52px;
  position: relative;
  z-index: 3;
  background: ${props => props.theme.color('neutral.700')};
  color: ${props => props.theme.color('white')};
  justify-content: space-between;
  grid-template-columns: [left-edge] minmax(200px, 3fr) [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];

  ${props => props.theme.media('medium')`
    display: grid;
  `}

  ${props =>
    props.theme.media('xlarge')`
      grid-template-columns: [left-edge] minmax(200px, 330px) [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];
  `}

  ${props =>
    !props.$isDesktopSidebarActive &&
    `
      grid-template-columns: [left-edge] min-content [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];
  `}

  ${props =>
    !props.$isDesktopSidebarActive &&
    props.theme.media('xlarge')`
      grid-template-columns: [left-edge] min-content [desktop-sidebar-end main-start desktop-topbar-start] 9fr [right-edge];
  `}
`;

const Sidebar = styled(Space).attrs({
  $v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
  $h: { size: 's', properties: ['padding-left', 'padding-right'] },
})<{ $isZooming: boolean }>`
  grid-column: left-edge / desktop-sidebar-end;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${props =>
    props.theme.media('medium')(`
    justify-content: flex-end;
  `)}

  ${props =>
    !props.$isZooming &&
    props.theme.media('medium')(`
      border-right: 1px solid ${props.theme.color('black')};
  `)}
`;

const Main = styled(Space).attrs({
  $v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
  $h: { size: 's', properties: ['padding-left', 'padding-right'] },
})`
  display: flex;
  justify-content: flex-end;

  ${props => props.theme.media('medium')`
    justify-content: space-between;
  `}
`;

const LeftZone = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MiddleZone = styled.div.attrs({
  className: font('intb', 5),
})`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightZone = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

type ViewerTopBarProps = OptionalToUndefined<{
  iiifImageLocation?: DigitalLocation;
}>;

const ViewerTopBar: FunctionComponent<ViewerTopBarProps> = ({
  iiifImageLocation,
}) => {
  const { isEnhanced, isFullSupportBrowser } = useContext(AppContext);

  const isFullscreenEnabled = useIsFullscreenEnabled();
  const {
    gridVisible,
    setGridVisible,
    work,
    isMobileSidebarActive,
    setIsMobileSidebarActive,
    isDesktopSidebarActive,
    setIsDesktopSidebarActive,
    showZoomed,
    isResizing,
    transformedManifest,
    query,
    viewerRef,
  } = useContext(ItemViewerContext);
  const { canvas } = query;
  const { canvases, rendering } = { ...transformedManifest };
  const currentCanvas = canvases?.[queryParamToArrayIndex(query.canvas)];
  const mainImageService = { '@id': currentCanvas?.imageServiceId };
  const transformedIIIFImage = useTransformedIIIFImage(work);

  // Works can have a DigitalLocation of type iiif-presentation and/or iiif-image.
  // For a iiif-presentation DigitalLocation we get the download options from the manifest to which it points.
  // For a iiif-image DigitalLocation we create the download options
  // from a combination of the DigitalLocation and the iiif-image json to which it points.
  // The json provides the image width and height used in the link text.
  // Since this isn't vital to rendering the links, the useTransformedIIIFImage hook
  // gets this data client side.
  // Sometimes we render images for works that have neither a iiif-image or a iiif-presentation location type.
  // In this case we use the iiifImageLocation passed from the serverSideProps of the /images.tsx
  const iiifImageDownloadOptions = iiifImageLocation
    ? getDownloadOptionsFromImageUrl({
        url: iiifImageLocation.url,
        width: transformedIIIFImage.width,
        height: transformedIIIFImage.height,
      })
    : [];

  // We also want to offer download options for each canvas image
  // in the iiif-presentation manifest when it is being viewed.
  const canvasImageDownloads = mainImageService['@id']
    ? getDownloadOptionsFromImageUrl({
        url: mainImageService['@id'],
        // TODO the dimensions should really be from the painting width and height, not the canvas
        // it is coincidental that the canvas width and height are the same as the painting width and height
        // Fix this if/when we remove imageServiceId from the TransformedCanvas
        // in favour of using the painting property to find the image/image service
        width: currentCanvas && currentCanvas.width,
        height: currentCanvas && currentCanvas.height,
      })
    : [];

  const canvasDownloadOptions = currentCanvas
    ? getDownloadOptionsFromCanvasRenderingAndSupplementing(currentCanvas)
    : [];

  const manifestDownloadOptions =
    getDownloadOptionsFromManifestRendering(rendering);

  const downloadOptions = [
    ...iiifImageDownloadOptions,
    ...canvasImageDownloads,
    ...canvasDownloadOptions,
    ...manifestDownloadOptions,
  ];

  return (
    <TopBar
      $isZooming={showZoomed}
      $isDesktopSidebarActive={isDesktopSidebarActive}
    >
      <Sidebar $isZooming={showZoomed}>
        {isEnhanced && !showZoomed && (
          <>
            <ShameButton
              data-gtm-trigger="toggle_side_panel"
              className="viewer-desktop"
              $isDark
              onClick={() => {
                setIsDesktopSidebarActive(!isDesktopSidebarActive);
              }}
            >
              <Icon
                icon={chevrons}
                iconColor="white"
                rotate={isDesktopSidebarActive ? undefined : 180}
              />
              <span className="visually-hidden">
                {isDesktopSidebarActive ? 'Hide info' : 'Show info'}
              </span>
            </ShameButton>

            <ShameButton
              className="viewer-mobile"
              $isDark
              onClick={() => {
                setIsMobileSidebarActive(!isMobileSidebarActive);
              }}
            >
              {isMobileSidebarActive ? 'Hide info' : 'Show info'}
            </ShameButton>
          </>
        )}
      </Sidebar>
      <Main>
        <LeftZone className="viewer-desktop">
          {!showZoomed &&
            canvases &&
            canvases.length > 1 &&
            isFullSupportBrowser && (
              <ToolbarSegmentedControl
                hideLabels={true}
                items={[
                  {
                    id: 'pageView',
                    label: 'Page',
                    icon: singlePage,
                    dataGtmTrigger: 'item_view_page_button',
                    clickHandler() {
                      setGridVisible(false);
                    },
                  },
                  {
                    id: 'gridView',
                    label: 'Grid',
                    icon: gridView,
                    dataGtmTrigger: 'item_view_grid_button',
                    clickHandler() {
                      setGridVisible(true);
                    },
                  },
                ]}
                activeId={gridVisible ? 'gridView' : 'pageView'}
              />
            )}
        </LeftZone>
        <MiddleZone className="viewer-desktop">
          {canvases && canvases.length > 1 && !showZoomed && !isResizing && (
            <>
              <span data-testid="active-index">{`${canvas || 0}`}</span>
              {`/${canvases?.length || ''}`}{' '}
              {!(
                canvases[queryParamToArrayIndex(canvas)]?.label?.trim() === '-'
              ) &&
                `(page ${canvases[
                  queryParamToArrayIndex(canvas)
                ]?.label?.trim()})`}
            </>
          )}
        </MiddleZone>
        <RightZone>
          {isEnhanced && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {!showZoomed && downloadOptions.length > 0 && (
                <Space $h={{ size: 's', properties: ['margin-right'] }}>
                  <Download
                    ariaControlsId="itemDownloads"
                    downloadOptions={downloadOptions}
                    useDarkControl={true}
                    isInline={true}
                  />
                </Space>
              )}
              {isFullscreenEnabled && (
                <ShameButton
                  className="viewer-desktop"
                  $isDark
                  onClick={() => {
                    if (viewerRef && viewerRef.current) {
                      if (
                        !document.fullscreenElement &&
                        !document['webkitFullscreenElement']
                      ) {
                        if (viewerRef.current.requestFullscreen) {
                          viewerRef.current.requestFullscreen();
                        } else if (
                          viewerRef.current['webkitRequestFullscreen']
                        ) {
                          viewerRef.current['webkitRequestFullscreen']();
                        }
                      } else {
                        if (document.exitFullscreen) {
                          document.exitFullscreen();
                        } else if (document['webkitExitFullscreen']) {
                          document['webkitExitFullscreen']();
                        }
                      }
                    }
                  }}
                >
                  {document.fullscreenElement ||
                  document['webkitFullscreenElement'] ? (
                    <>
                      <Icon icon={collapse} />
                      Exit full screen
                    </>
                  ) : (
                    <>
                      <Icon icon={expand} />
                      <span className="btn__text">Full screen</span>
                    </>
                  )}
                </ShameButton>
              )}
            </div>
          )}
        </RightZone>
      </Main>
    </TopBar>
  );
};

export default ViewerTopBar;
