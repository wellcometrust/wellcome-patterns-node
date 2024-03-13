import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { useEffect, FunctionComponent, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from '@weco/common/views/themes/default';
import LoadingIndicator from '@weco/common/views/components/LoadingIndicator/LoadingIndicator';
import { AppContextProvider } from '@weco/common/views/components/AppContext/AppContext';
import ErrorPage from '@weco/common/views/components/ErrorPage/ErrorPage';
import {
  Pageview,
  trackPageview,
} from '@weco/common/services/conversion/track';
import useIsFontsLoaded from '@weco/common/hooks/useIsFontsLoaded';
import {
  isServerData,
  defaultServerData,
  ServerData,
} from '@weco/common/server-data/types';
import { ServerDataContext } from '@weco/common/server-data/Context';
import UserProvider from '@weco/common/views/components/UserProvider/UserProvider';
import { ApmContextProvider } from '@weco/common/views/components/ApmContext/ApmContext';
import { AppErrorProps } from '@weco/common/services/app';
import usePrismicPreview from '@weco/common/services/app/usePrismicPreview';
import useMaintainPageHeight from '@weco/common/services/app/useMaintainPageHeight';
import { GaDimensions } from '@weco/common/services/app/google-analytics';
import { deserialiseProps } from '@weco/common/utils/json';
import { SearchContextProvider } from '@weco/common/views/components/SearchContext/SearchContext';
import CivicUK from '@weco/common/views/components/CivicUK';

// Error pages can't send anything via the data fetching methods as
// the page needs to be rendered as soon as the error happens.
// We just use the route to determine if this is an error page to ignore
// serverData not being set
// see: https://github.com/vercel/next.js/discussions/11945#discussioncomment-6790
function isErrorPage(route: string): boolean {
  switch (route) {
    case '/404':
    case '/500':
    case '/_error':
      return true;
    default:
      return false;
  }
}

const dev = process.env.NODE_ENV !== 'production';
const civicUkApiKey = process.env.NEXT_PUBLIC_CIVICUK_API_KEY;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type GlobalProps = {
  serverData: ServerData;
  pageview?: Pageview;
  gaDimensions?: GaDimensions;
} & Partial<AppErrorProps>;

type WecoAppProps = Omit<AppProps, 'pageProps'> & {
  pageProps: GlobalProps;
  Component: NextPageWithLayout;
};

const WecoApp: FunctionComponent<WecoAppProps> = ({
  pageProps,
  router,
  Component,
}) => {
  // You can set `skipServerData: true` to explicitly bypass this
  // e.g. for error pages
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

  useMaintainPageHeight();

  const onAnalyticsConsentChanged = (
    event: CustomEvent<{ consent: 'granted' | 'denied' }>
  ) => {
    // Update datalayer config with consent value
    gtag('consent', 'update', {
      analytics_storage: event.detail.consent,
    });
  };

  useEffect(() => {
    document.documentElement.classList.add('enhanced');

    window.addEventListener(
      'analyticsConsentChanged',
      onAnalyticsConsentChanged
    );

    return () => {
      window.removeEventListener(
        'analyticsConsentChanged',
        onAnalyticsConsentChanged
      );
    };
  }, []);

  useEffect(() => {
    if (pageProps.pageview) {
      trackPageview({
        name: pageProps.pageview.name,
        properties: pageProps.pageview.properties,
        eventGroup: pageProps.pageview.eventGroup,
      });
    }
  }, [pageProps.pageview]);
  // pageProps.pageview is updated by getServerSideProps
  // getServerSideProps is run when the page is requested directly
  // or when requested client-side through next/link or next/router
  // i.e. everything that we consider to be a page view

  usePrismicPreview(() => Boolean(document.cookie.match('isPreview=true')));

  const getLayout = Component.getLayout || (page => <>{page}</>);

  return (
    <>
      <ApmContextProvider>
        <ServerDataContext.Provider value={serverData}>
          <UserProvider>
            <AppContextProvider>
              <SearchContextProvider>
                <ThemeProvider theme={theme}>
                  <GlobalStyle
                    toggles={serverData.toggles}
                    isFontsLoaded={useIsFontsLoaded()}
                  />
                  <LoadingIndicator />

                  {civicUkApiKey &&
                    pageProps.serverData?.toggles?.cookiesWork?.value && (
                      <CivicUK apiKey={civicUkApiKey} />
                    )}

                  {!pageProps.err &&
                    getLayout(<Component {...deserialiseProps(pageProps)} />)}
                  {pageProps.err && (
                    <ErrorPage
                      statusCode={pageProps.err.statusCode}
                      title={pageProps.err.message}
                    />
                  )}
                </ThemeProvider>
              </SearchContextProvider>
            </AppContextProvider>
          </UserProvider>
        </ServerDataContext.Provider>
      </ApmContextProvider>
    </>
  );
};

export default WecoApp;
