/** This script checks every page against a locally running content app.
  *
  * This is useful when you're doing a major refactor, and you want to check you
  * haven't broken a page.
  * 
  * Note: the validation this provides is limited.  It will tell you that you haven't
  * introduced a 500 error, but it won't tell you if you've broken a component in
  * a non-catastrophic way.
  */

import { error } from './console';
import { downloadPrismicSnapshot } from './downloadSnapshot';
import fs from 'fs';
import fetch from 'node-fetch';

type PrismicDocument = {
  id: string;
  type: string;
};

/** Returns a list of all the Prismic documents in a given snapshot directory. */
function getPrismicDocuments(snapshotDir: string): PrismicDocument[] {
  const documents: PrismicDocument[] = [];

  fs.readdirSync(snapshotDir).forEach(file => {
    const data = fs.readFileSync(`${snapshotDir}/${file}`);
    const json: { results: PrismicDocument[] } = JSON.parse(data.toString());

    documents.push(...json.results);
  });

  return documents;
}

// Prismic content types that have documents, but are only visible when they're linked
// from other types -- they aren't individually addressable.
const nonVisibleTypes = new Set([
  'article-formats',
  'audiences',
  'background-textures',
  'card',
  'collection-venue',
  'editorial-contributor-roles',
  'event-formats',
  'event-policies',
  'exhibition-formats',
  'featured-books',
  'global-alert',
  'guide-formats',
  'interpretation-types',
  'labels',
  'organisations',
  'page-formats',
  'people',
  'places',
  'popup-dialog',
  'project-formats',
  'teams',
]);

function createUrl(prefix: string, { id, type }: PrismicDocument): string {
  switch (type) {
    case 'webcomics':
      return `${prefix}/articles/${id}`;

    case 'webcomic-series':
      return `${prefix}/series/${id}`;

    default:
      return `${prefix}/${type}/${id}`;
  }
}

async function run() {
  const snapshotDir = await downloadPrismicSnapshot();

  const prefix = 'http://localhost:3000';

  const urls = getPrismicDocuments(snapshotDir)
    .filter(({ type }) => !nonVisibleTypes.has(type))
    .map(doc => createUrl(prefix, doc));

  for (const u of urls) {
    const resp = await fetch(u);
    if (resp.status !== 200) {
      error(`${resp.status} ${u}`);
    }
  }
}

run().catch(err => {
  error(err);
  process.exit(1);
});
