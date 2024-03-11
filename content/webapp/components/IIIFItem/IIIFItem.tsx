import {
  ChoiceBody,
  ContentResource,
  InternationalString,
} from '@iiif/presentation-3';
import {
  TransformedCanvas,
  CustomContentResource,
} from '@weco/content/types/manifest';
import styled from 'styled-components';
import { FunctionComponent } from 'react';
import { getLabelString } from '@weco/content/utils/iiif/v3';
import Layout, { gridSize12 } from '@weco/common/views/components/Layout';
import Space from '@weco/common/views/components/styled/Space';
import VideoPlayer from '@weco/content/components/VideoPlayer/VideoPlayer';
import BetaMessage from '@weco/content/components/BetaMessage/BetaMessage';
import AudioPlayer from '@weco/content/components/AudioPlayer/AudioPlayer';
import VideoTranscript from '../VideoTranscript/VideoTranscript';
import { unavailableContentMessage } from '@weco/common/data/microcopy';

const IframePdfViewer = styled(Space)`
  width: 90vw;
  height: 90vh;
  display: block;
  border: 0;
  margin-top: 98px;
  margin-left: auto;
  margin-right: auto;
`;

const Choice: FunctionComponent<
  ItemProps & { RenderItem: FunctionComponent<ItemProps> }
> = ({ canvas, item, placeholderId, i, RenderItem, exclude }) => {
  // We may have multiple items, such as videos of different formats
  // but we only show the first of these currently
  if ('items' in item) {
    const firstItem = item.items[0];
    if (typeof firstItem !== 'string' && 'id' in firstItem) {
      return (
        <>
          <RenderItem
            key={firstItem.id}
            item={firstItem}
            canvas={canvas}
            placeholderId={placeholderId}
            i={i}
            exclude={exclude}
          />
        </>
      );
    }
  }
  return null;
};

type ItemProps = {
  canvas: TransformedCanvas;
  item: ContentResource | CustomContentResource | ChoiceBody;
  placeholderId: string | undefined;
  i: number;
  exclude: (ContentResource['type'] | ChoiceBody['type'])[]; // allows us to exclude certain types from being rendered
};

// This component will be useful for the IIIFViewer if we want to make that render video, audio, pdfs and Born Digital files in addition to images.
// Currently it is used on the work page to render Sound or Video
// and on the /items page to render Sound, Video and Text (i.e. PDF)
const IIIFItem: FunctionComponent<ItemProps> = ({
  canvas,
  item,
  placeholderId,
  i,
  exclude,
}) => {
  switch (true) {
    case item.type === 'Choice' && !exclude.includes('Choice'):
      return (
        <Choice
          key={item.id}
          item={item}
          canvas={canvas}
          placeholderId={placeholderId}
          i={i}
          RenderItem={IIIFItem}
          exclude={exclude}
        />
      );
    case item.type === 'Sound' &&
      !exclude.includes('Sound') &&
      Boolean(item.id):
      return (
        <AudioPlayer
          audioFile={item.id || ''}
          title={(canvas.label !== '-' && canvas.label) || `${i + 1}`}
        />
      );
    case item.type === 'Video' && !exclude.includes('Video'):
      return (
        <>
          <VideoPlayer
            video={item}
            placeholderId={placeholderId}
            showDownloadOptions={true}
          />
          <VideoTranscript supplementing={canvas.supplementing} />
        </>
      );
    case item.type === 'Text' && !exclude.includes('Text'):
      if ('label' in item) {
        const itemLabel = item.label
          ? getLabelString(item.label as InternationalString)
          : '';
        return (
          <IframePdfViewer
            $v={{
              size: 'l',
              properties: ['margin-bottom'],
            }}
            as="iframe"
            title={`PDF: ${itemLabel}`}
            src={item.id}
          />
        );
      } else {
        return (
          <IframePdfViewer
            $v={{
              size: 'l',
              properties: ['margin-bottom'],
            }}
            as="iframe"
            title={`PDF`}
            src={item.id}
          />
        );
      }
    case item.type === 'Image' && !exclude.includes('Image'):
      return <p>Image goes here</p>; // This will be needed if this Item component is to be used to render an Image in the IIIFViewer
    default: // There are other types we don't do anything with at present, e.g. Dataset
      if (exclude.length === 0) {
        // If we have exclusions, we don't want to fall back to the BetaMessage
        return (
          <Layout gridSizes={gridSize12()}>
            <Space $v={{ size: 'l', properties: ['margin-bottom'] }}>
              <BetaMessage message={unavailableContentMessage} />
            </Space>
          </Layout>
        );
      } else {
        return null;
      }
  }
};

export default IIIFItem;
