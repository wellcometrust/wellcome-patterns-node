// @flow
import title from './parts/title';
import body from './parts/body';
import promo from './parts/promo';
import link from './parts/link';
import list from './parts/list';
import text from './parts/text';
import timestamp from './parts/timestamp';
import structuredText from './parts/structured-text';

const Page = {
  Page: {
    title,
    datePublished: timestamp('Date published'),
    body,
  },
  Promo: {
    promo,
  },
  Metadata: {
    metadataDescription: structuredText('Metadata description', 'single'),
  },
  'Content relationships': {
    seasons: list('Seasons', {
      season: link('Season', 'document', ['seasons'], 'Select a Season'),
    }),
    landingPages: list('Landing pages', {
      landingPage: link(
        'Landing page',
        'document',
        ['landing-pages'],
        'Select a Landing page'
      ),
    }),
  },
  // TODO: (drupal migration) Remove this
  Migration: {
    drupalPromoImage: link('Drupal promo image', 'web'),
    drupalNid: text('Drupal node ID'),
    drupalPath: text('Drupal path'),
  },
};

export default Page;
