import { Content } from './types/api';
import {
  ContentApiError,
  ContentResultsList,
  ContentApiProps,
} from '@weco/catalogue/services/wellcome/content/types';
import { contentQuery } from '.';
import { QueryProps } from '..';

export async function getArticles(
  props: QueryProps<ContentApiProps>
): Promise<ContentResultsList<Content> | ContentApiError> {
  const getArticlesResult = await contentQuery('articles', props);

  return getArticlesResult;
}
