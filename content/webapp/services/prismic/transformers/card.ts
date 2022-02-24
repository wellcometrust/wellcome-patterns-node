import { CardPrismicDocument } from '../types/card';
import {
  parseTitle,
  asText,
} from '@weco/common/services/prismic/parsers';
import { transformImage } from './images';
import { Card } from '@weco/common/model/card';
import { transformFormat, transformLink } from '.';

export function transformCard(document: CardPrismicDocument): Card {
  const { title, description, image, link } = document.data;

  return {
    type: 'card',
    title: parseTitle(title),
    format: transformFormat(document),
    description: asText(description),
    image: transformImage(image),
    link: transformLink(link),
  };
}
