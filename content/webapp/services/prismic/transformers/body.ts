import {
  Contact as ContactSlice,
  EditorialImageSlice,
  EditorialImageGallerySlice,
  MediaObjectList as MediaObjectListSlice,
  Table as TableSlice,
  DeprecatedImageList as DeprecatedImageListSlice,
  TitledTextList as TitledTextListSlice,
  GifVideoSlice,
  Discussion as DiscussionSlice,
} from '../types/body';
import { Props as TableProps } from '@weco/common/views/components/Table/Table';
import { Props as ContactProps } from '@weco/common/views/components/Contact/Contact';
import { Props as ImageGalleryProps } from '../../../components/ImageGallery/ImageGallery';
import { Props as DeprecatedImageListProps } from '@weco/common/views/components/DeprecatedImageList/DeprecatedImageList';
import { Props as GifVideoProps } from '../../../components/GifVideo/GifVideo';
import { Props as TitledTextListProps } from '@weco/common/views/components/TitledTextList/TitledTextList';
import { Props as DiscussionProps } from '@weco/common/views/components/Discussion/Discussion';
import { MediaObjectType } from '@weco/common/model/media-object';
import {
  parseLabelType,
  parseTitle,
  asText,
} from '@weco/common/services/prismic/parsers';
import { isNotUndefined } from '@weco/common/utils/array';
import {
  isFilledLinkToDocumentWithData,
  isFilledLinkToMediaField,
} from '../types';
import { TeamPrismicDocument } from '../types/teams';
import { transformCaptionedImage, transformImage } from './images';
import { CaptionedImage } from '@weco/common/model/captioned-image';
import { transformLink, asHtmlString, transformStructuredText, transformTaslFromString } from '.';
import { LinkField, RelationField, RichTextField } from '@prismicio/types';

export type Weight = 'default' | 'featured' | 'standalone' | 'supporting';

export function getWeight(weight: string | null): Weight {
  switch (weight) {
    case 'featured':
      return weight;
    case 'standalone':
      return weight;
    case 'supporting':
      return weight;
    default:
      return 'default';
  }
}

type ParsedSlice<TypeName extends string, Value> = {
  type: TypeName;
  value: Value;
};

type WeightedSlice = {
  weight: Weight;
};

function transformTableCsv(tableData: string): string[][] {
  return tableData
    .trim()
    .split(/[\r\n]+/)
    .map(row => row.split('|').map(cell => cell.trim()));
}

export function transformTableSlice(
  slice: TableSlice
): ParsedSlice<'table', TableProps> {
  return {
    type: 'table',
    value: {
      rows: slice.primary.tableData
        ? transformTableCsv(slice.primary.tableData)
        : [],
      caption: slice.primary.caption || undefined,
      hasRowHeaders: slice.primary.hasRowHeaders,
    },
  };
}

export function transformMediaObjectListSlice(
  slice: MediaObjectListSlice
): ParsedSlice<'mediaObjectList', { items: MediaObjectType[] }> {
  return {
    type: 'mediaObjectList',
    value: {
      items: slice.items
        .map(mediaObject => {
          if (mediaObject) {
            // make sure we have the content we require
            const title = mediaObject.title.length
              ? mediaObject?.title
              : undefined;
            const text = mediaObject.text.length
              ? mediaObject?.text
              : undefined;
            const image = mediaObject.image?.square?.dimensions
              ? mediaObject.image
              : undefined;
            return {
              title: title ? parseTitle(title) : null,
              text: text ? transformStructuredText(text) || null : null,
              image: transformImage(image) || null,
            };
          }
        })
        .filter(isNotUndefined),
    },
  };
}

export function transformTeamToContact(team: TeamPrismicDocument) {
  const {
    data: { title, subtitle, email, phone },
  } = team;

  return {
    title: asText(title),
    subtitle: asText(subtitle),
    email,
    phone,
  };
}

