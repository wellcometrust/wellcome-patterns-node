import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';
import { isUndefined } from '@weco/common/utils/type-guards';

export function createClient(): prismic.Client {
  // We use an access token for Prismic in prod to avoid certain classes of
  // intermittent error.  In particular, we'd see an occasional 500 response
  // with an error from Prismic:
  //
  //      ForbiddenError: Access to this Ref requires an access token
  //
  // We have Prismic configured so that only our 'master' ref (i.e. latest) is
  // available publicly.  Because this error is intermittent, it looks like maybe
  // some sort of race condition where content is being published between our app
  // getting the current master ref, and looking up content with that ref.
  //
  // Using authentication for Prismic requests should fix this error.
  //
  // See also: https://prismic.io/docs/access-token
  // See also: https://github.com/wellcomecollection/wellcomecollection.org/issues/8309
  //
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

  if (isUndefined(accessToken) && process.env.NODE_ENV === 'production') {
    console.warn('No access token specified for Prismic client');
  }

  const endpoint = prismic.getRepositoryEndpoint('wellcomecollection');
  const client = prismic.createClient(endpoint, { fetch, accessToken });

  return client;
}
