import Head from 'next/head';
import { useEffect, useState } from 'react';
import CivicUK from './ConsentAndScripts.CivicUK';
import { getAnalyticsConsentState } from '@weco/common/services/app/civic-uk';

const ConsentAndScripts = ({ segmentSnippet }: { segmentSnippet: string }) => {
  const [consentState, setConsentState] = useState(false);

  const onAnalyticsConsentChanged = (
    event: CustomEvent<{ consent: 'granted' | 'denied' }>
  ) => {
    // Toggle rendering of scripts
    setConsentState(event.detail.consent === 'granted');

    // Update datalayer config with consent value
    gtag('consent', 'update', {
      analytics_storage: event.detail.consent,
    });
  };

  useEffect(() => {
    setConsentState(getAnalyticsConsentState());

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

  return (
    <>
      {consentState && (
        <Head>
          <script dangerouslySetInnerHTML={{ __html: segmentSnippet }} />
        </Head>
      )}

      <CivicUK />
    </>
  );
};

export default ConsentAndScripts;
