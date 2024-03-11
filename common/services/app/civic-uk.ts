import { getCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

type CivicUKCookie = {
  optionalCookies?: {
    analytics: 'accepted' | 'revoked';
  };
};

export const getAnalyticsConsentState = (
  context?: GetServerSidePropsContext
): boolean => {
  const cookies = getCookies(context);
  const isCookiesWorkToggleOn = cookies.toggle_cookiesWork === 'true';
  const consentCookie = cookies.CookieControl;

  // Ensures this returns true for regular users
  // that don't have the "Cookie works" toggle on
  if (isCookiesWorkToggleOn) {
    // If the feature flag is ON and consent has been defined,
    // return its value
    if (consentCookie !== undefined) {
      const civicUKCookie: CivicUKCookie = JSON.parse(
        decodeURIComponent(consentCookie)
      );

      return civicUKCookie.optionalCookies?.analytics === 'accepted';
    } else {
      // If the feature flag is ON but consent has yet to be defined
      return false;
    }
  } else {
    return true;
  }
};
