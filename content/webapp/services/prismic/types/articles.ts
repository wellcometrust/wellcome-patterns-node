import {
  LinkField,
  RichTextField,
  TimestampField,
  PrismicDocument,
  GroupField,
  RelationField,
} from '@prismicio/types';
import { SeriesPrismicDocument } from './series';
import {
  articleFormatsFetchLinks,
  contributorFetchLinks,
  CommonPrismicFields,
  commonPrismicFieldsFetchLinks,
  FetchLinks,
  InferDataInterface,
  WithArticleFormat,
  WithExhibitionParents,
  WithSeasons,
} from '.';

export type WithSeries = {
  series: GroupField<{
    series: RelationField<
      'series',
      'en-gb',
      InferDataInterface<SeriesPrismicDocument>
    >;
  }>;
};
export const seriesFetchLink: FetchLinks<SeriesPrismicDocument> = [
  'series.title',
  'series.promo',
];

export type ArticlePrismicDocument = PrismicDocument<
  {
    publishDate: TimestampField;
    outroResearchItem: LinkField;
    outroResearchLinkText: RichTextField;
    outroReadItem: LinkField;
    outroReadLinkText: RichTextField;
    outroVisitItem: LinkField;
    outroVisitLinkText: RichTextField;
  } & WithSeries &
    WithSeasons &
    WithArticleFormat &
    WithExhibitionParents &
    CommonPrismicFields,
  'articles' | 'webcomics'
>;

export const articlesFetchLinks = [
  ...commonPrismicFieldsFetchLinks,
  ...articleFormatsFetchLinks,
  ...contributorFetchLinks,
  ...seriesFetchLink,
];
