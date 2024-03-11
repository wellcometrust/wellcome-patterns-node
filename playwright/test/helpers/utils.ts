import axios from 'axios';
import { expect } from 'playwright/test';

export type CookieType = {
  name: string;
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Lax' | 'None' | 'Strict';
};

const togglePrefix = 'toggle_';

export async function makeDefaultToggleCookies(
  domain: string
): Promise<CookieType[]> {
  const { data } = await axios.get(
    'https://toggles.wellcomecollection.org/toggles.json'
  );
  const { toggles } = data;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return toggles.map((t: any) => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return {
      name: `${togglePrefix}${t.id}`,
      value: t.defaultValue.toString(),
      domain,
      path: '/',
    };
  });
}

// Certain pages, such as search, tend to be slower to load and will benefit from a longer timeout
// Default is currently 5000 https://playwright.dev/docs/test-timeouts
export const slowExpect = expect.configure({ timeout: 10000 });
