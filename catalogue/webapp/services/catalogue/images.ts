import { CatalogueApiError, Image } from '@weco/common/model/catalogue';
import { CatalogueResultsList } from '../../model/catalogue';
import { CatalogueImagesApiProps } from '@weco/common/services/catalogue/api';
import {
  rootUris,
  globalApiOptions,
  catalogueApiError,
  notFound,
  looksLikeCanonicalId,
  catalogueFetch,
  catalogueQuery,
  QueryProps,
} from '.';
import { Toggles } from '@weco/toggles';
import { propsToQuery } from '@weco/common/utils/routes';

type ImageInclude =
  | 'visuallySimilar'
  | 'withSimilarColors'
  | 'withSimilarFeatures'
  | 'source.contributors'
  | 'source.languages'
  | 'source.subjects';

type GetImageProps = {
  id: string;
  toggles: Toggles;
  include?: ImageInclude[];
};

export async function getImages(
  props: QueryProps<CatalogueImagesApiProps>
): Promise<CatalogueResultsList<Image> | CatalogueApiError> {
  return catalogueQuery('images', props);
}

export async function getImage({
  id,
  toggles,
  include = [],
}: GetImageProps): Promise<Image | CatalogueApiError> {
  if (!looksLikeCanonicalId(id)) {
    return notFound();
  }

  const apiOptions = globalApiOptions(toggles);

  const params = {
    include,
  };

  const searchParams = new URLSearchParams(propsToQuery(params));

  const url = `${
    rootUris[apiOptions.env]
  }/v2/images/${id}?${searchParams.toString()}`;

  const res = await catalogueFetch(url);

  if (res.status === 404) {
    return notFound();
  }

  try {
    return await res.json();
  } catch (e) {
    return catalogueApiError();
  }
}
