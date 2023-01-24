import { CloudFrontRequestEvent, CloudFrontResponse } from 'aws-lambda';
import { URLSearchParams } from 'url';
import { literalRedirects, queryRedirects } from './redirects';

const redirect301 = (host: string, path: string) => ({
  status: '301',
  statusDescription: 'Found',
  headers: {
    location: [
      {
        key: 'Location',
        value: `https://${host}${path}`,
      },
    ],
    'x-powered-by': [
      {
        key: 'x-powered-by',
        value: '@weco/redirector',
      },
    ],
  },
});

// Returns true if and only if all of the params in `subset` are
// also contained within `superset`
const paramsAreSubset = (
  superset: URLSearchParams,
  subset: URLSearchParams
): boolean => {
  if (!subset) return false;

  for (const pair of subset.entries()) {
    const [key, value] = pair;
    if (superset.get(key) !== value) {
      return false;
    }
  }
  return true;
};

const filterParams = (
  params: URLSearchParams,
  allow: Set<string>
): URLSearchParams => {
  const filtered = new URLSearchParams();
  params.forEach((value, key) => {
    if (allow.has(key)) {
      filtered.append(key, value);
    }
  });
  return filtered;
};

export const getRedirect = (
  event: CloudFrontRequestEvent
): CloudFrontResponse | undefined => {
  const cf = event.Records[0].cf;
  const request = cf.request;
  const uriSansSlash = request.uri.replace(/\/$/, '');

  const hostHeader = cf.request.headers.host;
  const requestHost =
    hostHeader && hostHeader.length > 0 ? hostHeader[0].value : undefined;

  const host =
    requestHost &&
    requestHost.indexOf('www-stage.wellcomecollection.org') !== -1
      ? 'www-stage.wellcomecollection.org'
      : 'wellcomecollection.org';

  if (literalRedirects[uriSansSlash]) {
    return redirect301(host, literalRedirects[uriSansSlash]);
  }

  if (queryRedirects[uriSansSlash]) {
    const requestParams = new URLSearchParams(request.querystring);

    // If the redirect has matchParams, pick the relevant one from the list
    // Otherwise return the one that has none
    const potentialRedirect = queryRedirects[uriSansSlash].find(q =>
      q.matchParams
        ? paramsAreSubset(requestParams, q.matchParams)
        : !q.matchParams
    );

    if (potentialRedirect) {
      // A redirect occurs if all of the params in the redirect rule (matchParams)
      // are contained within the request, or if there are no matchParams
      if (
        (potentialRedirect.matchParams &&
          paramsAreSubset(requestParams, potentialRedirect.matchParams)) ||
        !potentialRedirect.matchParams
      ) {
        // Only forward params that are in `forwardParams`
        const newParams = filterParams(
          requestParams,
          potentialRedirect.forwardParams
        );
        const requestParamsString = newParams.toString();

        return redirect301(
          host,
          requestParamsString
            ? potentialRedirect.redirectPath + '?' + requestParamsString
            : potentialRedirect.redirectPath
        );
      }
    }
  }

  return undefined;
};
