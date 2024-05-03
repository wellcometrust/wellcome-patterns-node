import { NextApiRequest, NextApiResponse } from 'next';
import { ItemsList } from '@weco/content/services/wellcome/catalogue/types';
import { rootUris } from '@weco/content/services/wellcome/catalogue';
import { Toggles, TogglesResp } from '@weco/toggles';
import { getTogglesFromContext } from '@weco/common/server-data/toggles';
import { isString, isUndefined } from '@weco/common/utils/type-guards';
import {
  GlobalApiOptions,
  globalApiOptions,
  wellcomeApiError,
  WellcomeApiError,
} from '@weco/content/services/wellcome';

function getApiUrl(apiOptions: GlobalApiOptions, workId: string): string {
  return `${rootUris[apiOptions.env]}/works/${workId}/items`;
}

function getApiKey(apiOptions: GlobalApiOptions): string {
  const key =
    apiOptions.env === 'stage'
      ? process.env.items_api_key_stage
      : process.env.items_api_key_prod;

  if (isUndefined(key)) {
    console.warn('No API key provided for items API!');
    return '';
  }
  return key;
}

async function fetchWorkItems({
  workId,
  toggles,
}: {
  workId: string;
  toggles: Toggles;
}): Promise<ItemsList | WellcomeApiError> {
  const apiOptions = globalApiOptions(toggles);
  const apiUrl = getApiUrl(apiOptions, workId);
  try {
    const items = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getApiKey(apiOptions) || '',
      },
    }).then(resp => resp.json());
    return items;
  } catch (error) {
    return wellcomeApiError();
  }
}

const ItemsApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // As the only toggle we care about here for now is the stagingApi
  // this is a mega hack to get this working so we can remove toggles from the query
  // TODO : get toggles working here
  const togglesResp: TogglesResp = {
    toggles: [
      {
        id: 'stagingApi',
        title: 'Staging API',
        defaultValue: false,
        description: 'Use the staging catalogue API',
        type: 'permanent',
      },
    ],
    tests: [],
  };
  const toggles = getTogglesFromContext(togglesResp, { req });
  const { workId } = req.query;
  if (!isString(workId)) {
    res.status(404);
    return;
  }
  const response = await fetchWorkItems({
    toggles,
    workId,
  });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // we are forcing revalidation at all times because this is to do with item availability, so it must be up to date
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, max-age=0, must-revalidate'
  );

  if (response.type === 'Error') {
    res.status(response.httpStatus);
  } else {
    res.status(200);
  }
  res.json(response);
};

export default ItemsApi;
