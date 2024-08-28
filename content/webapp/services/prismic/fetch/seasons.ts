import { GetServerSidePropsPrismicClient, fetcher } from '.';
import { SeasonsDocument as RawSeasonsDocument } from '@weco/common/prismicio-types';

const fetchLinks = [];

const seasonsFetcher = fetcher<RawSeasonsDocument>('seasons', fetchLinks);

export const fetchSeasons = seasonsFetcher.getByType;

export const fetchSeason = async (
  client: GetServerSidePropsPrismicClient,
  id: string
): Promise<RawSeasonsDocument | undefined> => {
  // TODO once redirects are in place we should only fetch by uid
  const seasonDocumentById = await seasonsFetcher.getById(client, id);
  const seasonDocumentByUID = await seasonsFetcher.getByUid(client, id);

  return seasonDocumentById || seasonDocumentByUID;
};
