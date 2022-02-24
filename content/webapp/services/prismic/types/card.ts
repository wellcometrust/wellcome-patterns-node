import {
  PrismicDocument,
  RichTextField,
  NumberField,
  LinkField,
  RelationField,
} from '@prismicio/types';
import {
  Image,
  CommonPrismicFields,
  InferDataInterface,
  WithContributors,
  WithExhibitionParents,
  WithSeasons,
} from '.';
import { EventFormat } from './events';
import { ArticleFormat } from './article-format';

type Label = {
  title: RichTextField;
  description: RichTextField;
};
const typeEnum = 'card';

export type WithCardFormat = {
  format: 
    | RelationField<
        'article-formats',
        'en-gb',
        InferDataInterface<ArticleFormat>
      >
    | RelationField<'event-formats', 'en-gb', InferDataInterface<EventFormat>>
    | RelationField<'labels', 'en-gb', InferDataInterface<Label>>;
};

export type CardPrismicDocument = PrismicDocument<
  {
    title: RichTextField;
    description: RichTextField;
    image: Image;
    link: LinkField;
    order: NumberField;
  } & WithContributors &
    WithExhibitionParents &
    WithSeasons &
    WithCardFormat &
    CommonPrismicFields,
  typeof typeEnum
>;
