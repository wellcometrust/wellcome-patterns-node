import {
  ChoiceBody,
  ContentResource,
  InternationalString,
} from '@iiif/presentation-3';
import {
  TransformedCanvas,
  CustomContentResource,
} from '@weco/content/types/manifest';
// import styled from 'styled-components';
import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { getLabelString, getImageService2 } from '@weco/content/utils/iiif/v3';
import Layout, { gridSize12 } from '@weco/common/views/components/Layout';
import Space from '@weco/common/views/components/styled/Space';
import VideoPlayer from '@weco/content/components/VideoPlayer/VideoPlayer';
import BetaMessage from '@weco/content/components/BetaMessage/BetaMessage';
import AudioPlayer from '@weco/content/components/AudioPlayer/AudioPlayer';
import VideoTranscript from '../VideoTranscript/VideoTranscript';
import { unavailableContentMessage } from '@weco/common/data/microcopy';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import { imageSizes } from '@weco/common/utils/image-sizes';
import { fetchCanvasOcr } from '@weco/content/services/iiif/fetch/canvasOcr';
import { transformCanvasOcr } from '@weco/content/services/iiif/transformers/canvasOcr';
import { missingAltTextMessage } from '@weco/content/services/wellcome/catalogue/works';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';

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

// TODO I think we should replace this with the ImageViewer component
// OR make own component
// but still need to be able to use on the work page
// TODO need to tackle rotation controls first use ids to match rather than canvas index?
const IIIFImage: FunctionComponent<{
  item: ContentResource;
  ocrText: string; // TODO get these inside this component? or not?
  rotation: number;
}> = ({ item, ocrText, rotation = 0 }) => {
  // TODO types
  const imageService = getImageService2(item); // TODO pass this in?
  const urlTemplate = imageService?.['@id']
    ? iiifImageTemplate(imageService?.['@id'])
    : undefined;

  const [imageSrc, setImageSrc] = useState(
    urlTemplate ? urlTemplate({ size: '640,' }) : ''
  );
  const [srcSet, setSrcSet] = useState(
    imageSizes(2048)
      .map(width => {
        const urlString = urlTemplate
          ? urlTemplate({
              size: `${width},`,
            })
          : '';

        return urlString && `${urlString} ${width}w`;
      })
      .join(',')
  );

  useEffect(() => {
    setImageSrc(urlTemplate ? urlTemplate({ size: '640,', rotation }) : '');
    setSrcSet(
      imageSizes(2048)
        .map(width => {
          const urlString = urlTemplate
            ? urlTemplate({
                size: `${width},`,
                rotation,
              })
            : '';
          return urlString && `${urlString} ${width}w`;
        })
        .join(',')
    );
  }, [rotation]);

  if (urlTemplate) {
    return (
      // data-testid="image-0" // TODO
      // tabindex="0" lang="eng" width="1711" height="2793" class="sc-1680112-0 kpumYi image"
      // TODO need alt text
      <img
        // style={{ width: '100px' }}
        width={800} // TODO
        src={imageSrc}
        srcSet={srcSet}
        sizes={`(min-width: 860px) 800px, calc(92.59vw + 22px)`}
        alt={ocrText}
      />
      // <ImageViewer
      //   infoUrl={iiifImageLocation.url} // TODO do we need this here? only for iiif-images?
      //   id={imageUrl}
      //   width={800}
      //   index={0}
      //   alt={/*work?.description || work?.title ||*/ ''}
      //   urlTemplate={urlTemplate}
      //   setImageRect={() => undefined}
      //   setImageContainerRect={() => undefined}
      // />
    );
  } else {
    return <img src={item.id} alt={ocrText} />;
  }
};

type ItemProps = {
  canvas: TransformedCanvas;
  // Some of our ContentResources can have a type of 'Audio':
  // https://iiif.wellcomecollection.org/presentation/v3/b17276342
  item:
    | (Omit<ContentResource, 'type'> & {
        type: ContentResource['type'] | 'Audio';
      })
    | CustomContentResource
    | ChoiceBody;
  placeholderId: string | undefined;
  i: number;
  exclude: (ContentResource['type'] | 'Audio' | ChoiceBody['type'])[]; // allows us to exclude certain types from being rendered
};

// TODO this needs to be used in react window

// This component will be useful for the IIIFViewer if we want to make that render video, audio, pdfs and Born Digital files in addition to images.
// Currently it is used on the work page to render Sound or Video
// and on the /items page to render Sound, Video and Text (i.e. PDF)
// TODO pass in rotations to this component?
const IIIFItem: FunctionComponent<ItemProps> = ({
  canvas,
  item,
  placeholderId,
  i,
  exclude,
}) => {
  const { rotatedImages } = useContext(ItemViewerContext);
  console.log({ rotatedImages });
  const [ocrText, setOcrText] = useState(missingAltTextMessage);
  useEffect(() => {
    const fetchOcr = async () => {
      const ocrText = await fetchCanvasOcr(canvas);
      const ocrString = transformCanvasOcr(ocrText);
      setOcrText(ocrString || missingAltTextMessage);
    };
    fetchOcr();
  }, []);
  // const hasPdf = canvas.original.some(item => {
  //   return 'format' in item && item.format === 'application/pdf';
  // });
  // TODO create display item from original for application/pdf
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
    case ((item.type === 'Sound' && !exclude.includes('Sound')) ||
      (item.type === 'Audio' && !exclude.includes('Audio'))) &&
      Boolean(item.id):
      return (
        <AudioPlayer
          audioFile={item.id || ''}
          title={(canvas.label !== '-' && canvas.label) || `${i + 1}`}
        />
      );
    case item.type === 'Video' && !exclude.includes('Video'):
      return (
        <div className="video">
          <VideoPlayer
            video={item}
            placeholderId={placeholderId}
            showDownloadOptions={true}
          />
          {/* TODO should transcript be optional? */}
          <VideoTranscript supplementing={canvas.supplementing} />
        </div>
      );
    case item.type === 'Text' && !exclude.includes('Text'):
      if ('label' in item) {
        const itemLabel = item.label
          ? getLabelString(item.label as InternationalString)
          : '';
        return <iframe title={`PDF: ${itemLabel}`} src={item.id} />;
      } else {
        return <iframe title={`PDF`} src={item.id} />;
      }
    case item.type === 'Image' && !exclude.includes('Image'):
      // console.log(item); // TODO some way to distinguish it is a placeholder image for born digital
      // TODO then we could render explanatory text instead
      return <IIIFImage item={item} ocrText={ocrText} rotation={0} />;
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
