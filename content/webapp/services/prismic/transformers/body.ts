import {
  CollectionVenue as CollectionVenueSlice,
  Contact as ContactSlice,
  ContentList as ContentListSlice,
  EditorialImageSlice,
  EditorialImageGallerySlice,
  Embed as EmbedSlice,
  Iframe as IframeSlice,
  InfoBlock as InfoBlockSlice,
  Map as MapSlice,
  MediaObjectList as MediaObjectListSlice,
  Quote as QuoteSlice,
  QuoteV2 as QuoteV2Slice,
  SearchResults as SearchResultsSlice,
  Standfirst as StandfirstSlice,
  Table as TableSlice,
  TagList as TagListSlice,
  TextSlice,
  DeprecatedImageList as DeprecatedImageListSlice,
  TitledTextList as TitledTextListSlice,
  GifVideoSlice,
  Discussion as DiscussionSlice,
  AudioPlayer as AudioPlayerSlice,
  Body,
} from '../types/body';
import { Props as ContactProps } from '@weco/common/views/components/Contact/Contact';
import { isNotUndefined } from '@weco/common/utils/array';
import {
  isFilledLinkToDocumentWithData,
  isFilledLinkToMediaField,
} from '@weco/common/services/prismic/types';
import { TeamPrismicDocument } from '../types/teams';
import { transformCaptionedImage } from './images';
import { transformImage } from '@weco/common/services/prismic/transformers/images';
import { asRichText, transformLabelType, asTitle, asText } from '.';
import {
  transformLink,
  transformTaslFromString,
} from '@weco/common/services/prismic/transformers';
import { LinkField, RelationField, RichTextField } from '@prismicio/types';
import { BodySlice, Weight } from '../../../types/body';
import { transformCollectionVenue } from '@weco/common/services/prismic/transformers/collection-venues';
import { GuidePrismicDocument } from '../types/guides';
import { SeasonPrismicDocument } from '../types/seasons';
import { CardPrismicDocument } from '../types/card';
import { PagePrismicDocument } from '../types/pages';
import { EventSeriesPrismicDocument } from '../types/event-series';
import { BookPrismicDocument } from '../types/books';
import { EventPrismicDocument } from '../types/events';
import { ArticlePrismicDocument } from '../types/articles';
import { ExhibitionPrismicDocument } from '../types/exhibitions';
import { transformPage } from './pages';
import { transformGuide } from './guides';
import { transformEventSeries } from './event-series';
import { transformExhibition } from './exhibitions';
import { transformArticle } from './articles';
import { transformEventBasic } from './events';
import { transformSeason } from './seasons';
import { transformCard } from './card';
import {
  getSoundCloudEmbedUrl,
  getVimeoEmbedUrl,
  getYouTubeEmbedUrl,
} from './embeds';

export function getWeight(weight: string | null): Weight {
  switch (weight) {
    case 'featured':
      return weight;
    case 'standalone':
      return weight;
    case 'supporting':
      return weight;
    case 'frames':
      return weight;
    default:
      return 'default';
  }
}

function transformStandfirstSlice(slice: StandfirstSlice): BodySlice {
  return {
    type: 'standfirst',
    weight: getWeight(slice.slice_label),
    value: slice.primary.text,
  };
}

function transformTextSlice(slice: TextSlice): BodySlice {
  return {
    type: 'text',
    weight: getWeight(slice.slice_label),
    value: slice.primary.text,
  };
}

function transformMapSlice(slice: MapSlice): BodySlice {
  return {
    type: 'map',
    value: {
      title: asTitle(slice.primary.title),
      latitude: slice.primary.geolocation.latitude,
      longitude: slice.primary.geolocation.longitude,
    },
  };
}

function transformTableCsv(tableData: string): string[][] {
  return tableData
    .trim()
    .split(/[\r\n]+/)
    .map(row => row.split('|').map(cell => cell.trim()));
}

