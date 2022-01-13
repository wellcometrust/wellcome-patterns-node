// @flow
import { RichText, Date as PrismicDate } from 'prismic-dom';
// $FlowFixMe (tsx)
import { PrismicLink, HTMLString, PrismicFragment } from './types';
import flattenDeep from 'lodash.flattendeep';
import type { ImageType } from '../../model/image';
import type { Tasl } from '../../model/tasl';
import type { LicenseType } from '../../model/license';
import type { Place } from '../../model/places';
import type { Format } from '../../model/format';
import type { Link } from '../../model/link';
import type {
  BackgroundTexture,
  PrismicBackgroundTexture,
} from '../../model/background-texture';
import type { CaptionedImage } from '../../model/captioned-image';
import type { ImagePromo } from '../../model/image-promo';
// $FlowFixMe (ts)
import type { Card } from '../../model/card';
import type { GenericContentFields } from '../../model/generic-content-fields';
import type { LabelField } from '../../model/label-field';
// $FlowFixMe (tsx)
import { type BodyType } from '../../views/components/Body/Body';
import { licenseTypeArray } from '../../model/license';
import { parsePage } from './pages';
import { parseEventSeries } from './event-series';
import { parseExhibitionDoc } from './exhibitions';
// $FlowFixMe (tsx)
import { parseCollectionVenue } from '../../services/prismic/opening-times';
import isEmptyObj from '../../utils/is-empty-object';
import { dasherize } from '../../utils/grammar';
import linkResolver from './link-resolver';
import { parseArticleDoc } from './articles';
import { parseEventDoc } from './events';
// $FlowFixMe (tsx)
import { parseSeason } from './seasons';
// $FlowFixMe (tsx)
import { links } from '../../views/components/Header/Header';
// $FlowFixMe (tsx)
import { MediaObjectType } from '../../model/media-object';
import type { Guide } from '../../model/guides';
import type { PrismicDocument } from './types';
import type { ReactElement } from 'react';
import type { HTMLSerializer } from 'prismic-reactjs';

const placeHolderImage = ({
  contentUrl: 'https://via.placeholder.com/1600x900?text=%20',
  width: 160,
  height: 900,
  alt: 'Placeholder image',
  tasl: {
    sourceName: 'Unknown',
    title: null,
    author: null,
    sourceLink: null,
    license: null,
    copyrightHolder: null,
    copyrightLink: null,
  },
  crops: {},
}: ImageType);

function isEmptyHtmlString(maybeContent: ?HTMLString): boolean {
  return maybeContent ? asHtml(maybeContent) === null : false;
}

export function asText(maybeContent: ?HTMLString): ?string {
  return maybeContent && RichText.asText(maybeContent).trim();
}

export function asHtml(
  maybeContent: ?HTMLString,
  htmlSerializer?: HTMLSerializer<ReactElement>
) {
  // Prismic can send us empty html elements which can lead to unwanted UI in templates.
  // Check that `asText` wouldn't return an empty string.
  const isEmpty = !maybeContent || (asText(maybeContent) || '').trim() === '';
  return isEmpty
    ? null
    : RichText.asHtml(maybeContent, linkResolver, htmlSerializer).trim();
}

function isMissingOrEmpty(maybeContent: any) {
  // Prismic can send us empty html elements which can lead to unwanted UI in templates.
  // Check that `asText` wouldn't return an empty string.
  return !maybeContent || asText(maybeContent) === '';
}

export function parseRichText(maybeContent: ?HTMLString) {
  return isMissingOrEmpty(maybeContent) ? null : maybeContent;
}

export function parseTitle(title: HTMLString): string {
  // We always need a title - blunt validation, but validation none the less
  return asText(title) || '';
}

export function parseTimestamp(frag: PrismicFragment): Date {
  return PrismicDate(frag);
}

export function checkAndParseImage(frag: ?PrismicFragment): ?ImageType {
  return frag && (isImageLink(frag) ? parseImage(frag) : null);
}

// These are the props returned on a prismic image object
const prismicImageProps = ['dimensions', 'alt', 'copyright', 'url'];
// We don't export this, as we probably always want to check ^ first
function parseImage(frag: PrismicFragment): ImageType {
  const tasl = parseTaslFromString(frag.copyright);
  const crops = Object.keys(frag)
    .filter(key => prismicImageProps.indexOf(key) === -1)
    .filter(key => isImageLink(frag[key]))
    .map(key => ({
      key,
      image: parseImage(frag[key]),
    }))
    .reduce((acc, { key, image }) => {
      acc[key] = image;
      return acc;
    }, {});

  return {
    contentUrl: frag.url,
    width: frag.dimensions.width,
    height: frag.dimensions.height,
    alt: frag.alt,
    tasl: tasl,
    crops: crops,
  };
}

