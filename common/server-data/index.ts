/**
 * This module fetches data from remote sources that:
 *
 *    - we need on every request/page
 *    - doesn't change very often
 *
 * e.g. default toggle values, or our opening hours.
 *
 * Because this data changes infrequently, it's helpful to cache it on
 * the server, than fetch it on every single request.  We do this by fetching
 * this data on a fixed interval, and saving it to a JSON file on the local disk.
 * When we need this data to serve a request, we read it from the JSON cache
 * rather than going back to the remote source.
 */

import path from 'path';
import { promises as fs } from 'fs';
import { GetServerSidePropsContext } from 'next';
import togglesHandler, { getTogglesFromContext } from './toggles';
import prismicHandler from './prismic';
import { simplifyServerData } from '../services/prismic/transformers/server-data';
import { SimplifiedServerData } from './types';
import { getAnalyticsConsentState } from '@weco/common/services/app/civic-uk';

export type Handler<DefaultData, FetchedData> = {
  defaultValue: DefaultData;
  fetch: () => Promise<FetchedData>;
};

/**
 * This module will only run on the server side.
 * This check ensures we are not on the client, and throws an error explaining this.
 * The module would bork anyway as we would be trying to use fs, path etc
 * this would just make it easier to debug.
 */
if (typeof window !== 'undefined') {
  throw new Error('server-data module can only be used on the server-side');
}

const pathName = path.join(process.cwd(), '.server-data');
const minute = 60000;

const handlers = {
  toggles: togglesHandler,
  prismic: prismicHandler,
} as const;

type Key = keyof typeof handlers;
type DefaulVal<K extends Key> = (typeof handlers)[K]['defaultValue'];

async function read(key: Key, defaultValue: DefaulVal<Key>) {
  const fileName = path.join(pathName, `${key}.json`);
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (e) {
    console.error(`Could not read ${fileName}`, e);
    return defaultValue;
  }
}

const timers = new Map<Key, NodeJS.Timer>();
async function write(key: Key, fetch: () => Promise<DefaulVal<Key>>) {
  try {
    const data = await fetch();
    const fileName = path.join(pathName, `${key}.json`);
    await fs.mkdir(pathName, { recursive: true });

    // Write the JSON to a temp file, then rename it.  On most filesystems,
    // the rename is an atomic operation.
    //
    // This means that whenever you try to read ${key}.json, you'll always get
    // a valid JSON.  If we wrote directly to the file, you might get an
    // empty file or invalid JSON if you tried to read while we were writing.
    const tmpFileName = path.join(pathName, `${key}.json.tmp`);

    await fs.writeFile(tmpFileName, JSON.stringify(data));
    await fs.rename(tmpFileName, fileName);
  } catch (e) {
    // If we can't fetch the server data (e.g. because Prismic briefly times out),
    // we log an error and use the cached version of the data.
    console.error(
      `Could not update server data key '${key}'; waiting for next fetch interval`,
      e
    );
  }

  // We have to make sure this timer is set even if fetching the data fails
  // on a particular attempt, otherwise a single failure means a running app
  // will never fetch new server data again.
  const timer = setTimeout(() => {
    clearTimeout(timer);
    write(key, fetch);
  }, minute);

  timers.set(key, timer);
}

export async function init(): Promise<void> {
  await write('toggles', togglesHandler.fetch);
  await write('prismic', prismicHandler.fetch);
}

export function clear(): void {
  for (const [, timer] of timers) {
    clearTimeout(timer);
  }
}

/**
 * we should always keep the context here irrespective of if we use it
 * to ensure that we only ever run this in `getServerSideProps`, where
 * `fs`, `path`, and other server-side functionality is available
 */
export const getServerData = async (
  context: GetServerSidePropsContext
): Promise<SimplifiedServerData> => {
  const togglesResp = await read('toggles', handlers.toggles.defaultValue);
  const prismic = await read('prismic', handlers.prismic.defaultValue);
  const { toggle } = context.query;

  const enableToggle: string | undefined =
    typeof toggle === 'string' ? toggle : undefined;

  const toggles = getTogglesFromContext(togglesResp, context);

  const isEnableToggleValid = Object.keys(toggles).some(
    id => id === enableToggle
  );

  if (enableToggle && isEnableToggleValid) {
    context.res.setHeader('Set-Cookie', `toggle_${enableToggle}=true; Path=/`);
    toggles[enableToggle].value = true;
  }

  const hasAnalyticsConsent = getAnalyticsConsentState(context);

  const serverData = { toggles, prismic, hasAnalyticsConsent };

  return simplifyServerData(serverData);
};
