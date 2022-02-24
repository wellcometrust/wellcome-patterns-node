import {
  Exhibition,
  ExhibitionRelatedContent,
} from '../../../types/exhibitions';
import {
  ExhibitionPrismicDocument,
  ExhibitionRelatedContentPrismicDocument,
  ExhibitionFormat as ExhibitionFormatPrismicDocument,
} from '../types/exhibitions';
import { Query } from '@prismicio/types';
import { PaginatedResults } from '@weco/common/services/prismic/types';
import { transformQuery } from './paginated-results';
import { london } from '@weco/common/utils/format-date';
import { transformMultiContent } from './multi-content';
import {
  asText,
  parseSingleLevelGroup,
  parseTitle,
} from '@weco/common/services/prismic/parsers';
import { link } from './vendored-helpers';
import { parseResourceTypeList } from '@weco/common/services/prismic/exhibitions';
import { asHtml, transformGenericFields, transformRichTextField, transformTimestamp } from '.';
import { transformSeason } from './seasons';
import { transformPlace } from './places';
import { transformImagePromo, transformPromoToCaptionedImage } from './images';
import { isNotUndefined } from '@weco/common/utils/array';
import { isFilledLinkToDocumentWithData } from '../types';
import { ExhibitionFormat } from '@weco/common/model/exhibitions';

function transformExhibitionFormat(
  format: ExhibitionFormatPrismicDocument
): ExhibitionFormat {
  return {
    id: format.id,
    title: (format.data && asText(format.data.title)) || '',
    description: format.data && asHtml(format.data.description),
  };
}

export function transformExhibition(
  document: ExhibitionPrismicDocument
): Exhibition {
  const genericFields = transformGenericFields(document);
  const data = document.data;
  const promo = data.promo;
  const exhibitIds = data.exhibits
    ? data.exhibits.map(i => link(i.item) && i.item.id)
    : [];
  const eventIds = data.events
    ? data.events.map(i => link(i.item) && i.item.id)
    : [];
  const articleIds = data.articles
    ? data.articles.map(i => link(i.item) && i.item.id)
    : [];
  const relatedIds = [...exhibitIds, ...eventIds, ...articleIds].filter(
    Boolean
  ) as string[];
  const promoThin = promo && transformImagePromo(promo, '32:15');
  const promoSquare = promo && transformImagePromo(promo, 'square');

  const promos = [promoThin, promoSquare]
    .map(p => p?.image)
    .filter(isNotUndefined);

  const id = document.id;

  // TODO: Work out how to get this to type check without the 'as any'.
  const format = isFilledLinkToDocumentWithData(data.format)
    ? transformExhibitionFormat(data.format as any)
    : undefined;

  const url = `/exhibitions/${id}`;
  const title = parseTitle(data.title);
  const start = transformTimestamp(data.start)!;
  const end = data.end ? transformTimestamp(data.end) : undefined;
  const statusOverride = asText(data.statusOverride);
  const bslInfo = transformRichTextField(data.bslInfo);
  const audioDescriptionInfo = transformRichTextField(data.audioDescriptionInfo);

  const promoCrop = '16:9';
  const promoImage =
    promo && promo.length > 0
      ? transformPromoToCaptionedImage(data.promo, promoCrop)
      : undefined;

  const seasons = parseSingleLevelGroup(data.seasons, 'season').map(season => {
    return transformSeason(season);
  });

  const exhibits = parseSingleLevelGroup(data.exhibits, 'item').map(item => {
    return {
      exhibitType: 'exhibitions',
      item: transformExhibition(item),
    };
  });

  const place = isFilledLinkToDocumentWithData(data.place)
    ? transformPlace(data.place)
    : undefined;

  const exhibition = {
    ...genericFields,
    shortTitle: data.shortTitle && asText(data.shortTitle),
    format,
    start,
    end,
    isPermanent: data.isPermanent === 'yes',
    statusOverride,
    bslInfo,
    audioDescriptionInfo,
    place,
    exhibits,
    promo: promoImage && {
      id,
      format,
      url,
      title,
      shortTitle: data.shortTitle && asText(data.shortTitle),
      image: promoImage && promoImage.image,
      squareImage: promoSquare && promoSquare.image,
      start,
      end,
      statusOverride,
    },
    featuredImageList: promos,
    resources: Array.isArray(data.resources)
      ? parseResourceTypeList(data.resources, 'resource')
      : [],
    relatedIds,
    seasons,
    prismicDocument: document,
  };

  const labels = exhibition.isPermanent
    ? [
        {
          text: 'Permanent exhibition',
        },
      ]
    : exhibition.format
    ? [
        {
          text: exhibition.format.title,
        },
      ]
    : [{ text: 'Exhibition' }];

  return { ...exhibition, type: 'exhibitions', labels };
}

export function transformExhibitionsQuery(
  query: Query<ExhibitionPrismicDocument>
): PaginatedResults<Exhibition> {
  const paginatedResult = transformQuery(query, transformExhibition);

  return {
    ...paginatedResult,
    results: putPermanentAfterCurrentExhibitions(paginatedResult.results),
  };
}

function putPermanentAfterCurrentExhibitions(
  exhibitions: Exhibition[]
): Exhibition[] {
  // We order the list this way as, from a user's perspective, seeing the
  // temporary exhibitions is more urgent, so they're at the front of the list,
  // but there's no good way to express that ordering through Prismic's ordering
  const groupedResults = exhibitions.reduce(
    (acc, result) => {
      // Wishing there was `groupBy`.
      if (result.isPermanent) {
        acc.permanent.push(result);
      } else if (london(result.start).isAfter(london())) {
        acc.comingUp.push(result);
      } else if (result.end && london(result.end).isBefore(london())) {
        acc.past.push(result);
      } else {
        acc.current.push(result);
      }

      return acc;
    },
    {
      current: [] as Exhibition[],
      permanent: [] as Exhibition[],
      comingUp: [] as Exhibition[],
      past: [] as Exhibition[],
    }
  );

  return [
    ...groupedResults.current,
    ...groupedResults.permanent,
    ...groupedResults.comingUp,
    ...groupedResults.past,
  ];
}

export const transformExhibitionRelatedContent = (
  query: Query<ExhibitionRelatedContentPrismicDocument>
): ExhibitionRelatedContent => {
  const parsedContent = transformQuery(
    query,
    transformMultiContent
  ).results.filter(doc => {
    return !(doc.type === 'events' && doc.isPast);
  });

  return {
    exhibitionOfs: parsedContent.filter(
      doc => doc.type === 'exhibitions' || doc.type === 'events'
    ),
    exhibitionAbouts: parsedContent.filter(
      doc => doc.type === 'books' || doc.type === 'articles'
    ),
  } as ExhibitionRelatedContent;
};
