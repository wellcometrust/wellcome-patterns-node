import { FunctionComponent } from 'react';
import {
  TransformedCanvas,
  CustomContentResource,
} from '@weco/content/types/manifest';
import {
  Body,
  Canvas,
  Range,
  ContentResource,
  ChoiceBody,
  Manifest,
  InternationalString,
} from '@iiif/presentation-3';
import {
  getLabelString,
  isTransformedCanvas,
  isCanvas,
  isRange,
  getOriginalFiles,
  getFileSize,
  isChoiceBody,
} from '@weco/content/utils/iiif/v3';
import ConditionalWrapper from '@weco/common/views/components/ConditionalWrapper/ConditionalWrapper';

type FileLinkProps = {
  canvasLabel: string | undefined;
  itemLabel: string | undefined;
  fileUri: string | undefined;
  format: string | undefined;
  fileSize: string | undefined;
};

const FileLink: FunctionComponent<FileLinkProps> = ({
  canvasLabel,
  itemLabel,
  format,
  fileUri,
  fileSize,
}) => {
  return (
    <a href={fileUri}>{`${canvasLabel} ${itemLabel} ${
      format ? `(${format})` : ''
    } ${fileSize ? `(${fileSize})` : ''}`}</a>
  );
};

const getLabel = (item: Body) => {
  if (typeof item !== 'string' && 'label' in item) {
    return getLabelString(item.label as InternationalString);
  } else {
    return '';
  }
};

const Download: FunctionComponent<{
  canvas: TransformedCanvas | undefined;
  item: (ContentResource | CustomContentResource | ChoiceBody) & {
    format?: string;
  };
}> = ({ canvas, item }) => {
  // If there is a choice then we only show the first one
  const displayItem = (isChoiceBody(item) ? item.items[0] : item) as Body & {
    format?: string;
  };
  const itemLabel = getLabel(displayItem);
  const fileSize = canvas && getFileSize(canvas);

  if (typeof displayItem !== 'string') {
    return (
      <li key={displayItem.id}>
        <FileLink
          canvasLabel={canvas?.label}
          itemLabel={itemLabel}
          fileUri={displayItem.id}
          format={displayItem.format}
          fileSize={fileSize}
        />
      </li>
    );
  } else {
    return null;
  }
};

const Downloads: FunctionComponent<{
  canvas: TransformedCanvas | Canvas;
  canvases: TransformedCanvas[];
}> = ({ canvas, canvases }) => {
  const transformedCanvas = isTransformedCanvas(canvas)
    ? canvas
    : canvases?.find(transformedCanvas => canvas.id === transformedCanvas.id);
  const downloads = transformedCanvas
    ? getOriginalFiles(transformedCanvas)
    : [];
  return (
    <>
      {downloads.map(item => {
        return (
          <Download key={item.id} canvas={transformedCanvas} item={item} />
        );
      })}
    </>
  );
};

const DownloadList: FunctionComponent<{
  structures: TransformedCanvas[] | Manifest['structures'];
  includeOuterUl?: boolean;
  canvases: TransformedCanvas[];
}> = ({ structures, includeOuterUl = true, canvases }) => {
  return (
    <>
      <ConditionalWrapper
        condition={includeOuterUl}
        wrapper={children => <ul>{children}</ul>}
      >
        {structures?.map((range: TransformedCanvas | Range, i: number) => {
          const rangeItems = isRange(range) ? range.items : [];
          return (
            <li key={i}>
              {isRange(range) && getLabelString(range.label)}
              {isCanvas(range) && (
                <Downloads canvas={range} canvases={canvases} />
              )}
              {rangeItems && rangeItems.length > 0 && (
                <ul>
                  {rangeItems.map((item, i) => {
                    if (isCanvas(item)) {
                      return (
                        <Downloads
                          key={item.id}
                          canvas={item}
                          canvases={canvases}
                        />
                      );
                    } else if (isRange(item)) {
                      return (
                        <DownloadList
                          key={i}
                          structures={[item]}
                          includeOuterUl={false}
                          canvases={canvases}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ConditionalWrapper>
    </>
  );
};

export default DownloadList;
