import { getCookie, setCookie } from 'cookies-next';
import { TmpCookiesObj } from 'cookies-next/lib/types';

// cookieConsent's value is a stringified object that looks like
// {
//   necessary: boolean,
//   analytics: boolean
// }
const currentCookieConsent =
  !!getCookie('cookieConsent') &&
  JSON.parse(getCookie('cookieConsent') as string);

// isCookiesWorkToggleOn makes sure the rendering for regular users
// ignores all the checks and conditions, they should always be
// defaulting to true for them
export const getConsentCookie = (type: string): boolean => {
  const isCookiesWorkToggleOn = getCookie('toggle_cookiesWork');

  return isCookiesWorkToggleOn && currentCookieConsent
    ? currentCookieConsent[type]
    : true;
};

// isCookiesWorkToggleOn makes sure the rendering for regular users
// ignores all the checks and conditions, they should always be
// defaulting to true for them
export const getConsentCookieServerSide = (
  cookies: TmpCookiesObj,
  type: string
): boolean => {
  const isCookiesWorkToggleOn = cookies.toggle_cookiesWork;

  const parsedCookie =
    isCookiesWorkToggleOn && cookies.cookieConsent !== undefined
      ? JSON.parse(cookies.cookieConsent)
      : { necessary: true, analytics: true };

  return !!parsedCookie[type];
};

export const toggleCookieConsent = () => {
  // Consent is CURRENTLY true by default,
  // So the first click on the mock-consent button should set preference to false
  const isPreferenceSet = currentCookieConsent?.analytics !== undefined;
  const newValue = isPreferenceSet ? !currentCookieConsent?.analytics : false;

  setCookie(
    'cookieConsent',
    JSON.stringify({
      necessary: true,
      analytics: newValue,
    })
  );

  // if (newValue === false) {
  //   removeAnalyticsCookies();
  // }

  window.location.reload();
};

// const removeAnalyticsCookies = () => {
// deleteCookies([]);
// };