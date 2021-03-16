import { getStructures, getCanvases } from '@weco/common/utils/iiif';
import { useContext, FunctionComponent, RefObject } from 'react';
import { FixedSizeList } from 'react-window';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';
import { classNames } from '../../../utils/classnames';

type Props = {
  mainViewerRef: RefObject<FixedSizeList>;
};
const ViewerStructuresPrototype: FunctionComponent<Props> = ({
  mainViewerRef,
}: Props) => {
  const { manifest, setActiveIndex, activeIndex } = useContext(
    ItemViewerContext
  );
  const structures = manifest ? getStructures(manifest) : [];
  const canvases = manifest ? getCanvases(manifest) : [];

  return structures.length > 0 ? (
    <ul>
      {structures.map((structure, i) => {
        const firstCanvasInRange = structure.canvases[0];
        const canvasIndex = canvases.findIndex(
          canvas => canvas['@id'] === firstCanvasInRange
        );
        return (
          <li key={i}>
            <a
              className={classNames({
                'font-yellow': activeIndex === canvasIndex,
              })}
              style={{
                cursor: 'pointer',
              }}
              onClick={e => {
                e.preventDefault();
                mainViewerRef &&
                  mainViewerRef.current &&
                  mainViewerRef.current.scrollToItem(canvasIndex, 'start');
                setActiveIndex(canvasIndex);
              }}
            >
              {structure.label}
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default ViewerStructuresPrototype;
