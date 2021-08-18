import { setConfig } from 'next/config';
import { whatsOn } from '@weco/common/test/fixtures/pages/whats-on';
import { mountWithTheme } from '@weco/common/test/fixtures/enzyme-helpers';

const apmConfig = {
  environment: 'dev',
  serverUrl: 'https://apm',
  centralConfig: true,
};
setConfig({
  publicRuntimeConfig: { ...apmConfig },
});

// We pull in the page after we've set the config
const WhatsOnPage = require('../../pages/whats-on').default;

const featuredExhibitionSelector = '[data-test-id="featured-exhibition"]';
const noExhibitionsSelector = '[data-test-id="no-exhibitions"]';

describe('/whats-on', () => {
  it('renders a featured exhibition when there is one', () => {
    const pageWithExhibition = mountWithTheme(
      <WhatsOnPage {...whatsOn(true)} />
    );
    expect(pageWithExhibition.exists(featuredExhibitionSelector)).toBe(true);
    expect(pageWithExhibition.exists(noExhibitionsSelector)).toBe(false);
  });

  it('renders no exhibitions when there are none', () => {
    const pageWithoutExhibition = mountWithTheme(
      <WhatsOnPage {...whatsOn(false)} />
    );
    expect(pageWithoutExhibition.exists(featuredExhibitionSelector)).toBe(
      false
    );
    expect(pageWithoutExhibition.exists(noExhibitionsSelector)).toBe(true);
  });
});
