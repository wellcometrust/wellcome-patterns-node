import * as prismicH from 'prismic-helpers-beta';
import { PrismicDocument, KeyTextField, LinkField, RichTextField, TimestampField } from '@prismicio/types';
import { Label } from '@weco/common/model/labels';
import { WithSeries } from '../types/articles';
import linkResolver from '../link-resolver';
import {
  CommonPrismicFields,
  Image,
  isFilledLinkToDocumentWithData,
  isFilledLinkToMediaField,
  isFilledLinkToWebField,
  WithArticleFormat,
} from '../types';
import {
  BodyType,
  GenericContentFields,
} from '@weco/common/model/generic-content-fields';
import {
  asText,
  parseTitle,
} from '@weco/common/services/prismic/parsers';
import { parseCollectionVenue } from '@weco/common/services/prismic/opening-times';
import { ImageType } from '@weco/common/model/image';
import { Body } from '../types/body';
import { isNotUndefined } from '@weco/common/utils/array';
import { transformPage } from './pages';
import { transformGuide } from './guides';
import { transformEventSeries } from './event-series';
import { transformExhibition } from './exhibitions';
import { transformArticle } from './articles';
import { transformEvent } from './events';
import { transformSeason } from './seasons';
import { transformCard } from './card';
import { MultiContentPrismicDocument } from '../types/multi-content';
import { GuidePrismicDocument } from '../types/guides';
import { SeasonPrismicDocument } from '../types/seasons';
import { CardPrismicDocument } from '../types/card';
import {
  getWeight,
  transformContactSlice,
  transformDeprecatedImageListSlice,
  transformDiscussionSlice,
  transformEditorialImageGallerySlice,
  transformEditorialImageSlice,
  transformGifVideoSlice,
  transformMediaObjectListSlice,
  transformTableSlice,
  transformTitledTextListSlice,
} from './body';
import { transformImage, transformImagePromo } from './images';
import { Tasl } from '@weco/common/model/tasl';

import { LicenseType, licenseTypeArray } from '@weco/common/model/license';
import { HTMLString } from '@weco/common/services/prismic/types';

type Meta = {
  title: string;
  type: 'website' | 'article' | 'book' | 'profile' | 'video' | 'music';
  url: string;
  description?: string;
  promoText?: string;
  image?: Image;
};

type Doc = PrismicDocument<CommonPrismicFields>;

export function transformMeta(doc: Doc): Meta {
  const promo = transformPromo(doc);

  return {
    title: transformRichTextFieldToString(doc.data.title) ?? '',
    type: 'website',
    // We use `||` over `??` as we want empty strigs to revert to undefined
    description: doc.data.metadataDescription || undefined,
    promoText:
      transformRichTextFieldToString(promo?.caption ?? []) || undefined,
    image: promo?.image,
    url: linkResolver(doc) || '',
  };
}

export function transformPromo(doc: Doc) {
  /**
   * this is a little bit annoying as we modelled this at a stage where Prismic was suggesting
   * "use slices for all the things!". Unfortunately it definitely wasn't made for this, and
   * we should have probably just had `.image` and `.description`.
   * We could reimport into these fields, but it would have to be the whole Prismic corpus,
   * and we aren't confident enough that it imports correctly.
   *
   * This method flattens out the `SliceZone` into just a Promo
   */

  // We have to explicitly set undefined here as we don't have the
  // `noUncheckedIndexedAccess` tsconfig compiler option set
  return doc.data?.promo?.[0]?.primary ?? undefined;
}

export function transformLabels(doc: Doc): Label[] {
  const typeLabels = {
    seasons: [{ text: 'Season' }],
  };

  const labels = typeLabels[doc.type];
  return labels ?? [];
}

export function transformSeries(document: PrismicDocument<WithSeries>) {
  return document.data.series
    .map(({ series }) => series)
    .filter(isFilledLinkToDocumentWithData);
}