export function transformContactSlice(
  slice: ContactSlice
): ParsedSlice<'contact', ContactProps> | undefined {
  return isFilledLinkToDocumentWithData(slice.primary.content)
    ? {
        type: 'contact',
        value: transformTeamToContact(slice.primary.content),
      }
    : undefined;
}

export function transformEditorialImageSlice(
  slice: EditorialImageSlice
): ParsedSlice<'picture', CaptionedImage> & WeightedSlice {
  return {
    weight: getWeight(slice.slice_label),
    type: 'picture',
    value: transformCaptionedImage(slice.primary),
  };
}

export function transformEditorialImageGallerySlice(
  slice: EditorialImageGallerySlice
): ParsedSlice<'imageGallery', ImageGalleryProps> {
  return {
    type: 'imageGallery',
    value: {
      title: asText(slice.primary.title),
      items: slice.items.map(item => transformCaptionedImage(item)),
      isStandalone: getWeight(slice.slice_label) === 'standalone',
    },
  };
}

export function transformDeprecatedImageListSlice(
  slice: DeprecatedImageListSlice
): ParsedSlice<'deprecatedImageList', DeprecatedImageListProps> &
  WeightedSlice {
  return {
    type: 'deprecatedImageList',
    weight: getWeight(slice.slice_label),
    value: {
      items: slice.items.map(item => ({
        title: parseTitle(item.title),
        subtitle: parseTitle(item.subtitle),
        // TODO: It's questionable whether we should be assigning a 'caption'
        // here or using a different transform function, but as this slice is
        // deprecated I don't really care.  Hopefully we'll just delete this
        // whole function soon.
        //
        // See https://github.com/wellcomecollection/wellcomecollection.org/issues/7680
        image: transformCaptionedImage({ ...item, caption: [] }),
        description: transformStructuredText(item.description) || [],
      })),
    },
  };
}

export function transformGifVideoSlice(
  slice: GifVideoSlice
): (ParsedSlice<'gifVideo', GifVideoProps> & WeightedSlice) | undefined {
  const playbackRate = slice.primary.playbackRate
    ? parseFloat(slice.primary.playbackRate)
    : 1;
  return isFilledLinkToMediaField(slice.primary.video)
    ? {
        type: 'gifVideo',
        weight: getWeight(slice.slice_label),
        value: {
          caption: asHtmlString(slice.primary.caption),
          videoUrl: slice.primary.video.url,
          playbackRate,
          tasl: transformTaslFromString(slice.primary.tasl),
          autoPlay:
            slice.primary.autoPlay === null ? true : slice.primary.autoPlay, // handle old content before these fields existed
          loop: slice.primary.loop === null ? true : slice.primary.loop,
          mute: slice.primary.mute === null ? true : slice.primary.mute,
          showControls:
            slice.primary.showControls === null
              ? false
              : slice.primary.showControls,
        },
      }
    : undefined;
}

function transformTitledTextItem({
  title,
  text,
  link,
  label,
}: {
  title: RichTextField;
  text: RichTextField;
  link: LinkField;
  label: RelationField<'labels'>;
}) {
  return {
    title: parseTitle(title),
    text: transformStructuredText(text),
    link: transformLink(link),
    label: isFilledLinkToDocumentWithData(label) ? parseLabelType(label) : null,
  };
}

export function transformTitledTextListSlice(
  slice: TitledTextListSlice
): ParsedSlice<'titledTextList', TitledTextListProps> {
  return {
    type: 'titledTextList',
    value: {
      items: slice.items.map(item => transformTitledTextItem(item)),
    },
  };
}

export function transformDiscussionSlice(
  slice: DiscussionSlice
): ParsedSlice<'discussion', DiscussionProps> {
  return {
    type: 'discussion',
    value: {
      title: parseTitle(slice.primary.title),
      text: transformStructuredText(slice.primary.text) || [],
    },
  };
}
