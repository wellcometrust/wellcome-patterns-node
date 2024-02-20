import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  NextScript,
  Html,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';
import * as snippet from '@segment/snippet';
import { Toggles } from '@weco/toggles';
import {
  Ga4DataLayer,
  GoogleTagManager,
  GoogleTagManagerNoScript,
  GaDimensions,
} from '../../services/app/google-analytics';
import { getCookies } from 'cookies-next';
import { getConsentCookieServerSide } from '@weco/common/utils/cookie-consent';

const {
  ANALYTICS_WRITE_KEY = '78Czn5jNSaMSVrBq2J9K4yJjWxh6fyRI',
  NODE_ENV = 'development',
} = process.env;

function renderSegmentSnippet() {
  const opts = {
    apiKey: ANALYTICS_WRITE_KEY,
    page: false,
  };

  if (NODE_ENV === 'development') {
    return snippet.max(opts);
  }

  return snippet.min(opts);
}

type DocumentInitialPropsWithTogglesAndGa = DocumentInitialProps & {
  toggles: Toggles;
  hasAnalyticsConsent: boolean;
  gaDimensions?: GaDimensions;
};
class WecoDoc extends Document<DocumentInitialPropsWithTogglesAndGa> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialPropsWithTogglesAndGa> {
    const sheet = new ServerStyleSheet();
    let pageProps;
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => {
            pageProps = props.pageProps;
            return sheet.collectStyles(<App {...props} />);
          },
        });

      const initialProps = await Document.getInitialProps(ctx);
      console.log({
        getCookies: getCookies({ res: ctx.res, req: ctx.req }),
        req: ctx.req,
      });
      const hasAnalyticsConsent = getConsentCookieServerSide(
        getCookies({ res: ctx.res, req: ctx.req }),
        'analytics'
      );

      return {
        ...initialProps,
        toggles: pageProps.serverData?.toggles,
        gaDimensions: pageProps.gaDimensions,
        hasAnalyticsConsent,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): ReactElement<DocumentInitialProps> {
    console.log({ hasAnalyticsConsent: this.props.hasAnalyticsConsent });
    return (
      <Html lang="en">
        <Head>
          {this.props.hasAnalyticsConsent && (
            <>
              {/* Adding toggles etc. to the datalayer so they are available to events in Google Tag Manager */}
              <Ga4DataLayer
                data={{
                  toggles: this.props.toggles,
                }}
              />
              <GoogleTagManager />
              <script
                dangerouslySetInnerHTML={{ __html: renderSegmentSnippet() }}
              />
            </>
          )}
        </Head>
        <body>
          {this.props.hasAnalyticsConsent && <GoogleTagManagerNoScript />}
          <div id="top">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WecoDoc;
