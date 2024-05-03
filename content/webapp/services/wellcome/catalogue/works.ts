import {
  CatalogueApiRedirect,
  CatalogueResultsList,
  CatalogueWorksApiProps,
  ItemsList,
  Work,
} from './types';
import { looksLikeCanonicalId, rootUris, notFound, catalogueQuery } from '.';
import { Toggles } from '@weco/toggles';
import { propsToQuery } from '@weco/common/utils/routes';
import {
  emptyWorksProps,
  toQuery,
  WorksProps,
} from '@weco/content/components/SearchPagesLink/Works';
import {
  QueryProps,
  globalApiOptions,
  wellcomeApiError,
  wellcomeApiFetch,
  WellcomeApiError,
} from '..';
import { toIsoDateString } from '@weco/content/services/wellcome/catalogue/index';

type GetWorkProps = {
  id: string;
  toggles: Toggles;
  include?: string[];
};

const worksIncludes = ['production', 'contributors', 'partOf'];

const workIncludes = [
  'identifiers',
  'images',
  'items',
  'subjects',
  'genres',
  'contributors',
  'production',
  'notes',
  'formerFrequency',
  'designation',
  'parts',
  'partOf',
  'precededBy',
  'succeededBy',
  'languages',
  'holdings',
];

export const missingAltTextMessage =
  'No text description is available for this image';

const redirect = (id: string, status = 302): CatalogueApiRedirect => ({
  type: 'Redirect',
  redirectToId: id,
  status,
});

/** Run a query with the works API.
 *
 * Note: this method is responsible for encoding parameters in an API-compatible
 * way, e.g. wrapping strings in quotes.  Callers should pass in an unencoded
 * set of parameters.
 *
 * https://wellcomecollection.org/works?subjects.label=%22Thackrah%2C+Charles+Turner%2C+1795-1833%22
 */
export async function getWorks(
  props: QueryProps<CatalogueWorksApiProps>
): Promise<CatalogueResultsList<Work> | WellcomeApiError> {
  const params: WorksProps = {
    ...emptyWorksProps,
    ...props.params,
  };
  const query = toQuery(params);

  const extendedParams = {
    ...params,
    ...query,
    'production.dates.from': toIsoDateString(
      query['production.dates.from'] as string,
      'from'
    ),
    'production.dates.to': toIsoDateString(
      query['production.dates.to'] as string,
      'to'
    ),
    include: worksIncludes,
  };

  return catalogueQuery('works', {
    ...props,
    params: extendedParams,
  });
}

type WorkResponse =
  | (Work & { url: string })
  | WellcomeApiError
  | CatalogueApiRedirect;

export async function getWork({
  id,
  toggles,
  include = workIncludes,
}: GetWorkProps): Promise<WorkResponse> {
  if (!looksLikeCanonicalId(id)) {
    return notFound();
  }

  const apiOptions = globalApiOptions(toggles);

  const params = {
    include,
  };

  const searchParams = new URLSearchParams(propsToQuery(params)).toString();
  const url = `${rootUris[apiOptions.env]}/works/${id}?${searchParams}`;

  const res = await wellcomeApiFetch(url, { redirect: 'manual' });

  // When records from Miro have been merged with Sierra data, we redirect the
  // latter to the former. This would happen quietly on the API request, but we
  // would then have duplicates emerging, which wouldn't be useful for search
  // engines so we respect the redirect inside the catalogue webapp.

  // redirect: 'manual' returns the status code on the server only
  if (res.status === 301 || res.status === 302) {
    const location = res.headers.get('location');
    const id = location?.match(/works\/([^?].*)\?/)?.[1];
    return id ? redirect(id, res.status) : notFound();
  }

  // redirect: 'manual' returns an opaque response on the client only
  if (res.type === 'opaqueredirect') {
    const redirectedRes = await fetch(url, { redirect: 'follow' });
    const id = redirectedRes.url.match(/works\/([^?].*)\?/)?.[1];
    return id ? redirect(id, res.status) : notFound();
  }

  if (res.status === 404) {
    return notFound();
  }

  try {
    const work = (await res.json()) as Work;
    return { ...work, url };
  } catch (e) {
    return wellcomeApiError();
  }
}

export async function getWorkClientSide(workId: string): Promise<WorkResponse> {
  // passing credentials: 'same-origin' ensures we pass the cookies to
  // the API; in particular the toggle cookies
  const response = await fetch(`/api/works/${workId}`, {
    credentials: 'same-origin',
  });

  const resp = await response.json();

  if (resp.type === 'Redirect') {
    return getWorkClientSide(resp.redirectToId);
  } else {
    return resp;
  }
}

export async function getWorkItemsClientSide(
  workId: string,
  signal: AbortSignal | null
): Promise<ItemsList | WellcomeApiError> {
  // passing credentials: 'same-origin' ensures we pass the cookies to
  // the API; in particular the toggle cookies
  const response = await fetch(`/api/works/items/${workId}`, {
    signal,
    credentials: 'same-origin',
  });

  const items = await response.json();
  return items;
}
