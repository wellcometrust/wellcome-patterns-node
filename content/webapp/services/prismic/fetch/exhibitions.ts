import {
  clientSideFetcher,
  fetcher,
  fetchFromClientSide,
  GetServerSidePropsPrismicClient,
} from '.';
import {
  ExhibitionPrismicDocument,
  ExhibitionRelatedContentPrismicDocument,
} from '../types/exhibitions';
import { Query } from '@prismicio/client';
import { fetchPages } from './pages';
import * as prismic from '@prismicio/client';
import { PagePrismicDocument } from '../types/pages';
import {
  eventAccessOptionsFields,
  exhibitionResourcesFields,
} from '../fetch-links';
import { Period } from '../../../types/periods';
import { getExhibitionPeriodPredicates } from '../types/predicates';
import {
  Exhibition,
  ExhibitionRelatedContent,
} from '../../../types/exhibitions';
import {
  articleFormatsFetchLinks,
  contributorFetchLinks,
  eventSeriesFetchLinks,
  exhibitionFormatsFetchLinks,
  exhibitionsFetchLinks,
  seasonsFetchLinks,
} from '../types';
import { placesFetchLinks } from '../types/places';
import { teamsFetchLinks } from '../types/teams';
import {
  audienceFetchLinks,
  eventFormatFetchLinks,
  eventPolicyFetchLinks,
  eventsFetchLinks,
  interpretationTypeFetchLinks,
} from '../types/events';
import { seriesFetchLinks } from '../types/series';
import { articlesFetchLinks } from '../types/articles';

const fetchLinks = [
  ...exhibitionFormatsFetchLinks,
  ...exhibitionsFetchLinks,
  ...contributorFetchLinks,
  ...placesFetchLinks,
  ...exhibitionResourcesFields,
  ...eventSeriesFetchLinks,
  ...articlesFetchLinks,
  ...eventsFetchLinks,
  ...seasonsFetchLinks,
];

const exhibitionsFetcher = fetcher<ExhibitionPrismicDocument>(
  'exhibitions',
  fetchLinks
);

export type FetchExhibitionResult = {
  exhibition?: ExhibitionPrismicDocument;
  pages: Query<PagePrismicDocument>;
};

export async function fetchExhibition(
  client: GetServerSidePropsPrismicClient,
  id: string
): Promise<FetchExhibitionResult> {
  const exhibitionPromise = exhibitionsFetcher.getById(client, id);
  const pageQueryPromise = fetchPages(client, {
    predicates: [prismic.predicate.at('my.pages.parents.parent', id)],
  });

  const [exhibition, pages] = await Promise.all([
    exhibitionPromise,
    pageQueryPromise,
  ]);

  return {
    exhibition,
    pages,
  };
}

const startField = 'my.exhibitions.start';
const endField = 'my.exhibitions.end';

type Order = 'desc' | 'asc';
type GetExhibitionsProps = {
  predicates?: string[];
  order?: Order;
  period?: Period;
  page?: number;
};

export const fetchExhibitions = (
  client: GetServerSidePropsPrismicClient,
  {
    predicates = [],
    order = 'desc',
    period,
    page = 1,
  }: GetExhibitionsProps = {}
): Promise<Query<ExhibitionPrismicDocument>> => {
  const orderings: prismic.Ordering[] = [
    { field: 'my.exhibitions.isPermament', direction: 'desc' },
    { field: endField, direction: order },
  ];

  const periodPredicates = period
    ? getExhibitionPeriodPredicates({ period, startField, endField })
    : [];

  return exhibitionsFetcher.getByType(client, {
    predicates: [...predicates, ...periodPredicates],
    orderings,
    page,
  });
};

const fetchExhibitionsClientSide =
  clientSideFetcher<Exhibition>('exhibitions').getByTypeClientSide;

export const fetchExhibitExhibition = async (
  exhibitId: string
): Promise<Exhibition | undefined> => {
  const predicates = [
    prismic.predicate.at('my.exhibitions.exhibits.item', exhibitId),
  ];

  const response = await fetchExhibitionsClientSide({ predicates });

  return response && response.results.length > 0
    ? response.results[0]
    : undefined;
};

export const fetchExhibitionRelatedContent = async (
  { client }: GetServerSidePropsPrismicClient,
  ids: string[]
): Promise<Query<ExhibitionRelatedContentPrismicDocument>> => {
  const fetchLinks = [
    ...eventAccessOptionsFields,
    ...teamsFetchLinks,
    ...eventFormatFetchLinks,
    ...placesFetchLinks,
    ...interpretationTypeFetchLinks,
    ...audienceFetchLinks,
    ...contributorFetchLinks,
    ...eventSeriesFetchLinks,
    ...eventPolicyFetchLinks,
    ...seriesFetchLinks,
    ...articleFormatsFetchLinks,
    ...exhibitionFormatsFetchLinks,
    ...exhibitionsFetchLinks,
    ...articlesFetchLinks,
  ];

  return client.getByIDs<ExhibitionRelatedContentPrismicDocument>(ids, {
    fetchLinks,
  });
};

export const fetchExhibitionRelatedContentClientSide = async (
  ids: string[]
): Promise<ExhibitionRelatedContent | undefined> => {
  return fetchFromClientSide<ExhibitionRelatedContent>({
    endpoint: 'exhibitions-related-content',
    params: ids,
  });
};
