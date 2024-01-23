import { useContext, FunctionComponent } from 'react';
import ItemViewerContext, {
  Query,
} from '../ItemViewerContext/ItemViewerContext';
import { font } from '@weco/common/utils/classnames';
import Space from '@weco/common/views/components/styled/Space';
import styled from 'styled-components';
import {
  getEnFromInternationalString,
  isTransformedRange,
  isTransformedCanvas,
} from '@weco/content/utils/iiif/v3';
import PlainList from '@weco/common/views/components/styled/PlainList';
import { toLink as itemLink } from '@weco/content/components/ItemLink';
import NextLink from 'next/link';
import { arrayIndexToQueryParam } from '.';
import { thumbnailsPageSize } from '@weco/content/components/IIIFViewer/Paginators';
import {
  Work,
  WorkBasic,
} from '@weco/content/services/wellcome/catalogue/types';
import {
  TransformedCanvas,
  TransformedRange,
} from '@weco/content/types/manifest';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';

export const List = styled(PlainList)`
  border-left: 1px solid ${props => props.theme.color('neutral.600')};
`;

export const Item = styled(Space).attrs({
  as: 'li',
  className: font('intr', 5),
  $v: { size: 'xs', properties: ['padding-top', 'padding-bottom'] },
  $h: { size: 'm', properties: ['padding-left', 'padding-right'] },
})<{ $isActive: boolean }>`
  position: relative;

  ${props =>
    props.$isActive &&
    `
      background: #222; // FIXME: we don't have a shade between dark-charcoal and black in the palette (light-black?)

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -1px;
        bottom: 0;
        width: 4px;
        background: ${props.theme.color('yellow')};
      }
    `}
`;

type Props = {
  ranges: TransformedRange[];
  canvases: TransformedCanvas[] | undefined;
  currentCanvasIndex: number;
  setIsMobileSidebarActive: (v: boolean) => void;
  query: Query;
  work: WorkBasic & Pick<Work, 'description'>;
};

// If a range doesn't have any nested ranges then we display the range label
// with a link to the first canvas in the range's items.
// If the range does have nested ranges then we just display its label
const Structures: FunctionComponent<Props> = ({
  ranges,
  canvases,
  currentCanvasIndex,
  setIsMobileSidebarActive,
  work,
  query,
}) => {
  return ranges.length > 0 ? (
    <List>
      {ranges.map((range, i) => {
        const rangeCanvases = range?.items?.filter(isTransformedCanvas) || [];
        const firstCanvasInRange = rangeCanvases[0];
        const canvasIndex =
          canvases?.findIndex(canvas => canvas.id === firstCanvasInRange?.id) ||
          0;
        const nestedRanges = range?.items?.filter(isTransformedRange) || [];
        return (
          <Item
            key={i}
            $isActive={
              currentCanvasIndex === arrayIndexToQueryParam(canvasIndex)
            }
          >
            <ConditionalWrapper
              condition={Boolean(nestedRanges.length === 0)}
              wrapper={children => (
                <NextLink
                  replace={true}
                  {...itemLink({
                    workId: work.id,
                    props: {
                      manifest: query.manifest,
                      query: query.query,
                      canvas: arrayIndexToQueryParam(canvasIndex),
                      page: Math.ceil(
                        arrayIndexToQueryParam(canvasIndex) / thumbnailsPageSize
                      ),
                    },
                    source: 'contents_nav',
                  })}
                  data-gtm-trigger="contents_nav"
                  aria-current={
                    currentCanvasIndex === arrayIndexToQueryParam(canvasIndex)
                  }
                  onClick={() => {
                    setIsMobileSidebarActive(false);
                  }}
                >
                  {children}
                </NextLink>
              )}
            >
              {getEnFromInternationalString(range.label)}
            </ConditionalWrapper>
            {nestedRanges.map((range, i) => {
              return (
                <Structures
                  key={i}
                  ranges={[range]}
                  canvases={canvases}
                  currentCanvasIndex={currentCanvasIndex}
                  setIsMobileSidebarActive={setIsMobileSidebarActive}
                  work={work}
                  query={query}
                />
              );
            })}
          </Item>
        );
      })}
    </List>
  ) : null;
};

// Used to display the structures property of a iiif-manifest: https://iiif.io/api/presentation
const ViewerStructures: FunctionComponent = () => {
  const { transformedManifest, setIsMobileSidebarActive, query, work } =
    useContext(ItemViewerContext);
  const { canvas } = query;
  const { structures: ranges, canvases } = { ...transformedManifest };

  return (
    <Structures
      ranges={ranges || []}
      canvases={canvases}
      currentCanvasIndex={canvas}
      setIsMobileSidebarActive={setIsMobileSidebarActive}
      work={work}
      query={query}
    />
  );
};

export default ViewerStructures;
