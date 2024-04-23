import { LicenseType } from '@weco/common/model/license';
import { singleLineOfText } from './text';
import { Picture } from '@weco/common/model/picture';
import { ImageType } from '@weco/common/model/image';
import { CaptionedImageProps } from '@weco/content/components/CaptionedImage/CaptionedImage';
import { Props as ImageGalleryProps } from '@weco/content/components/ImageGallery';

type ImageSize = '1600x900' | '3200x1500' | '3200x1800' | '3200x3200';

export const imagesBaseUrl = `${window.location.origin}/images`;

export const florenceWinterfloodImageUrl = (size: ImageSize) =>
  `${imagesBaseUrl}/florence-winterflood-${size}.jpg`;
export const darkCloudImageUrl = (size: ImageSize) =>
  `${imagesBaseUrl}/darkcloud-promo-${size}.png`;
export const bookImageUrl = `${imagesBaseUrl}/book.png`;
export const readingRoomImageUrl = `${imagesBaseUrl}/reading-room-3200x1800.jpg`;
export const readingRoomClockImageUrl = `${imagesBaseUrl}/reading-room-clock-3200x3200.jpg`;

export const image = (
  contentUrl = readingRoomImageUrl,
  width = 640,
  height = 360
): Picture => {
  return {
    contentUrl,
    width,
    height,
    alt: 'an image with some alt text',
    tasl: {
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC' as LicenseType,
    },
  };
};

export const squareImage = (
  contentUrl = readingRoomClockImageUrl,
  width = 300,
  height = 300
): ImageType => {
  return {
    contentUrl,
    width,
    height,
    alt: '',
    tasl: {
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC' as LicenseType,
    },
  };
};

export const captionedImage = (): CaptionedImageProps => ({
  image: image(),
  caption: [
    {
      type: 'paragraph',
      text: 'Etiam pellentesque dui tellus, quis dictum turpis blandit id. Etiam.',
      spans: [],
    },
  ],
  hasRoundedCorners: false,
});

export const imageGallery = (): ImageGalleryProps & { id: number } => {
  const items = Array(4).fill(captionedImage());

  return {
    id: 123,
    title: singleLineOfText(),
    items,
    isStandalone: false,
    isFrames: false,
  };
};
