import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Toggles } from '@weco/toggles';

export const GOOGLE_ANALYTICS_V4_ID = 'G-206J7SLYFC';
export const GOOGLE_ANALYTICS_UA_ID = 'UA-55614-6';

const gaCookieFlags = 'SameSite=None;secure';

type GaDimensions = {
  partOf: string[];
};

const gaDimensionKeys = {
  partOf: 'dimension3',
};

export const useGoogleAnalyticsV4 = (): void =>
  useEffect(() => {
    if (window?.gtag) {
      const path = window.location.pathname + window.location.search;
      window.gtag('config', GOOGLE_ANALYTICS_V4_ID, {
        page_path: path,
        cookie_flags: gaCookieFlags,
      });
    }
  }, []);

export const useGoogleAnalyticsUA = ({
  toggles,
  gaDimensions,
}: {
  toggles: Toggles;
  gaDimensions?: GaDimensions;
}): void =>
  useEffect(() => {
    ReactGA.initialize([
      {
        trackingId: GOOGLE_ANALYTICS_UA_ID,
        titleCase: false,
        gaOptions: { cookieFlags: gaCookieFlags },
      },
    ]);

    // This allows us to send a gaDimensions prop from a data fetching method
    // e.g. `getServerSideProps` and store it in the page views.
    // TODO: Probably best moving this into the PageLayout so it's called explicitly.
    if (gaDimensions?.partOf?.length) {
      ReactGA.set({
        [gaDimensionKeys.partOf]: gaDimensions.partOf.join(','),
      });
    }

    ReactGA.set({
      dimension5: JSON.stringify(toggles),
    });
  }, []);
