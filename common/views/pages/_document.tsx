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
import { Toggles } from '@weco/toggles';
import { ConsentStatusProps } from '@weco/common/server-data/types';
import { getErrorPageConsent } from '@weco/common/services/app/civic-uk';
import {
  CoreWebVitalsScript,
  PerformanceTimingTrackingScript,
  Ga4DataLayer,
  GoogleTagManager,
  GaDimensions,
} from '@weco/common/services/app/analytics-scripts';

type DocumentInitialPropsWithTogglesAndGa = DocumentInitialProps & {
  // TODO: remove style prop when Chromium fix https://issues.chromium.org/issues/367758074
  style: string;
  toggles: Toggles;
  gaDimensions?: GaDimensions;
  consentStatus: ConsentStatusProps;
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

      const consentStatus = pageProps.serverData
        ? pageProps.serverData?.consentStatus
        : getErrorPageConsent({ req: ctx.req, res: ctx.res });
      return {
        ...initialProps,
        // TODO: remove style prop when Chromium fix https://issues.chromium.org/issues/367758074
        style: sheet.getStyleElement()[0].props.dangerouslySetInnerHTML.__html,
        toggles: pageProps.serverData?.toggles,
        gaDimensions: pageProps.gaDimensions,
        consentStatus,
        styles: (
          <>
            {initialProps.styles}
            {/* TODO: re-add sheet.getStyleElement below when Chromium fix https://issues.chromium.org/issues/367758074 */}
            {/* {sheet.getStyleElement()} */}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): ReactElement<DocumentInitialProps> {
    return (
      <Html lang="en">
        <Head>
          <>
            {/* Adding toggles etc. to the datalayer so they are available to events in Google Tag Manager */}
            <Ga4DataLayer
              consentStatus={this.props.consentStatus}
              data={{ toggles: this.props.toggles }}
            />

            {/* Removing/readding this script on consent changes causes issues with meta tag duplicates
            https://github.com/wellcomecollection/wellcomecollection.org/pull/10685#discussion_r1516298683
            Let's keep an eye on this issue and consider moving it next to the Segment script when it's fixed */}
            <GoogleTagManager />

            {/* https://github.com/wellcomecollection/wellcomecollection.org/issues/10090 */}
            <PerformanceTimingTrackingScript />

            {/* https://github.com/wellcomecollection/wellcomecollection.org/issues/9286 */}
            <CoreWebVitalsScript />

            {/* TODO: remove style block when Chromium fix https://issues.chromium.org/issues/367758074 */}
            <style
              dangerouslySetInnerHTML={{
                __html: this.props.style,
              }}
            />
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