export function transformFormat(document: PrismicDocument<WithArticleFormat>) {
  const { format } = document.data;

  if (isFilledLinkToDocumentWithData(format) && format.data) {
    return format;
  }
}

// This is to avoid introducing nulls into our codebase
export function transformKeyTextField(field: KeyTextField) {
  return field ?? undefined;
}

export function transformTimestamp(field: TimestampField): Date | undefined {
  return prismicH.asDate(field) || undefined;
}

// Prismic often returns empty RichText fields as `[]`, this filters them out
export function transformRichTextField(
  field: RichTextField
): HTMLString | undefined {
  return field && field.length > 0 ? (field as HTMLString) : undefined;
}

export function asHtml(field?: RichTextField): string | undefined {
  // Prismic can send us empty html elements which can lead to unwanted UI in templates.
  // Check that `asText` wouldn't return an empty string.
  const isEmpty = !field || (asText(field) || '').trim() === '';
  return isEmpty ? undefined : prismicH.asHTML(field).trim();
}

// Prismic return `[ { type: 'paragraph', text: '', spans: [] } ]` when you have
// inserted text, then removed it, so we need to do this check.
export function isStructuredText(field: RichTextField): boolean {
  const text = asText(field);
  return Boolean(field) && (text || '').trim() !== '';
}

export function transformStructuredText(
  field: RichTextField | undefined
): HTMLString | undefined {
  return field && isStructuredText(field) ? (field as HTMLString) : undefined;
}

// We have to use this annoyingly often as right at the beginning of the project
// we created titles as `RichTextField`s.
export function transformRichTextFieldToString(field: RichTextField) {
  return field && field.length > 0 ? prismicH.asText(field) : undefined;
}

export function transformLink(link?: LinkField<string, string, any>): string | undefined {
  if (link) {
    if (isFilledLinkToWebField(link) || isFilledLinkToMediaField(link)) {
      return link.url;
    } else if (isFilledLinkToDocumentWithData(link)) {
      return linkResolver({ id: link.id, type: link.type });
    }
  }
}

type PromoImage = {
  image?: ImageType;
  squareImage?: ImageType;
  widescreenImage?: ImageType;
  superWidescreenImage?: ImageType;
};

