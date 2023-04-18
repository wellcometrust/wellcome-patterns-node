import {
  CatalogueResultsList,
  ResultType,
} from '@weco/catalogue/services/wellcome/catalogue/types';
import { propsToQuery } from '@weco/common/utils/routes';
import { isString } from '@weco/common/utils/type-guards';
import {
  QueryProps,
  globalApiOptions,
  wellcomeApiQuery,
  WellcomeApiError,
} from '..';

export const rootUris = {
  prod: 'https://api.wellcomecollection.org/catalogue',
  stage: 'https://api-stage.wellcomecollection.org/catalogue',
};

export const notFound = (): WellcomeApiError => ({
  errorType: 'http',
  httpStatus: 404,
  label: 'Not Found',
  description: '',
  type: 'Error',
});

export async function catalogueQuery<Params, Result extends ResultType>(
  endpoint: string,
  { params, toggles, pageSize }: QueryProps<Params>
): Promise<CatalogueResultsList<Result> | WellcomeApiError> {
  const apiOptions = globalApiOptions(toggles);
  const extendedParams = {
    ...params,
    pageSize,
  };

  const searchParams = new URLSearchParams(
    propsToQuery(extendedParams)
  ).toString();

  const url = `${rootUris[apiOptions.env]}/v2/${endpoint}?${searchParams}`;

  return wellcomeApiQuery(url);
}

// Returns true if a string is plausibly a canonical ID, false otherwise.
//
// There's no way for the front-end to know what strings are valid canonical IDs
// (only the catalogue API knows that), but it can reject certain classes of
// strings that it knows definitely aren't.
//
// e.g. any non-alphanumeric string definitely isn't a canonical ID.
//
// This is useful for rejecting queries that are obviously malformed, which might
// be attempts to inject malicious data into API queries.
export const looksLikeCanonicalId = (
  id: string | string[] | undefined
): id is string => {
  return isString(id) && /^([a-z0-9]+)$/.test(id);
};