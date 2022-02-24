import { Book } from '../../../types/books';
import { BookPrismicDocument } from '../types/books';
import {
  transformGenericFields,
  transformKeyTextField,
  transformRichTextField,
  transformRichTextFieldToString,
  transformTimestamp,
} from '.';
import { isFilledLinkToWebField } from '../types';
import { parseSingleLevelGroup } from '@weco/common/services/prismic/parsers';
import { transformSeason } from './seasons';
import { transformPromoToCaptionedImage } from './images';

export function transformBook(document: BookPrismicDocument): Book {
  const { data } = document;

  const genericFields = transformGenericFields(document);
  // We do this over the general parser as we want the not 16:9 image.
  const cover =
    data.promo &&
    (data.promo.length > 0 ? transformPromoToCaptionedImage(data.promo) : undefined);
  const seasons = parseSingleLevelGroup(data.seasons, 'season').map(season => {
    return transformSeason(season);
  });

  return {
    type: 'books',
    ...genericFields,
    subtitle: transformRichTextFieldToString(data.subtitle),
    orderLink: isFilledLinkToWebField(data.orderLink)
      ? data.orderLink.url
      : undefined,
    price: transformKeyTextField(data.price),
    format: transformKeyTextField(data.format),
    extent: transformKeyTextField(data.extent),
    isbn: transformKeyTextField(data.isbn),
    reviews: data.reviews?.map(review => {
      return {
        text: review.text && transformRichTextField(review.text) || [],
        citation: review.citation && transformRichTextField(review.citation) || [],
      };
    }),
    datePublished: data.datePublished ? transformTimestamp(data.datePublished) : undefined,
    cover: cover && cover.image,
    seasons,
    prismicDocument: document,
  };
}
