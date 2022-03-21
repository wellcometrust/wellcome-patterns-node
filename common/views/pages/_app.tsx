import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { AppProps } from 'next/app';
import Router from 'next/router';
import ReactGA from 'react-ga';
import React, { useEffect, FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from '../../views/themes/default';
import OutboundLinkTracker from '../../views/components/OutboundLinkTracker/OutboundLinkTracker';
import LoadingIndicator from '../../views/components/LoadingIndicator/LoadingIndicator';
import { trackEvent } from '../../utils/ga';
import { AppContextProvider } from '../components/AppContext/AppContext';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { trackPageview } from '../../services/conversion/track';
import useIsFontsLoaded from '../../hooks/useIsFontsLoaded';
import { isServerData, defaultServerData } from '../../server-data/types';
import { ServerDataContext } from '../../server-data/Context';
import UserProvider from '../components/UserProvider/UserProvider';
import { ApmContextProvider } from '../components/ApmContext/ApmContext';

declare global {
  interface Window {
    prismic: any;
  }
}

/**
 * This allows us to use appError() in Page.getServerSideProps
 * and still infer it's props return type if it didn't error.
 * e.g.
 * type BadProps = InferGetServerSidePropsType<typeof getServerSideProps> // { id: string } | AppErrorProps
 * type Props = PageProps<typeof getServerSideProps> // { id: string }
 * const Page = (props: Props) => {}
 * export const getServerSideProps = context => {
 *   const { id } = context.query
 *   if (!id) return appError(context, 400, 'ID please')
 *   else return { props: { id } }
 * }
 */
export type PageProps<GetServerSideProps> = Exclude<
  InferGetServerSidePropsType<GetServerSideProps>,
  AppErrorProps
>;

export type AppErrorProps = {
  err: {
    statusCode: number;
    message: string;
  };
};

type Pageview = {
  name: string;
  properties: Record<string, string[] | number[] | string | number | undefined>;
};

export type WithPageview = {
  pageview: Pageview;
};

type GaDimensions = {
  partOf: string[];
};

export type WithGaDimensions = {
  gaDimensions: GaDimensions;
};

const gaDimensionKeys = {
  partOf: 'dimension3',
};

export function appError(
  context: GetServerSidePropsContext,
  statusCode: number,
  message: string
): { props: AppErrorProps } {
  context.res.statusCode = statusCode;

  return {
    props: {
      err: {
        statusCode,
        message,
      },
    },
  };
}

let engagement;
let previouslyAccruedTimeOnSpaPage = 0;
let accruedHiddenTimeOnPage = 0;
let pageVisibilityLastChanged = 0;

function triggerEngagement() {
  ReactGA.event({
    category: 'Engagement',
    action: 'Time on page >=',
    label: '10 seconds',
  });
}

function trackVisibleTimeOnPage() {
  const accruedVisibleTimeOnPage = Math.round(
    window.performance.now() -
      previouslyAccruedTimeOnSpaPage -
      accruedHiddenTimeOnPage
  );
  trackEvent({
    category: 'Engagement',
    action: 'time page is visible',
    value: accruedVisibleTimeOnPage,
    nonInteraction: true,
    transport: 'beacon',
  });
}

function calculateHiddenTimeOnPage() {
  if (!document.hidden) {
    accruedHiddenTimeOnPage = accruedHiddenTimeOnPage +=
      window.performance.now() - pageVisibilityLastChanged;
  }
  pageVisibilityLastChanged = window.performance.now();
}

function makeSurePageIsTallEnough() {
  const pageHeightCache: number[] = [];
  const html = document.querySelector('html');

  Router.events.on('routeChangeStart', () => {
    document &&
      document.documentElement &&
      pageHeightCache.push(document.documentElement.offsetHeight);
  });

  Router.events.on('routeChangeComplete', () => {
    if (html) {
      html.style.height = 'initial';
    }
  });

  Router.beforePopState(() => {
    if (html) {
      html.style.height = `${pageHeightCache.pop()}px`;
    }

    return true;
  });
}

export type WecoAppProps = AppProps;

// Error pages can't send anything via the data fetching methods as
// the page needs to be rendered as soon as the error happens.
// We just use the route to determine if this is an error page to ignore
// serverData not being set
// see: https://github.com/vercel/next.js/discussions/11945#discussioncomment-6790
function isErrorPage(route: string): boolean {
  switch (route) {
    case '/404':
    case '/ _error':
      return true;
    default:
      return false;
  }
}

const WecoApp: FunctionComponent<WecoAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  // We throw on dev as all pages should set this
  // You can set `skipServerData: true` to explicitly bypass this
  // e.g. for error pages
  const dev = process.env.NODE_ENV !== 'production';
  const isServerDataSet = isServerData(pageProps.serverData);

  // We allow error pages through as they don't need, and can't set
  // serverData as they don't have data fetching methods.exi
  if (
    dev &&
    !isServerDataSet &&
    !isErrorPage(router.route) &&
    !('err' in pageProps)
  ) {
    throw new Error(
      'Please set serverData on your getServerSideProps or getStaticProps'
    );
  }

  const serverData = isServerDataSet ? pageProps.serverData : defaultServerData;

  // enhanced
  useEffect(() => {
    makeSurePageIsTallEnough();
    document.documentElement.classList.add('enhanced');
  }, []);

  const gaSecureCookies = serverData.toggles.gaSecureCookies;
  // GA v4
  useEffect(() => {
    window.gtag &&
      window.gtag('config', 'G-206J7SLYFC', {
        page_path: `${window.location.pathname}${window.location.search}`,
        cookie_flags: gaSecureCookies ? 'SameSite=None;secure' : undefined,
      });
  }, []);

  // GA v3
  useEffect(() => {
    function trackGaPageview() {
      ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
    }
    ReactGA.initialize([
      {
        trackingId: 'UA-55614-6',
        titleCase: false,
        gaOptions: {
          cookieFlags: gaSecureCookies ? 'SameSite=None;secure' : undefined,
        },
      },
    ]);

    // This allows us to send a gaDimensions prop from a data fetching method
    // e.g. `getServerSideProps` and store it in the page views.
    // TODO: Probably best moving this into the PageLayout so it's called explicitly.
    if (pageProps.gaDimensions) {
      const {
        gaDimensions: { partOf },
      } = pageProps as WithGaDimensions;

      partOf &&
        partOf.length > 0 &&
        ReactGA.set({
          [gaDimensionKeys.partOf]: partOf.join(','),
        });
    }

    ReactGA.set({
      dimension5: JSON.stringify(serverData.toggles),
    });
    trackGaPageview();
    Router.events.on('routeChangeComplete', trackGaPageview);

    return () => {
      Router.events.off('routeChangeComplete', trackGaPageview);
    };
  }, []);

  // Time on page
  useEffect(() => {
    function trackAndResetVisibleTime() {
      trackVisibleTimeOnPage();
      previouslyAccruedTimeOnSpaPage = window.performance.now();
      pageVisibilityLastChanged = 0;
      accruedHiddenTimeOnPage = 0;
    }

    function resetEngagementTimeout() {
      clearTimeout(engagement);
      engagement = setTimeout(triggerEngagement, 10000);
    }

    Router.events.on('routeChangeStart', trackAndResetVisibleTime);
    Router.events.on('routeChangeComplete', resetEngagementTimeout);

    engagement = setTimeout(triggerEngagement, 10000);

    try {
      if (document.hidden) {
        // in case page is opened in a new tab
        pageVisibilityLastChanged = window.performance.now();
      }
      document.addEventListener('visibilitychange', calculateHiddenTimeOnPage);
      window.addEventListener('beforeunload', trackVisibleTimeOnPage);
    } catch (error) {
      trackEvent({
        category: 'Engagement',
        action: 'unable to track time page is visible',
        nonInteraction: true,
      });
    }

    return () => {
      Router.events.off('routeChangeStart', trackAndResetVisibleTime);
      Router.events.off('routeChangeComplete', resetEngagementTimeout);

      try {
        document.removeEventListener(
          'visibilitychange',
          calculateHiddenTimeOnPage
        );
        window.removeEventListener('beforeunload', trackVisibleTimeOnPage);
      } catch (error) {}
    };
  }, []);

  // lazysizes
  useEffect(() => {
    // This needs to be dynamically required as it's only on the client-side
    /* eslint-disable @typescript-eslint/no-var-requires */
    const lazysizes = require('lazysizes');
    /* eslint-enable @typescript-eslint/no-var-requires */
    lazysizes.init();
  }, []);

  // prismic warnings
  // TODO: This should be componentized
  useEffect(() => {
    // Prismic preview and validation warnings
    if (document.cookie.match('isPreview=true')) {
      window.prismic = {
        endpoint: 'https://wellcomecollection.cdn.prismic.io/api/v2',
      };
      const prismicScript = document.createElement('script');
      prismicScript.src = '//static.cdn.prismic.io/prismic.min.js';
      document.head && document.head.appendChild(prismicScript);
      (function () {
        const validationBar = document.createElement('div');
        validationBar.style.position = 'fixed';
        validationBar.style.width = '375px';
        validationBar.style.padding = '15px';
        validationBar.style.background = '#e01b2f';
        validationBar.style.color = '#ffffff';
        validationBar.style.bottom = '0';
        validationBar.style.right = '0';
        validationBar.style.fontSize = '12px';
        validationBar.style.zIndex = '2147483000';

        const validationFails: string[] = [];

        const descriptionEl = document.querySelector(
          'meta[name="description"]'
        );
        if (descriptionEl && !descriptionEl.getAttribute('content')) {
          validationFails.push(`
            <b>Warning:</b>
            This piece of content is missing its description.
            This helps with search engine results and sharing on social channels.
            (If this is from Prismic, it's the promo text).
          `);
        }

        const imageEl = document.querySelector('meta[property="og:image"]');
        if (imageEl && !imageEl.getAttribute('content')) {
          validationFails.push(`
            <b>Warning:</b>
            This piece of content is missing its promo image.
            This is the image that will be shown across our site,
            as well as on social media.
          `);
        }

        if (validationFails.length > 0) {
          validationFails.forEach(function (validationFail) {
            const div = document.createElement('div');
            div.style.marginBottom = '6px';
            div.innerHTML = validationFail;
            validationBar.appendChild(div);
          });
          document.body && document.body.appendChild(validationBar);
        }
      })();
    }
  }, []);

  // We use this method as suggested to optimise the client/server bundles
  // https://github.com/vercel/next.js/issues/5354#issuecomment-520305040
  const isServer = typeof window === 'undefined';
  const isClient = !isServer;

  if (isClient) {
    const { pageview } = pageProps as { pageview: Pageview };
    if (pageview) {
      trackPageview(pageview.name, pageview.properties);
    }
  }

  return (
    <>
      <ApmContextProvider>
        <ServerDataContext.Provider value={serverData}>
          <UserProvider>
            <AppContextProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle
                  toggles={serverData.toggles}
                  isFontsLoaded={useIsFontsLoaded()}
                />
                <OutboundLinkTracker>
                  <LoadingIndicator />
                  {!pageProps.err && <Component {...pageProps} />}
                  {pageProps.err && (
                    <ErrorPage
                      statusCode={pageProps.err.statusCode}
                      title={pageProps.err.message}
                    />
                  )}
                </OutboundLinkTracker>
              </ThemeProvider>
            </AppContextProvider>
          </UserProvider>
        </ServerDataContext.Provider>
      </ApmContextProvider>
    </>
  );
};

export default WecoApp;
