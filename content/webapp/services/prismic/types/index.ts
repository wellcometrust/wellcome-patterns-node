import {
  FilledImageFieldImage,
  KeyTextField,
  RichTextField,
  Slice,
  SliceZone,
  PrismicDocument,
  AnyRegularField,
  GroupField,
  RelationField,
  FilledLinkToDocumentField,
  FilledLinkToWebField,
  NumberField,
  LinkField,
  LinkType,
  EmptyLinkField,
} from '@prismicio/types';
import { ArticleFormat } from './article-format';
import { ExhibitionFormat } from './exhibition-format';
import { ProjectFormat } from './project-format';
import { Body } from './body';
import { EditorialContributorRole, Organisation, Person } from './contributors';
import { EventSeriesPrismicDocument } from './event-series';
import { ExhibitionPrismicDocument } from './exhibitions';
import { SeasonPrismicDocument } from './seasons';
import { link } from '../transformers/vendored-helpers';
import { isNotUndefined } from '@weco/common/utils/array';

/**
 * This allows us to get the DataInterface from PrismicDocuments when we
 * Need them for `RelationField`s e.g.
 * type Doc = PrismicDocument<{ title: RichTextField }>
 * type DataInterface = InferDataInterface<Doc> // { title: RichTextField }
 * RelationField<'formats', 'en-gb', DataInterface>
 */
export type InferDataInterface<T> = T extends PrismicDocument<
  infer DataInterface
>
  ? DataInterface
  : never;

export type InferCustomType<T> = T extends PrismicDocument<
  unknown,
  infer CustomType
>
  ? CustomType
  : never;

/**
 * This converts
 * PrismicDocument<{ field1: string, field2: Image }, 'customType'> => ("customType.field1" | "customType.field2")[]
 *
 * If we wanted to ensure all the fields, you could use `UnionToTuple<FetchLinks<T>>` and remove the array type.
 *
 * Given that we use this mainly for fetching links, which is an incomplete list, this is better.
 */
export type FetchLinks<T extends PrismicDocument> = {
  [D in keyof InferDataInterface<T>]: D extends string
    ? `${InferCustomType<T>}.${D}`
    : never;
}[keyof InferDataInterface<T>][];

/**
 * This is a convenience type for what the generic DataInterface type extend in @prismicio/types
 */
export type DataInterface = Record<
  string,
  AnyRegularField | GroupField | SliceZone
>;

type Dimension = {
  width: number;
  height: number;
};

export type Crop = '32:15' | '16:9' | 'square';

// Currently the Prismic types only allow you to specify 1 image
type ThumbnailedImageField<Thumbnails extends Record<string, Dimension>> =
  FilledImageFieldImage & {
    [Property in keyof Thumbnails]?: FilledImageFieldImage;
  };

export type Image = ThumbnailedImageField<{
  '32:15': {
    width: 3200;
    height: 1500;
  };
  '16:9': {
    width: 3200;
    height: 1800;
  };
  square: {
    width: 3200;
    height: 3200;
  };
}>;

type Promo = { caption: RichTextField; image: Image; link: KeyTextField };
export type PromoSliceZone = SliceZone<Slice<'editorialImage', Promo>>;

export type CommonPrismicFields = {
  title: RichTextField;
  body: Body;
  promo: PromoSliceZone;
  metadataDescription: KeyTextField;
};
// We need these for links in the `contentList` slice
export const commonPrismicFieldsFetchLinks = [
  'pages',
  'event-series',
  'books',
  'events',
  'articles',
  'exhibitions',
  'series',
  'webcomic-series',
  'webcomics',
].flatMap(type => [`${type}.title`, `${type}.promo`]);

// These fields are shared amongst a lot of types, but not all

export type WithEventSeries = {
  series: GroupField<{
    series: RelationField<
      'series',
      'en-gb',
      InferDataInterface<EventSeriesPrismicDocument>
    >;
  }>;
};
export const eventSeriesFetchLink: FetchLinks<EventSeriesPrismicDocument> = [
  'event-series.title',
  'event-series.promo',
];

export type WithSeasons = {
  seasons: GroupField<{
    season: RelationField<
      'seasons',
      'en-gb',
      InferDataInterface<SeasonPrismicDocument>
    >;
  }>;
};
export const seasonsFetchLinks: FetchLinks<SeasonPrismicDocument> = [
  'seasons.title',
  'seasons.promo',
];

export type WithArticleFormat = {
  format: RelationField<
    'article-formats',
    'en-gb',
    InferDataInterface<ArticleFormat>
  >;
};
export const articleFormatsFetchLinks: FetchLinks<ArticleFormat> = [
  'article-formats.title',
  'article-formats.description',
];

export const exhibitionFormatsFetchLinks: FetchLinks<ExhibitionFormat> = [
  'exhibition-formats.title',
];

export const projectFormatsFetchLinks: FetchLinks<ProjectFormat> = [
  'project-formats.title',
];

export type WithExhibitionParents = {
  parents: GroupField<{
    order: NumberField;
    parent: RelationField<
      'exhibitions',
      InferDataInterface<ExhibitionPrismicDocument>
    >;
  }>;
};
export const exhibitionsFetchLinks: FetchLinks<ExhibitionPrismicDocument> = [
  'exhibitions.title',
  'exhibitions.promo',
  'exhibitions.shortTitle',
];

type Contributor =
  | EmptyLinkField<LinkType.Document>
  | FilledLinkToDocumentField<'people', 'en-gb', InferDataInterface<Person>>
  | FilledLinkToDocumentField<'organisations', 'en-gb', InferDataInterface<Organisation>>;

export type WithContributors = {
  contributorsTitle: RichTextField;
  contributors: GroupField<{
    role: RelationField<
      'editorial-contributor-roles',
      'en-gb',
      InferDataInterface<EditorialContributorRole>
    >;
    contributor: Contributor;
    description: RichTextField;
  }>;
};

type ContributorFetchLink = (
  | FetchLinks<EditorialContributorRole>[number]
  | FetchLinks<Person>[number]
  | FetchLinks<Organisation>[number]
)[];
export const contributorFetchLinks: ContributorFetchLink = [
  'editorial-contributor-roles.title',
  'editorial-contributor-roles.describedBy',
  'people.name',
  'people.description',
  'people.pronouns',
  'people.image',
  'people.sameAs',
  'organisations.name',
  'organisations.description',
  'organisations.image',
  'organisations.sameAs',
];

// Guards
export function isFilledLinkToDocumentWithData<T, L, D extends DataInterface>(
  field: RelationField<T, L, D> | undefined
): field is FilledLinkToDocumentField<T, L, D> & { data: DataInterface } {
  return (
    isNotUndefined(field) &&
    'id' in field &&
    field.isBroken === false &&
    'data' in field
  );
}

export function isFilledLinkToWebField(
  field: LinkField
): field is FilledLinkToWebField {
  return link(field) && field.link_type === 'Web' && 'url' in field;
}

export function isFilledLinkToMediaField(
  field: LinkField
): field is FilledLinkToWebField {
  return link(field) && field.link_type === 'Media' && 'url' in field;
}

export function isFilledLinkToPersonField(
  field: Contributor
): field is FilledLinkToDocumentField<'people', 'en-gb', InferDataInterface<Person>> & { data: Person } {
  return isFilledLinkToDocumentWithData(field) && field.type === 'people';
}

export function isFilledLinkToOrganisationField(
  field: Contributor
): field is FilledLinkToDocumentField<'organisations', 'en-gb', InferDataInterface<Organisation>> & { data: Organisation }  {
  return isFilledLinkToDocumentWithData(field) && field.type === 'organisations';
}
