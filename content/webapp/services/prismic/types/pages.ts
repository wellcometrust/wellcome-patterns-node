import {
  TimestampField,
  PrismicDocument,
  RelationField,
  RichTextField,
  BooleanField,
} from '@prismicio/types';
import {
  CommonPrismicFields,
  InferDataInterface,
  WithContributors,
  WithExhibitionParents,
  WithSeasons,
} from '.';

const typeEnum = 'pages';

type PageFormat = PrismicDocument<
  {
    title: RichTextField;
    description: RichTextField;
  },
  'page-formats'
>;

export type WithPageFormat = {
  format: RelationField<
    'page-formats',
    'en-gb',
    InferDataInterface<PageFormat>
  >;
};

export type PagePrismicDocument = PrismicDocument<
  {
    datePublished: TimestampField;
    isOnline: BooleanField;
    availableOnline: BooleanField;
    showOnThisPage: BooleanField;
  } & WithContributors &
    WithExhibitionParents &
    WithSeasons &
    WithPageFormat &
    CommonPrismicFields,
  typeof typeEnum
>;
