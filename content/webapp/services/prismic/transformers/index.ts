import * as prismicH from 'prismic-helpers-beta';
import { PrismicDocument, KeyTextField, RichTextField } from '@prismicio/types';
import { Label } from '@weco/common/model/labels';
import { ArticlePrismicDocument, WithSeries } from '../types/articles';
import linkResolver, { ContentType } from '../link-resolver';
import {
  CommonPrismicFields,
  Image,
  isFilledLinkToDocumentWithData,
  WithArticleFormat,
} from '../types';
import type {
  AnyRegularField,
  FilledLinkToDocumentField,
  GroupField,
  RelationField,
  SliceZone,
} from '@prismicio/types';
import { link } from './vendored-helpers';
import {
  BodyType,
  GenericContentFields,
} from '@weco/common/model/generic-content-fields';
import {
  asText,
  checkAndParseImage,
  getWeight,
  parseCaptionedImage,
  parseImage,
  parseImagePromo,
  parseLink,
  parseMediaObjectList,
  parseRichText,
  parseStructuredText,
  parseTableCsv,
  parseTaslFromString,
  parseTeamToContact,
  parseTitle,
  parseTitledTextItem,
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
import { PagePrismicDocument } from '../types/pages';
import { GuidePrismicDocument } from '../types/guides';
import { EventSeriesPrismicDocument } from '../types/event-series';
import { ExhibitionPrismicDocument } from '../types/exhibitions';
import { EventPrismicDocument } from '../types/events';
import { SeasonPrismicDocument } from '../types/seasons';

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

// Prismic often returns empty RichText fields as `[]`, this filters them out
export function transformRichTextField(field: RichTextField) {
  return field && field.length > 0 ? field : undefined;
}

// We have to use this annoyingly often as right at the beginning of the project
// we created titles as `RichTextField`s.
export function transformRichTextFieldToString(field: RichTextField) {
  return field && field.length > 0 ? prismicH.asText(field) : undefined;
}

export const isDocumentLink = <
  TypeEnum = string,
  LangEnum = string,
  DataInterface extends Record<
    string,
    AnyRegularField | GroupField | SliceZone
  > = never
>(
  field: RelationField<TypeEnum, LangEnum, DataInterface> | undefined
): field is FilledLinkToDocumentField<TypeEnum, LangEnum, DataInterface> => {
  return Boolean(
    field && link(field) && field.isBroken === false && field.data
  );
};

type PromoImage = {
  image?: ImageType;
  squareImage?: ImageType;
  widescreenImage?: ImageType;
  superWidescreenImage?: ImageType;
};

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
              items: slice.items.map(item => parseCaptionedImage(item)),
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
          const contents: FilledLinkToDocumentField<
            ContentType,
            string,
            never
          >[] = slice.items
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
                      return transformPage(
                        content.data! as PagePrismicDocument
                      );
                    case 'guides':
                      return transformGuide(
                        content.data! as GuidePrismicDocument
                      );
                    case 'event-series':
                      return transformEventSeries(
                        content.data! as EventSeriesPrismicDocument
                      );
                    case 'exhibitions':
                      return transformExhibition(
                        content.data! as ExhibitionPrismicDocument
                      );
                    case 'articles':
                      return transformArticle(
                        content.data! as ArticlePrismicDocument
                      );
                    case 'events':
                      return transformEvent(
                        content.data! as EventPrismicDocument
                      );
                    case 'seasons':
                      return transformSeason(
                        content.data! as SeasonPrismicDocument
                      );
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
            // The embed will be a blob of HTML of the form
            //
            //    <iframe src=\"https://www.youtube.com/embed/RTlA8X0EJ7w...\" ...></iframe>
            //
            // We want to add the query parameter ?rel=0
            const embedUrl =
              slice.primary.embed.html.match(/src="([^"]+)"?/)[1];

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
    .filter(isNotUndefined);
}

export function transformGenericFields(doc: Doc): GenericContentFields {
  const { data } = doc;
  const promo = data.promo && parseImagePromo(data.promo);

  const promoImage: PromoImage =
    data.promo && data.promo.length > 0
      ? data.promo
          .filter(slice => slice.primary.image)
          .map(({ primary: { image } }) => {
            return {
              image: checkAndParseImage(image),
              squareImage: checkAndParseImage(image.square),
              widescreenImage: checkAndParseImage(image['16:9']),
              superWidescreenImage: checkAndParseImage(image['32:15']),
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
