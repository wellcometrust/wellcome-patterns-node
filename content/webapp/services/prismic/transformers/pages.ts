import { FeaturedText } from '@weco/common/model/text';
import { Page } from '../../../types/pages';
import { PagePrismicDocument } from '../types/pages';
import {
  parseOnThisPage,
  parseSingleLevelGroup,
} from '@weco/common/services/prismic/parsers';
import { links as headerLinks } from '@weco/common/views/components/Header/Header';
import { transformFormat, transformGenericFields, transformTimestamp } from '.';
import { transformSeason } from './seasons';

export function transformPage(document: PagePrismicDocument): Page {
  const { data } = document;
  const genericFields = transformGenericFields(document);
  const seasons = parseSingleLevelGroup(data.seasons, 'season').map(season => {
    return transformSeason(season);
  });
  const parentPages = parseSingleLevelGroup(data.parents, 'parent').map(
    (parent, index) => {
      return {
        ...transformPage(parent),
        order: data.parents[index].order,
        type: parent.type,
      };
    }
  );
  // TODO (tagging): This is just for now, we will be implementing a proper site tagging
  // strategy for this later
  const siteSections = headerLinks.map(link => link.siteSection);
  const siteSection = document.tags.find(tag => siteSections.includes(tag));

  const promo = genericFields.promo;
  return {
    type: 'pages',
    format: transformFormat(document),
    ...genericFields,
    seasons,
    parentPages,
    onThisPage: data.body ? parseOnThisPage(data.body) : [],
    showOnThisPage: data.showOnThisPage || false,
    promo: promo && promo.image ? promo : undefined,
    datePublished: data.datePublished ? transformTimestamp(data.datePublished) : undefined,
    siteSection: siteSection,
    prismicDocument: document,
  };
}

export const getPageFeaturedText = (page: Page): FeaturedText | undefined => {
  const filteredFeaturedText = page.body.filter(
    slice => slice.weight === 'featured'
  );
  if (filteredFeaturedText.length) {
    return filteredFeaturedText[0];
  }
};