type Crop = '16:9' | '32:15' | 'square';
export function parseCaptionedImage(
  frag: PrismicFragment,
  crop?: ?Crop
): CaptionedImage {
  if (isEmptyObj(frag.image)) {
    return {
      image: placeHolderImage,
      caption: [
        {
          type: 'paragraph',
          text: '',
          spans: [],
        },
      ],
    };
  }

  const image = crop ? frag.image[crop] : frag.image;
  return {
    image: image.dimensions ? parseImage(image) : placeHolderImage,
    caption: !isEmptyHtmlString(frag.caption) ? frag.caption : [],
  };
}

export function parsePromoToCaptionedImage(
  frag: PrismicFragment,
  crop: ?Crop = '16:9'
): CaptionedImage {
  // We could do more complicated checking here, but this is what we always use.
  const promo = frag[0];
  return parseCaptionedImage(promo.primary, crop);
}

export function parseTaslFromString(pipedString: string): Tasl {
  // We expect a string of title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink
  // e.g. Self|Rob Bidder|||CC-BY-NC
  try {
    const list = pipedString.split('|');
    const v = list
      .concat(Array(7 - list.length))
      .map(v => (!v.trim() ? null : v.trim()));

    const [
      title,
      author,
      sourceName,
      sourceLink,
      maybeLicense,
      copyrightHolder,
      copyrightLink,
    ] = v;
    const license: ?LicenseType = licenseTypeArray.find(
      l => l === maybeLicense
    );
    return {
      title,
      author,
      sourceName,
      sourceLink,
      license,
      copyrightHolder,
      copyrightLink,
    };
  } catch (e) {
    return {
      title: pipedString,
      author: null,
      sourceName: null,
      sourceLink: null,
      license: null,
      copyrightHolder: null,
      copyrightLink: null,
    };
  }
}

