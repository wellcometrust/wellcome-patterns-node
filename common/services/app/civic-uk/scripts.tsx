const CivicUK = () => (
  <>
    <script
      src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
      type="text/javascript"
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `CookieControl.load({
            product: 'COMMUNITY',
            apiKey: '5a1b492f47fac442240976a4f991ad92278ef15a',
            product: 'pro',
            branding: { removeIcon: true }, 
            necessaryCookies: ['toggle_*'],
            optionalCookies: [
              {
                name: 'analytics',
                label: 'Google Analytics, Segment, HotJar',
                description: 'Analytical cookies help us to improve our website by collecting and reporting information on its usage.',
                cookies: ['_ga', '_ga*', '_gid', '_gat', '__utma', '__utmt', '__utmb', '__utmc', '__utmz', '__utmv'],
                onAccept: function () {
                  const event = new CustomEvent('analyticsConsentAccepted', {});
                  window.dispatchEvent(event);
                },
                onRevoke: function () {
                  const event = new CustomEvent('analyticsConsentRejected', {});
                  window.dispatchEvent(event);
                }
              }
            ],
          });`,
      }}
    />
  </>
);

export default CivicUK;
