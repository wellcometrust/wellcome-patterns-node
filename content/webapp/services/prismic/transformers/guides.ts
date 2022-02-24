import { Format as DeprecatedFormat } from '@weco/common/model/format';
import { Guide, GuideFormat } from '../../../types/guides';
import {
  GuidePrismicDocument,
  GuideFormatPrismicDocument,
} from '../types/guides';
import {
  parseTitle,
  parseOnThisPage,
} from '@weco/common/services/prismic/parsers';
import { asHtml, transformFormat, transformGenericFields, transformTimestamp } from '.';
import { links as headerLinks } from '@weco/common/views/components/Header/Header';

export function transformGuide(document: GuidePrismicDocument): Guide {
  const { data } = document;
  const genericFields = transformGenericFields(document);

  // TODO (tagging): This is just for now, we will be implementing a proper site tagging
  // strategy for this later
  const siteSections = headerLinks.map(link => link.siteSection);
  const siteSection = document.tags.find(tag => siteSections.includes(tag));

  const promo = genericFields.promo;
  return {
    type: 'guides',
    format: transformFormat(document),
    ...genericFields,
    onThisPage: data.body ? parseOnThisPage(data.body) : [],
    showOnThisPage: data.showOnThisPage || false,
    promo: promo && promo.image ? promo : undefined,
    datePublished: data.datePublished ? transformTimestamp(data.datePublished) : undefined,
    siteSection: siteSection,
    prismicDocument: document,
  };
}

export function transformGuideFormat(
  document: GuideFormatPrismicDocument
): GuideFormat {
  const format: DeprecatedFormat = {
    id: document.id,
    title: parseTitle(document.data.title),
    description: asHtml(document.data.description),
  };

  return {
    ...format,
    prismicDocument: document,
  };
}
