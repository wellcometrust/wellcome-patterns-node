import {
  PrismicDocument,
  KeyTextField,
  RichTextField,
  GroupField,
} from '@prismicio/types';
import { Image } from '.';

/**
 * Odd name but we've used it since the start, and never been able to change it
 * as renaming types in Prismic is impossible.
 * See {@link https://community.prismic.io/t/import-export-change-type-of-imported-document/7814}
 */
const editorialContributorRoleType = 'editorial-contributor-roles';
export type EditorialContributorRole = PrismicDocument<
  {
    title: RichTextField;
    describedBy: KeyTextField;
  },
  typeof editorialContributorRoleType
>;

const personType = 'people';
export type Person = PrismicDocument<
  {
    name: KeyTextField;
    description: RichTextField;
    pronouns: KeyTextField;
    image: Image;
    sameAs: GroupField<{
      link: KeyTextField;
      title: RichTextField;
    }>;
  },
  typeof personType
>;

const organisationType = 'organisations';
export type Organisation = PrismicDocument<
  {
    name: RichTextField;
    description: RichTextField;
    image: Image;
    sameAs: GroupField<{
      link: KeyTextField;
      title: KeyTextField;
    }>;
  },
  typeof organisationType
>;