// TODO: Consider moving this into a dedicated file for body transformers.
// TODO: Rather than doing transformation inline, have this function consistently
// call out to other transformer functions (a la contentList).
// See https://github.com/wellcomecollection/wellcomecollection.org/pull/7679/files#r811138079
export function transformBody(body: Body): BodyType {
  return body
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
          return transformEditorialImageSlice(slice);

        case 'editorialImageGallery':
          return transformEditorialImageGallerySlice(slice);

        case 'titledTextList':
          return transformTitledTextListSlice(slice);

        case 'contentList':
          type ContentListPrismicDocument =
            | MultiContentPrismicDocument
            | GuidePrismicDocument
            | SeasonPrismicDocument
            | CardPrismicDocument;

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
                      return transformEvent(content);
                    case 'seasons':
                      return transformSeason(content);
                    case 'card':
                      return transformCard(content);
                  }
                })
                .filter(Boolean),
            },
          };

        case 'collectionVenue':
          return isFilledLinkToDocumentWithData(slice.primary.content)
            ? {
                type: 'collectionVenue',
                weight: getWeight(slice.slice_label),
                value: {
                  content: parseCollectionVenue(slice.primary.content),
                  showClosingTimes: slice.primary.showClosingTimes,
                },
              }
            : undefined;

        case 'searchResults':
          return {
            type: 'searchResults',
            weight: getWeight(slice.slice_label),
            value: {
              title: asText(slice.primary.title),
              query: slice.primary.query,
              // TODO: The untyped version of this code had `slice.primary.pageSize`, but
              // there's no such field on the Prismic model.  Should it be on the model?
              // Does it matter?  Investigate further.
              pageSize: 4,
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
              image: transformImage(slice.primary.previewImage),
            },
          };

        case 'gifVideo':
          return transformGifVideoSlice(slice);

        case 'contact':
          return transformContactSlice(slice);

        case 'embed':
          const embed = slice.primary.embed;

          if (embed.provider_name === 'Vimeo') {
            const embedUrl = slice.primary.embed.html?.match(
              /src="([-a-zA-Z0-9://.?=_]+)?/
            )![1];

            return {
              type: 'videoEmbed',
              weight: getWeight(slice.slice_label),
              value: {
                embedUrl: `${embedUrl}?rel=0&dnt=1`,
                caption: slice.primary.caption,
              },
            };
          }

          if (embed.provider_name === 'SoundCloud') {
            const apiUrl = embed.html!.match(/url=([^&]*)&/)!;
            const secretToken = embed.html!.match(/secret_token=([^"]*)"/);
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
            // The embed will be a blob of HTML of the form
            //
            //    <iframe src=\"https://www.youtube.com/embed/RTlA8X0EJ7w...\" ...></iframe>
            //
            // We want to add the query parameter ?rel=0
            const embedUrl =
              slice.primary.embed.html!.match(/src="([^"]+)"?/)![1];

            const embedUrlWithEnhancedPrivacy = embedUrl.replace(
              'www.youtube.com',
              'www.youtube-nocookie.com'
            );

            const newEmbedUrl = embedUrl.includes('?')
              ? embedUrlWithEnhancedPrivacy.replace('?', '?rel=0&')
              : `${embedUrlWithEnhancedPrivacy}?rel=0`;

            return {
              type: 'videoEmbed',
              weight: getWeight(slice.slice_label),
              value: {
                embedUrl: newEmbedUrl,
                caption: slice.primary.caption,
              },
            };
          }
          break;

        case 'table':
          return transformTableSlice(slice);

        case 'infoBlock':
          return {
            type: 'infoBlock',
            value: {
              title: parseTitle(slice.primary.title),
              text: slice.primary.text,
              linkText: slice.primary.linkText,
              link: transformLink(slice.primary.link),
            },
          };

        case 'discussion':
          return transformDiscussionSlice(slice);

        case 'tagList':
          return {
            type: 'tagList',
            value: {
              title: parseTitle(slice.primary.title),
              tags: slice.items.map(item => ({
                textParts: [item.linkText],
                linkAttributes: {
                  href: { pathname: transformLink(item.link), query: '' },
                  as: { pathname: transformLink(item.link), query: '' },
                },
              })),
            },
          };

        // Deprecated
        case 'imageList':
          return transformDeprecatedImageListSlice(slice);

        case 'mediaObjectList':
          return transformMediaObjectListSlice(slice);
      }
    })
    .filter(isNotUndefined);
}

export function transformGenericFields(doc: Doc): GenericContentFields {
  const { data } = doc;
  const promo = data.promo && transformImagePromo(data.promo);

  const promoImage: PromoImage =
    data.promo && data.promo.length > 0
      ? data.promo
          .filter(slice => slice.primary.image)
          .map(({ primary: { image } }) => {
            return {
              image: transformImage(image),
              squareImage: transformImage(image.square),
              widescreenImage: transformImage(image['16:9']),
              superWidescreenImage: transformImage(image['32:15']),
            };
          })
          .find(_ => _) || {} // just get the first one;
      : {};

  const { image, squareImage, widescreenImage, superWidescreenImage } =
    promoImage;
  const body = data.body ? transformBody(data.body) : [];
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

export function transformTaslFromString(pipedString: string | null): Tasl {
  if (pipedString === null) {
    return { title: '' };
  }

  // We expect a string of title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink
  // e.g. Self|Rob Bidder|||CC-BY-NC
  try {
    const list = (pipedString || '').split('|');
    const v = list
      .concat(Array(7 - list.length))
      .map(v => (!v.trim() ? undefined : v.trim()));

    const [
      title,
      author,
      sourceName,
      sourceLink,
      maybeLicense,
      copyrightHolder,
      copyrightLink,
    ] = v;
    const license: LicenseType | undefined = licenseTypeArray.find(
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
    };
  }
}
