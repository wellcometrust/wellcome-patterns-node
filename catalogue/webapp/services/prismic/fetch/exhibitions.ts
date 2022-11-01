import { PrismicResultsList, PrismicApiError } from '../types/index';
import { Exhibition } from '../types/exhibition';
import { prismicGraphQLClient, prismicApiError } from '.';
import { transformStories } from '../transformers/articles';
import { gql } from 'graphql-request';

export type PrismicQueryProps = {
  query?: string | string[];
  pageSize?: number;
};

export async function getExhibitions({
  query,
  pageSize,
}: PrismicQueryProps): Promise<
  PrismicResultsList<Exhibition> | PrismicApiError
> {
  const graphQuery = gql`query {
    allExhibitionss(fulltext: "${query}" sortBy: title_ASC first: ${pageSize}) {
      edges {
        node {
          title
          _meta { id, lastPublicationDate }
          contributors {
            contributor {
              ...on People {
                name
              }
            }
          }
          body {
            ...on ExhibitionsBodyStandfirst {
              primary {
                text
              }
            }
          }
          promo {
            ...on ExhibitionsPromoEditorialimage {
              primary {
                image
                link
                caption
              }
            }
          }
        }
      }
    }
  }`;
  try {
    const res = await prismicGraphQLClient(graphQuery);
    const { allExhibitionss } = await res;
    const exhibitions = await transformStories(allExhibitionss);
    return {
      type: 'ResultList',
      results: exhibitions,
      totalResults: exhibitions.length,
    };
  } catch (error) {
    console.log(error);
    return prismicApiError();
  }
}
