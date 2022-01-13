import searchQueryParser from 'search-query-parser';
import { getMultiContent } from './multi-content';

export type StructuredSearchQuery = {
  types: string[];
  type: string[];
  ids: string[];
  id: string[];
  tags: string[];
  tag: string[];
  pageSize: number;
  orderings: string[];
  // content type specific
  'article-series': string[];
};

export async function search(req: Request | undefined, stringQuery: string) {
  const query = parseQuery(stringQuery);
  return getMultiContent(req, query);
}

// TODO:
// * free text search
// * excludes
export function parseQuery(query: string): StructuredSearchQuery {
  const structuredQuery = searchQueryParser.parse(query, {
    keywords: [
      'types',
      'type',
      'ids',
      'id',
      'tags',
      'tag',
      'pageSize',
      'orderings',
      // content type specific
      'article-series',
    ],
  });
  const arrayedStructuredQuery = Object.keys(structuredQuery).reduce(
    (acc, key) => {
      const value = structuredQuery[key];
      if (typeof value === 'string') {
        acc[key] = [value];
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  ) as StructuredSearchQuery;

  return {
    types: arrayedStructuredQuery.types || [],
    type: arrayedStructuredQuery.type || [],
    ids: arrayedStructuredQuery.ids || [],
    id: arrayedStructuredQuery.id || [],
    tags: arrayedStructuredQuery.tags || [],
    tag: arrayedStructuredQuery.tag || [],
    orderings: arrayedStructuredQuery.orderings || [],
    pageSize: arrayedStructuredQuery.pageSize,
    'article-series': arrayedStructuredQuery['article-series'] || [],
  };
}
