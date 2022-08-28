import { CatalogueApiError, Concept } from '@weco/common/model/catalogue';
import { CatalogueResultsList } from '../../model/catalogue';
import { CatalogueConceptsApiProps } from '@weco/common/services/catalogue/api';
import { Toggles } from '@weco/toggles';
import {
  catalogueApiError,
  catalogueFetch,
  catalogueQuery,
  globalApiOptions,
  looksLikeCanonicalId,
  notFound,
  QueryProps,
  rootUris,
} from '.';

type GetConceptProps = {
  id: string;
  toggles: Toggles;
};

type ConceptResponse = Concept | CatalogueApiError;

export async function getConcept({
  id,
  toggles,
}: GetConceptProps): Promise<ConceptResponse> {
  if (!looksLikeCanonicalId(id)) {
    return notFound();
  }

  const apiOptions = globalApiOptions(toggles);

  const url = `${rootUris[apiOptions.env]}/v2/concepts/${id}`;

  const res = await catalogueFetch(url, { redirect: 'manual' });

  // TODO: If we ever do redirects in the concepts API, support it here

  if (res.status === 404) {
    return notFound();
  }

  try {
    return await res.json();
  } catch (e) {
    return catalogueApiError();
  }
}

export async function getConcepts(
  props: QueryProps<CatalogueConceptsApiProps>
): Promise<CatalogueResultsList<Concept> | CatalogueApiError> {
  return catalogueQuery('concepts', props);
}
