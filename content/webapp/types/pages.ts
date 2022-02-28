import { Page as DeprecatedPage } from '@weco/common/model/pages';
import { Override } from '@weco/common/utils/utility-types';
import { Contributor } from './contributors';

export type Page = Override<
  DeprecatedPage,
  {
    contributors: Contributor[];
  }
>;
