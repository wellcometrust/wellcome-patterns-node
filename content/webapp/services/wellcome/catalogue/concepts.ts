import {
  CatalogueConceptsApiProps,
  CatalogueResultsList,
  Concept,
} from './types';
import { Toggles } from '@weco/toggles';
import { catalogueQuery, looksLikeCanonicalId, notFound, rootUris } from '.';
import {
  QueryProps,
  globalApiOptions,
  wellcomeApiError,
  wellcomeApiFetch,
  WellcomeApiError,
} from '..';

type GetConceptProps = {
  id: string;
  toggles: Toggles;
};

type ConceptResponse = Concept | WellcomeApiError;

export async function getConcept({
  id,
  toggles,
}: GetConceptProps): Promise<ConceptResponse> {
  if (!looksLikeCanonicalId(id)) {
    return notFound();
  }

  const apiOptions = globalApiOptions(toggles);

  const url = `${rootUris[apiOptions.env]}/concepts/${id}`;

  const res = await wellcomeApiFetch(url, { redirect: 'manual' });

  // TODO: If we ever do redirects in the concepts API, support it here

  if (res.status === 404) {
    return notFound();
  }

  try {
    return (await res.json()) as Concept;
  } catch (e) {
    return wellcomeApiError();
  }
}

export async function getConcepts(
  props: QueryProps<CatalogueConceptsApiProps>
): Promise<CatalogueResultsList<Concept> | WellcomeApiError> {
  return catalogueQuery('concepts', props);
}
