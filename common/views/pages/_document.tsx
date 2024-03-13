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
  GaDimensions,
} from '@weco/common/services/app/google-analytics';

// Don't attempt to destructure the process object
// https://github.com/vercel/next.js/pull/20869/files
const ANALYTICS_WRITE_KEY =
  process.env.ANALYTICS_WRITE_KEY || '78Czn5jNSaMSVrBq2J9K4yJjWxh6fyRI';
const NODE_ENV = process.env.NODE_ENV || 'development';

export function renderSegmentSnippet() {
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
  gaDimensions?: GaDimensions;
  hasAnalyticsConsent: boolean;
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

      return {
        ...initialProps,
        toggles: pageProps.serverData?.toggles,
        gaDimensions: pageProps.gaDimensions,
        hasAnalyticsConsent: pageProps.serverData?.hasAnalyticsConsent,
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
    const cookiesWork = this.props.toggles?.cookiesWork?.value;

    const shouldRenderAnalytics =
      !cookiesWork || (cookiesWork && this.props.hasAnalyticsConsent);

    return (
      <Html lang="en">
        <Head>
          <>
            {/* Adding toggles etc. to the datalayer so they are available to events in Google Tag Manager */}
            <Ga4DataLayer
              hasAnalyticsConsent={this.props.hasAnalyticsConsent}
              data={{ toggles: this.props.toggles }}
            />

            {/* Removing/readding this script on consent changes causes issues with meta tag duplicates
            https://github.com/wellcomecollection/wellcomecollection.org/pull/10685#discussion_r1516298683
            Let's keep an eye on this issue and consider moving it next to the Segment script when it's fixed */}
            <GoogleTagManager />

            {shouldRenderAnalytics && (
              <script
                dangerouslySetInnerHTML={{ __html: renderSegmentSnippet() }}
              />
            )}
          </>
        </Head>
        <body>
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
