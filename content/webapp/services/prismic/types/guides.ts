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

const typeEnum = 'guides';

export type GuideFormatPrismicDocument = PrismicDocument<
  {
    title: RichTextField;
    description: RichTextField;
  },
  'guide-formats'
>;

export type WithGuideFormat = {
  format: RelationField<
    'guide-formats',
    'en-gb',
    InferDataInterface<GuideFormatPrismicDocument>
  >;
};

export type GuidePrismicDocument = PrismicDocument<
  {
    datePublished: TimestampField;
    availableOnline: BooleanField;
    showOnThisPage: BooleanField;
  } & WithContributors &
    WithExhibitionParents &
    WithSeasons &
    WithGuideFormat &
    CommonPrismicFields,
  typeof typeEnum
>;