function parseTeamToContact(team: PrismicFragment) {
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

// null is valid to use the default image,
// which isn't on a property, but rather at the root
type CropType = null | '16:9' | '32:15' | 'square';
export function parseImagePromo(
  frag: ?(PrismicFragment[]),
  cropType: CropType = '16:9',
  minWidth: ?string = null
): ?ImagePromo {
  const promoSlice =
    frag && frag.find(slice => slice.slice_type === 'editorialImage');
  const link = promoSlice && promoSlice.primary.link;
  // We introduced enforcing 16:9 half way through, so we have to do a check for it.
  const promoImage =
    promoSlice && cropType
      ? promoSlice.primary.image[cropType] || promoSlice.primary.image
      : promoSlice && promoSlice.primary.image;

  return (
    promoSlice &&
    ({
      caption: asText(promoSlice.primary.caption),
      image: checkAndParseImage(promoImage),
      link,
    }: ImagePromo)
  );
}

export function parsePlace(doc: PrismicFragment): Place {
  const genericFields = parseGenericFields(doc);
  return {
    ...genericFields,
    level: doc.data.level || 0,
    capacity: doc.data.capacity,
    information: doc.data.locationInformation,
  };
}

export function parseNumber(fragment: PrismicFragment): number {
  return parseInt(fragment, 10);
}

export function parseBackgroundTexture(
  backgroundTexture: PrismicBackgroundTexture
): BackgroundTexture {
  return {
    image: backgroundTexture.image.url,
    name: backgroundTexture.name,
  };
}

export function parseLabelTypeList(
  fragment: PrismicFragment[],
  labelKey: string
): LabelField[] {
  return fragment
    .map(label => label[labelKey])
    .filter(Boolean)
    .filter(label => label.isBroken === false)
    .map(label => parseLabelType(label));
}

export function parseLabelType(fragment: PrismicFragment): LabelField {
  return {
    id: fragment.id,
    title: fragment.data && asText(fragment.data.title),
    description: fragment.data && fragment.data.description,
  };
}

export function parseBoolean(fragment: PrismicFragment): boolean {
  return Boolean(fragment);
}

function parseStructuredText(maybeFragment: ?any): ?HTMLString {
  return maybeFragment && isStructuredText((maybeFragment: HTMLString))
    ? (maybeFragment: HTMLString)
    : null;
}

export function parseSingleLevelGroup(
  frag: PrismicFragment[],
  singlePropertyName: string
) {
  return (
    (frag || [])
      .filter(fragItem => isDocumentLink(fragItem[singlePropertyName]))
      /*eslint-disable */
      .map<PrismicFragment>(fragItem => fragItem[singlePropertyName])
  );
  /* eslint-enable */
}

export function parseFormat(frag: Object): ?Format {
  return isDocumentLink(frag)
    ? {
        id: frag.id,
        title: parseTitle(frag.data.title),
        description: asHtml(frag.data.description),
      }
    : null;
}

export function parseLink(link?: PrismicLink): ?string {
  if (link) {
    if (link.link_type === 'Web' || link.link_type === 'Media') {
      return link.url;
    } else if (link.link_type === 'Document' && isDocumentLink(link)) {
      return linkResolver(link);
    }
  }
}

function parseCard(fragment: PrismicFragment): Card {
  const { title, format, description, image, link } = fragment.data;
  return {
    type: 'card',
    title: asText(title) || null,
    format: parseFormat(format),
    description: asText(description) || null,
    image: image ? checkAndParseImage(image) : null,
    link: parseLink(link),
    order: null,
  };
}

// Prismic return `[ { type: 'paragraph', text: '', spans: [] } ]` when you have
// inserted text, then removed it, so we need to do this check.
export function isStructuredText(structuredTextObject: HTMLString): boolean {
  const text = asText(structuredTextObject);
  return Boolean(structuredTextObject) && (text || '').trim() !== '';
}

// If a link is non-existant, it can either be returned as `null`, or as an
// empty link object, which is why we use this
export function isDocumentLink(fragment: ?PrismicFragment): boolean {
  return Boolean(fragment && fragment.isBroken === false && fragment.data);
}

// when images have crops, event if the image isn't attached, we get e.g.
// { '32:15': {}, '16:9': {}, square: {} }
export function isImageLink(fragment: ?PrismicFragment): boolean {
  return Boolean(fragment && fragment.dimensions);
}

export type Weight = 'default' | 'featured' | 'standalone' | 'supporting';

function getWeight(weight: ?string): Weight {
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

export function parseOnThisPage(fragment: PrismicFragment[]): Link[] {
  return flattenDeep(
    fragment.map(slice => slice.primary.title || slice.primary.text || [])
  )
    .filter(text => text.type === 'heading2')
    .map(item => {
      return {
        text: item.text,
        url: `#${dasherize(item.text)}`,
      };
    });
}

function parseGuide(document: PrismicDocument): Guide {
  const { data } = document;
  const genericFields = parseGenericFields(document);
  const siteSections = links.map(link => link.siteSection);
  const siteSection = document.tags.find(tag => siteSections.includes(tag));
  const promo = genericFields.promo;
  return {
    type: 'guides',
    format: data.format && parseFormat(data.format),
    ...genericFields,
    onThisPage: data.body ? parseOnThisPage(data.body) : [],
    showOnThisPage: data.showOnThisPage || false,
    promo: promo && promo.image ? promo : null,
    datePublished: data.datePublished && parseTimestamp(data.datePublished),
    siteSection: siteSection,
  };
}

export function parseMediaObjectList(
  fragment: PrismicFragment[]
): Array<MediaObjectType> {
  return fragment.map(mediaObject => {
    if (mediaObject) {
      // make sure we have the content we require
      const title = mediaObject.title.length ? mediaObject?.title : undefined;
      const text = mediaObject.text.length ? mediaObject?.text : undefined;
      const image = mediaObject.image?.square?.dimensions
        ? mediaObject.image
        : undefined;
      return {
        title: title ? parseTitle(title) : null,
        text: text ? parseStructuredText(text) : null,
        image: image ? parseImage(image) : null,
      };
    }
  });
}

function parseTitledTextItem(item) {
  return {
    title: parseTitle(item.title),
    text: parseStructuredText(item.text),
    link: parseLink(item.link),
    label: isDocumentLink(item.label) ? parseLabelType(item.label) : null,
  };
}

export function parseBody(fragment: PrismicFragment[]): BodyType {
  return fragment
    .map(slice => {
      switch (slice.slice_type) {
        case 'standfirst':
          return {
            type: 'standfirst',
            weight: getWeight(slice.slice_label),
            value: slice.primary.text,
          };

        case 'text':
          return {
            type: 'text',
            weight: getWeight(slice.slice_label),
            value: slice.primary.text,
          };

        case 'map':
          return {
            type: 'map',
            value: {
              title: asText(slice.primary.title),
              latitude: slice.primary.geolocation.latitude,
              longitude: slice.primary.geolocation.longitude,
            },
          };

        case 'editorialImage':
          return {
            weight: getWeight(slice.slice_label),
            type: 'picture',
            value: parseCaptionedImage(slice.primary),
          };

        case 'editorialImageGallery':
          return {
            type: 'imageGallery',
            weight: getWeight(slice.slice_label),
            value: {
              title: asText(slice.primary.title),
              items: (slice.items.map(item =>
                parseCaptionedImage(item)
              ): CaptionedImage[]),
            },
          };

        case 'titledTextList':
          return {
            type: 'titledTextList',
            value: {
              items: slice.items.map(item => parseTitledTextItem(item)),
            },
          };

        case 'contentList':
          return {
            type: 'contentList',
            weight: getWeight(slice.slice_label),
            value: {
              title: asText(slice.primary.title),
              hasFeatured: slice.primary.hasFeatured,
              items: slice.items
                .filter(
                  // We have to do a check for data here, as if it's a linked piece
                  // of content, we won't have this.
                  item => item.content.isBroken === false && item.content.data
                )
                .map(item => {
                  switch (item.content.type) {
                    case 'pages':
                      return parsePage(item.content);
                    case 'guides':
                      return parseGuide(item.content);
                    case 'event-series':
                      return parseEventSeries(item.content);
                    case 'exhibitions':
                      return parseExhibitionDoc(item.content);
                    case 'articles':
                      return parseArticleDoc(item.content);
                    case 'events':
                      return parseEventDoc(item.content);
                    case 'seasons':
                      return parseSeason(item.content);
                    case 'card':
                      return parseCard(item.content);
                  }
                })
                .filter(Boolean),
            },
          };

        case 'collectionVenue':
          return {
            type: 'collectionVenue',
            weight: getWeight(slice.slice_label),
            value: {
              content: parseCollectionVenue(slice.primary.content),
              showClosingTimes: slice.primary.showClosingTimes,
            },
          };

        case 'searchResults':
          return {
            type: 'searchResults',
            weight: getWeight(slice.slice_label),
            value: {
              title: asText(slice.primary.title),
              query: slice.primary.query,
              pageSize: slice.primary.pageSize || 4,
            },
          };

        case 'quote':
        case 'quoteV2':
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

        case 'iframe':
          return {
            type: 'iframe',
            weight: slice.slice_label,
            value: {
              src: slice.primary.iframeSrc,
              image: parseImage(slice.primary.previewImage),
            },
          };

        case 'gifVideo':
          return {
            type: 'gifVideo',
            weight: slice.slice_label,
            value: {
              caption: parseRichText(slice.primary.caption),
              videoUrl: slice.primary.video && slice.primary.video.url,
              playbackRate: slice.primary.playbackRate || 1,
              tasl: parseTaslFromString(slice.primary.tasl),
              autoPlay:
                slice.primary.autoPlay === null ? true : slice.primary.autoPlay, // handle old content before these fields existed
              loop: slice.primary.loop === null ? true : slice.primary.loop,
              mute: slice.primary.mute === null ? true : slice.primary.mute,
              showControls:
                slice.primary.showControls === null
                  ? false
                  : slice.primary.showControls,
            },
          };

        case 'contact':
          return slice.primary.content.isBroken === false
            ? {
                type: 'contact',
                value: parseTeamToContact(slice.primary.content),
              }
            : undefined;

        case 'embed':
          const embed = slice.primary.embed;

          if (embed.provider_name === 'Vimeo') {
            const embedUrl = slice.primary.embed.html.match(
              /src="([-a-zA-Z0-9://.?=_]+)?/
            )[1];
            return {
              type: 'videoEmbed',
              weight: getWeight(slice.slice_label),
              value: {
                embedUrl: `${embedUrl}?rel=0`,
                caption: slice.primary.caption,
              },
            };
          }

          if (embed.provider_name === 'SoundCloud') {
            const apiUrl = embed.html.match(/url=([^&]*)&/);
            const secretToken = embed.html.match(/secret_token=([^"]*)"/);
            const secretTokenString =
              secretToken && secretToken[1]
                ? `%3Fsecret_token%3D${secretToken[1]}`
                : '';

            return {
              type: 'soundcloudEmbed',
              weight: getWeight(slice.slice_label),
              value: {
                embedUrl: `https://w.soundcloud.com/player/?url=${apiUrl[1]}${secretTokenString}&color=%23ff5500&inverse=false&auto_play=false&show_user=true`,
                caption: slice.primary.caption,
              },
            };
          }

          if (embed.provider_name === 'YouTube') {
            const embedUrl = slice.primary.embed.html.match(
              /src="([-a-zA-Z0-9://.?=_]+)?/
            )[1];
            return {
              type: 'videoEmbed',
              weight: getWeight(slice.slice_label),
              value: {
                embedUrl: `${embedUrl}?rel=0`,
                caption: slice.primary.caption,
              },
            };
          }
          break;

        case 'table':
          return {
            type: 'table',
            value: {
              rows: parseTableCsv(slice.primary.tableData),
              caption: slice.primary.caption,
              hasRowHeaders: slice.primary.hasRowHeaders,
            },
          };

        case 'infoBlock':
          return {
            type: 'infoBlock',
            value: {
              title: parseTitle(slice.primary.title),
              text: slice.primary.text,
              linkText: slice.primary.linkText,
              link: slice.primary.link,
            },
          };

        case 'discussion':
          return {
            type: 'discussion',
            value: {
              title: parseTitle(slice.primary.title),
              text: parseStructuredText(slice.primary.text),
            },
          };

        case 'tagList':
          return {
            type: 'tagList',
            value: {
              title: parseTitle(slice.primary.title),
              tags: slice.items.map(item => ({
                textParts: [item.linkText],
                linkAttributes: {
                  href: { pathname: parseLink(item.link), query: '' },
                  as: { pathname: parseLink(item.link), query: '' },
                },
              })),
            },
          };

        // Deprecated
        case 'imageList':
          return {
            type: 'deprecatedImageList',
            weight: getWeight(slice.slice_label),
            value: {
              items: slice.items.map(item => ({
                title: parseTitle(item.title),
                subtitle: parseTitle(item.subtitle),
                image: parseCaptionedImage(item),
                description: parseStructuredText(item.description),
              })),
            },
          };
        case 'mediaObjectList':
          return {
            type: 'mediaObjectList',
            value: {
              items: parseMediaObjectList(slice.items),
            },
          };
      }
    })
    .filter(Boolean);
}

export function parseGenericFields(doc: PrismicFragment): GenericContentFields {
  const { data } = doc;
  const promo = data.promo && parseImagePromo(data.promo);

  const promoImages =
    data.promo && data.promo.length > 0
      ? data.promo
          .filter(slice => slice.primary.image)
          .map(({ primary: { image } }) => {
            const originalImage = isImageLink(image) && parseImage(image);
            const squareImage =
              image.square &&
              isImageLink(image.square) &&
              parseImage(image.square);
            const widescreenImage =
              image['16:9'] &&
              isImageLink(image['16:9']) &&
              parseImage(image['16:9']);
            const superWidescreenImage =
              image['32:15'] &&
              isImageLink(image['32:15']) &&
              parseImage(image['32:15']);

            return {
              image: originalImage,
              squareImage,
              widescreenImage,
              superWidescreenImage,
            };
          })
          .find(_ => _)
      : {}; // just get the first one;

  const { image, squareImage, widescreenImage, superWidescreenImage } =
    promoImages;
  const body = data.body ? parseBody(data.body) : [];
  const standfirst = body.find(slice => slice.type === 'standfirst');
  const metadataDescription = asText(data.metadataDescription);

  return {
    id: doc.id,
    title: parseTitle(data.title),
    body: body,
    standfirst: standfirst && standfirst.value,
    promo: promo,
    promoText: promo && promo.caption,
    promoImage: promo && promo.image,
    image,
    squareImage,
    widescreenImage,
    superWidescreenImage,
    metadataDescription,
    // we pass an empty array here to be overriden by each content type
    // TODO: find a way to enforce this.
    labels: [],
  };
}

function parseTableCsv(tableData: string): string[][] {
  return tableData
    .trim()
    .split(/[\r\n]+/)
    .map(row => row.split('|').map(cell => cell.trim()));
}
