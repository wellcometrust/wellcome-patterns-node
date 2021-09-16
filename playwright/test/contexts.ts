import { baseUrl, useStageApis } from './helpers/urls';
import { Response } from 'playwright';

export function gotoWithoutCache(
  url: string,
  query?: string
): Promise<null | Response> {
  return page.goto(`${url}?cachebust=${Date.now()}${query ? `&${query}` : ''}`);
}

const createCookie = (name: string) => {
  return {
    name: name,
    value: 'true',
    path: '/',
    domain: new URL(baseUrl).host,
  };
};

const acceptCookieCookie = createCookie('WC_cookiesAccepted');
const stageApiToggleCookie = createCookie('toggle_stagingApi');

// TODO: context.addCookies should run for the first test of a suite (even on beforeAll/beforeEach)

const requiredCookies = useStageApis
  ? [acceptCookieCookie, stageApiToggleCookie]
  : [acceptCookieCookie];

const multiVolumeItem = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/mg56yqa4/items`);
};

const itemWithSearchAndStructures = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/re9cyhkt/items`);
};

const workWithPhysicalLocationOnly = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/ffd3zeq3`);
};

const workWithDigitalLocationOnly = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/j9kukb78`);
};

const workWithDigitalLocationAndLocationNote = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/a235xn8e`);
};

const workWithPhysicalAndDigitalLocation = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/works/r9kpkq8e`);
};

const itemWithReferenceNumber = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works/qqra7v28/items`);
};

const worksSearch = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(`${baseUrl}/works`);
};

const accountError = async (): Promise<void> => {
  context.addCookies(requiredCookies);
  await gotoWithoutCache(
    `${baseUrl}/account/error`,
    `error_description=Uh-oh%20spaghetti-O's!`
  );
};

export const isMobile = Boolean(deviceName);

export {
  multiVolumeItem,
  worksSearch,
  itemWithSearchAndStructures,
  itemWithReferenceNumber,
  workWithPhysicalAndDigitalLocation,
  workWithPhysicalLocationOnly,
  workWithDigitalLocationOnly,
  workWithDigitalLocationAndLocationNote,
  accountError,
};
