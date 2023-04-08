import styled from 'styled-components';
import { trackGaEvent } from '@weco/common/utils/ga';
import Icon from '@weco/common/views/components/Icon/Icon';
import Space from '@weco/common/views/components/styled/Space';
import { FunctionComponent, useContext, RefObject } from 'react';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';
import useIsFullscreenEnabled from '@weco/common/hooks/useIsFullscreenEnabled';
import ToolbarSegmentedControl from '@weco/common/views/components/ToolbarSegmentedControl/ToolbarSegmentedControl';
import { ShameButton } from './ViewerTopBar';
import { expand, gridView, singlePage } from '@weco/common/icons';

const BottomBar = styled.div`
  position: relative;
  z-index: 3;
  background: ${props => props.theme.color('neutral.700')};
  color: ${props => props.theme.color('white')};
  display: flex;
  justify-content: space-between;
`;

const LeftZone = styled(Space).attrs({
  v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
  h: { size: 'm', properties: ['padding-left'] },
})`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightZone = styled(Space).attrs({
  v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
})`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

type Props = {
  viewToggleRef: RefObject<HTMLButtonElement>;
  viewerRef: RefObject<HTMLDivElement>;
};

const ViewerBottomBar: FunctionComponent<Props> = ({ viewerRef }: Props) => {
  const { isEnhanced } = useContext(AppContext);
  const isFullscreenEnabled = useIsFullscreenEnabled();

  const {
    transformedManifest,
    gridVisible,
    setGridVisible,
    work,
    showZoomed,
    isMobileSidebarActive,
  } = useContext(ItemViewerContext);
  const { canvases } = transformedManifest;
  return (
    <BottomBar>
      <LeftZone data-test-id="page-grid-buttons">
        {!showZoomed &&
          canvases &&
          canvases.length > 1 &&
          !isMobileSidebarActive && (
            <ToolbarSegmentedControl
              hideLabels={true}
              items={[
                {
                  id: 'pageView',
                  label: 'Page',
                  icon: singlePage,
                  clickHandler() {
                    setGridVisible(false);
                    trackGaEvent({
                      category: 'Control',
                      action: 'clicked work viewer Detail view button',
                      label: work.id,
                    });
                  },
                },
                {
                  id: 'gridView',
                  label: 'Grid',
                  icon: gridView,
                  clickHandler() {
                    setGridVisible(true);
                    trackGaEvent({
                      category: 'Control',
                      action: 'clicked work viewer Grid view button',
                      label: work.id,
                    });
                  },
                },
              ]}
              activeId={gridVisible ? 'gridView' : 'pageView'}
            />
          )}
      </LeftZone>

      <RightZone>
        {isEnhanced && isFullscreenEnabled && (
          <div className="flex" style={{ alignItems: 'center' }}>
            <Space h={{ size: 'm', properties: ['margin-right'] }}>
              <ShameButton
                isDark
                onClick={() => {
                  if (viewerRef && viewerRef.current) {
                    if (
                      !document.fullscreenElement &&
                      !document['webkitFullscreenElement']
                    ) {
                      if (viewerRef.current.requestFullscreen) {
                        viewerRef.current.requestFullscreen();
                      } else if (viewerRef.current['webkitRequestFullscreen']) {
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
                <Icon icon={expand} />
                <span className="btn__text">Full screen</span>
              </ShameButton>
            </Space>
          </div>
        )}
      </RightZone>
    </BottomBar>
  );
};

export default ViewerBottomBar;