function transformTableSlice(slice: TableSlice): BodySlice {
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

function transformMediaObjectListSlice(slice: MediaObjectListSlice): BodySlice {
  return {
    type: 'mediaObjectList',
    value: {
      items: slice.items
        .map(mediaObject => {
          if (mediaObject) {
            return {
              title: asTitle(mediaObject.title),
              text: mediaObject.text.length
                ? asRichText(mediaObject.text)
                : undefined,
              image: transformImage(mediaObject.image)!,
            };
          }
        })
        .filter(isNotUndefined),
    },
  };
}

function transformTeamToContact(team: TeamPrismicDocument): ContactProps {
  const {
    data: { title, subtitle, email, phone },
  } = team;

  return {
    title: asTitle(title),
    subtitle: asText(subtitle) || null,
    email,
    phone,
  };
}

function transformContactSlice(slice: ContactSlice): BodySlice | undefined {
  return isFilledLinkToDocumentWithData(slice.primary.content)
    ? {
        type: 'contact',
        value: transformTeamToContact(slice.primary.content),
      }
    : undefined;
}

function transformEditorialImageSlice(slice: EditorialImageSlice): BodySlice {
  return {
    weight: getWeight(slice.slice_label),
    type: 'picture',
    value: transformCaptionedImage(slice.primary),
  };
}

function transformEditorialImageGallerySlice(
  slice: EditorialImageGallerySlice
): BodySlice {
  return {
    type: 'imageGallery',
    value: {
      title: asText(slice.primary.title),
      items: slice.items.map(item => transformCaptionedImage(item)),
      isStandalone: getWeight(slice.slice_label) === 'standalone',
      isFrames: getWeight(slice.slice_label) === 'frames',
    },
  };
}

function transformDeprecatedImageListSlice(
  slice: DeprecatedImageListSlice
): BodySlice {
  return {
    type: 'deprecatedImageList',
    weight: getWeight(slice.slice_label),
    value: {
      items: slice.items.map(item => ({
        title: asTitle(item.title),
        subtitle: asTitle(item.subtitle),
        // TODO: It's questionable whether we should be assigning a 'caption'
        // here or using a different transform function, but as this slice is
        // deprecated I don't really care.  Hopefully we'll just delete this
        // whole function soon.
        //
        // See https://github.com/wellcomecollection/wellcomecollection.org/issues/7680
        image: transformCaptionedImage({ ...item, caption: [] }),
        description: asRichText(item.description) || [],
      })),
    },
  };
}

function transformGifVideoSlice(slice: GifVideoSlice): BodySlice | undefined {
  const playbackRate = slice.primary.playbackRate
    ? parseFloat(slice.primary.playbackRate)
    : 1;
  return isFilledLinkToMediaField(slice.primary.video)
    ? {
        type: 'gifVideo',
        weight: getWeight(slice.slice_label),
        value: {
          caption: asRichText(slice.primary.caption),
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
    title: asTitle(title),
    text: asRichText(text),
    link: transformLink(link),
    label: isFilledLinkToDocumentWithData(label)
      ? transformLabelType(label)
      : undefined,
  };
}

function transformTitledTextListSlice(slice: TitledTextListSlice): BodySlice {
  return {
    type: 'titledTextList',
    value: {
      items: slice.items.map(item => transformTitledTextItem(item)),
    },
  };
}

function transformDiscussionSlice(slice: DiscussionSlice): BodySlice {
  return {
    type: 'discussion',
    value: {
      title: asTitle(slice.primary.title),
      text: asRichText(slice.primary.text) || [],
    },
  };
}

function transformInfoBlockSlice(slice: InfoBlockSlice): BodySlice {
  return {
    type: 'infoBlock',
    value: {
      title: asTitle(slice.primary.title),
      text: slice.primary.text,
      linkText: slice.primary.linkText,
      link: transformLink(slice.primary.link),
    },
  };
}

function transformIframeSlice(slice: IframeSlice): BodySlice {
  return {
    type: 'iframe',
    weight: getWeight(slice.slice_label),
    value: {
      src: slice.primary.iframeSrc!,
      image: transformImage(slice.primary.previewImage)!,
    },
  };
}

function transformQuoteSlice(slice: QuoteSlice | QuoteV2Slice): BodySlice {
  return {
    type: 'quote',
    weight: getWeight(slice.slice_label),
    value: {
      text: slice.primary.text,
      citation: slice.primary.citation,
      isPullOrReview:
        slice.slice_label === 'pull' || slice.slice_label === 'review',
    },
  };
}

function transformTagListSlice(slice: TagListSlice): BodySlice {
  return {
    type: 'tagList',
    value: {
      title: asTitle(slice.primary.title),
      tags: slice.items.map(item => ({
        textParts: item.linkText ? [item.linkText] : [],
        linkAttributes: {
          href: { pathname: transformLink(item.link) },
          as: { pathname: transformLink(item.link) },
        },
      })),
    },
  };
}

function transformAudioPlayerSlice(slice: AudioPlayerSlice): BodySlice {
  return {
    type: 'audioPlayer',
    value: {
      title: asTitle(slice.primary.title),
      audioFile: transformLink(slice.primary.audio) || '',
    },
  };
}

function transformSearchResultsSlice(slice: SearchResultsSlice): BodySlice {
  return {
    type: 'searchResults',
    weight: getWeight(slice.slice_label),
    value: {
      title: asText(slice.primary.title),
      query: slice.primary.query || '',
    },
  };
}

function transformCollectionVenueSlice(
  slice: CollectionVenueSlice
): BodySlice | undefined {
  return isFilledLinkToDocumentWithData(slice.primary.content)
    ? {
        type: 'collectionVenue',
        weight: getWeight(slice.slice_label),
        value: {
          content: transformCollectionVenue(slice.primary.content),
          showClosingTimes: slice.primary.showClosingTimes === 'yes',
        },
      }
    : undefined;
}

export function transformEmbedSlice(slice: EmbedSlice): BodySlice | undefined {
  const embed = slice.primary.embed;

  if (embed.provider_name === 'Vimeo') {
    return {
      type: 'videoEmbed',
      weight: getWeight(slice.slice_label),
      value: {
        embedUrl: getVimeoEmbedUrl(embed),
        caption: slice.primary.caption,
      },
    };
  }

  if (embed.provider_name === 'SoundCloud') {
    return {
      type: 'soundcloudEmbed',
      weight: getWeight(slice.slice_label),
      value: {
        embedUrl: getSoundCloudEmbedUrl(embed),
        caption: slice.primary.caption,
      },
    };
  }

  if (embed.provider_name === 'YouTube') {
    return {
      type: 'videoEmbed',
      weight: getWeight(slice.slice_label),
      value: {
        embedUrl: getYouTubeEmbedUrl(embed),
        caption: slice.primary.caption,
      },
    };
  }
}

function transformContentListSlice(slice: ContentListSlice): BodySlice {
  type ContentListPrismicDocument =
    | PagePrismicDocument
    | EventSeriesPrismicDocument
    | BookPrismicDocument
    | EventPrismicDocument
    | ArticlePrismicDocument
    | ExhibitionPrismicDocument
    | CardPrismicDocument
    | SeasonPrismicDocument
    | GuidePrismicDocument;

  const contents: ContentListPrismicDocument[] = slice.items
    .map(item => item.content)
    .filter(isFilledLinkToDocumentWithData);

  return {
    type: 'contentList',
    weight: getWeight(slice.slice_label),
    value: {
      title: asText(slice.primary.title),
      // TODO: The old code would look up a `hasFeatured` field on `slice.primary`,
      // but that doesn't exist in our Prismic model.
      // hasFeatured: slice.primary.hasFeatured,
      items: contents
        .map(content => {
          switch (content.type) {
            case 'pages':
              return transformPage(content);
            case 'guides':
              return transformGuide(content);
            case 'event-series':
              return transformEventSeries(content);
            case 'exhibitions':
              return transformExhibition(content);
            case 'articles':
              return transformArticle(content);
            case 'events':
              return transformEventBasic(content);
            case 'seasons':
              return transformSeason(content);
            case 'card':
              return transformCard(content);
          }
        })
        .filter(isNotUndefined),
    },
  };
}

export function transformBody(body: Body): BodySlice[] {
  return body
    .map(slice => {
      switch (slice.slice_type) {
        case 'standfirst':
          return transformStandfirstSlice(slice);

        case 'text':
          return transformTextSlice(slice);

        case 'map':
          return transformMapSlice(slice);

        case 'editorialImage':
          return transformEditorialImageSlice(slice);

        case 'editorialImageGallery':
          return transformEditorialImageGallerySlice(slice);

        case 'titledTextList':
          return transformTitledTextListSlice(slice);

        case 'contentList':
          return transformContentListSlice(slice);

        case 'collectionVenue':
          return transformCollectionVenueSlice(slice);

        case 'searchResults':
          return transformSearchResultsSlice(slice);

        case 'quote':
        case 'quoteV2':
          return transformQuoteSlice(slice);

        case 'iframe':
          return transformIframeSlice(slice);

        case 'gifVideo':
          return transformGifVideoSlice(slice);

        case 'contact':
          return transformContactSlice(slice);

        case 'embed':
          return transformEmbedSlice(slice);

        case 'table':
          return transformTableSlice(slice);

        case 'infoBlock':
          return transformInfoBlockSlice(slice);

        case 'discussion':
          return transformDiscussionSlice(slice);

        case 'tagList':
          return transformTagListSlice(slice);

        case 'audioPlayer':
          return transformAudioPlayerSlice(slice);

        // Deprecated
        case 'imageList':
          return transformDeprecatedImageListSlice(slice);

        case 'mediaObjectList':
          return transformMediaObjectListSlice(slice);
      }
    })
    .filter(isNotUndefined);
}
