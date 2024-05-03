import { CatalogueImagesApiProps, CatalogueResultsList, Image } from './types';
import { rootUris, notFound, looksLikeCanonicalId, catalogueQuery } from '.';
import { Toggles } from '@weco/toggles';
import { propsToQuery } from '@weco/common/utils/routes';
import {
  emptyImagesProps,
  ImagesProps,
  toQuery,
} from '@weco/content/components/SearchPagesLink/Images';
import {
  QueryProps,
  globalApiOptions,
  wellcomeApiError,
  wellcomeApiFetch,
  WellcomeApiError,
} from '..';
import { toIsoDateString } from '@weco/content/services/wellcome/catalogue/index';

type ImageInclude =
  | 'withSimilarFeatures'
  | 'source.contributors'
  | 'source.languages'
  | 'source.subjects';

type GetImageProps = {
  id: string;
  toggles: Toggles;
  include?: ImageInclude[];
};

/** Run a query with the images API.
 *
 * Note: this method is responsible for encoding parameters in an API-compatible
 * way, e.g. wrapping strings in quotes.  Callers should pass in an unencoded
 * set of parameters.
 *
 * https://wellcomecollection.org/images?source.subjects.label=%22Germany%2C+East%22
 */
export async function getImages(
  props: QueryProps<CatalogueImagesApiProps>
): Promise<CatalogueResultsList<Image> | WellcomeApiError> {
  const params: ImagesProps = {
    ...emptyImagesProps,
    ...props.params,
  };

  const query = toQuery(params);

  const extendedParams = {
    ...params,
    ...query,
    'source.production.dates.from': toIsoDateString(
      query['source.production.dates.from'] as string,
      'from'
    ),
    'source.production.dates.to': toIsoDateString(
      query['source.production.dates.to'] as string,
      'to'
    ),
  };

  return catalogueQuery('images', { ...props, params: extendedParams });
}

type ImageResponse = {
  url?: string;
  image: Image | WellcomeApiError;
};

export async function getImage({
  id,
  toggles,
  include = [],
}: GetImageProps): Promise<ImageResponse> {
  if (!looksLikeCanonicalId(id)) {
    return { image: notFound() };
  }

  const apiOptions = globalApiOptions(toggles);

  const params = {
    include,
  };

  const searchParams = new URLSearchParams(propsToQuery(params));

  const url = `${
    rootUris[apiOptions.env]
  }/images/${id}?${searchParams.toString()}`;

  const res = await wellcomeApiFetch(url);

  if (res.status === 404) {
    return { image: notFound() };
  }

  try {
    const image = await res.json();
    return { url, image: image as Image };
  } catch (e) {
    return { url, image: wellcomeApiError() };
  }
}
