import { AppProps } from 'next/app';
import React, { useEffect, FunctionComponent, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from '../../views/themes/default';
import OutboundLinkTracker from '../../views/components/OutboundLinkTracker/OutboundLinkTracker';
import LoadingIndicator from '../../views/components/LoadingIndicator/LoadingIndicator';
import { AppContextProvider } from '../components/AppContext/AppContext';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { Pageview, trackPageview } from '../../services/conversion/track';
import useIsFontsLoaded from '../../hooks/useIsFontsLoaded';
import {
  isServerData,
  defaultServerData,
  ServerData,
} from '../../server-data/types';
import { ServerDataContext } from '../../server-data/Context';
import UserProvider from '../components/UserProvider/UserProvider';
import { ApmContextProvider } from '../components/ApmContext/ApmContext';
import { AppErrorProps } from '../../services/app';
import useMaintainPageHeight from '../../services/app/useMaintainPageHeight';
import {
  GaDimensions,
  useGoogleAnalyticsUA,
} from '../../services/app/google-analytics';
import { useOnPageLoad } from '../../services/app/useOnPageLoad';
import ReactGA from 'react-ga';
import { NextPage } from 'next';
import { deserialiseProps } from '@weco/common/utils/json';

import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import Link from 'next/link';

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
  useEffect(() => {
    document.documentElement.classList.add('enhanced');
  }, []);

  useGoogleAnalyticsUA({
    toggles: serverData.toggles,
    gaDimensions: pageProps.gaDimensions,
  });

  useOnPageLoad(url => ReactGA.pageview(url));

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

  // usePrismicPreview(() => Boolean(document.cookie.match('isPreview=true')));

  const getLayout = Component.getLayout || (page => <>{page}</>);

  return (
    <>
      <PrismicProvider internalLinkComponent={props => <Link {...props} />}>
        <PrismicPreview repositoryName={'wellcomecollection'}>
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
                      {!pageProps.err &&
                        getLayout(
                          <Component
                            {...(deserialiseProps(pageProps) as any)}
                          />
                        )}
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
        </PrismicPreview>
      </PrismicProvider>
    </>
  );
};

export default WecoApp;
