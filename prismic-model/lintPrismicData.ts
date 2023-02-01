/** This script runs some linting rules against a snapshot of Prismic.
 *
 * It's meant to help us find issues in the data that need to be fixed in
 * Prismic.  Unfortunately Prismic itself doesn't allow us to configure
 * this linting directly in the CMS, so we have to run it against a snapshot.
 *
 * See https://prismic.io/blog/required-fields
 */

import chalk from 'chalk';
import { error } from './console';
import {
  downloadPrismicSnapshot,
  getPrismicDocuments,
} from './downloadSnapshot';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

// Look for eur01 safelinks.  These occur when somebody has copied
// a URL directly from Outlook and isn't using the original URL.
//
// This is a very crude check; we could recurse further down into
// the object to get more debugging information, but I hope this
// is good enough for now.
function detectEur01Safelinks(doc: any): string[] {
  if (
    JSON.stringify(doc).indexOf(
      'https://eur01.safelinks.protection.outlook.com'
    ) !== -1
  ) {
    return [
      'One of the links is an eur01.safelinks URL, which has probably been copy/pasted from an email. Replace this URL with an un-safelink’d version.',
    ];
  }

  return [];
}

// Look for broken links to interpretation types on events.
//
// These manifest as small black squares (on promo cards) or small yellow
// squares (on the event pages).
//
// See e.g. https://wellcome.slack.com/archives/C8X9YKM5X/p1662107045936069
function detectBrokenInterpretationTypeLinks(doc: any): string[] {
  if (doc.type === 'events') {
    const brokenLinks = doc.data.interpretations.filter(
      it => it.interpretationType.type === 'broken_type'
    );

    if (brokenLinks.length > 0) {
      return [
        'This event has a broken link to an interpretation type; remove or update the link.',
      ];
    }
  }

  return [];
}

// Contributor links that don't begin with http or https will be treated as
// relative URLs on the front-end, e.g. www.example.com becomes wc.org/articles/www.example.com.
//
// This obviously isn't what we want; this will find any cases where the link
// doesn't have an http[s] prefix.
function detectNonHttpContributorLinks(doc: any): string[] {
  if (doc.type === 'people' || doc.type === 'organisations') {
    for (const sameAs of doc.data.sameAs) {
      const { link } = sameAs;

      if (
        link === null ||
        link.indexOf('http://') === 0 ||
        link.indexOf('https://') === 0
      ) {
        continue;
      }

      return [
        'This contributor has a URL which doesn’t start with http:// or https://, replace it with a complete link',
      ];
    }
  }

  return [];
}

// Stories without a Promo image should be rare as they are considered required now
// But older articles won't necessarily have them.
//
// We'll consider a default/fallback option, but for now we want to find out which ones
// are causing issue.
function detectNonPromoImageStories(doc: any): string[] {
  if (doc.type === 'articles') {
    if (!doc.data.promo[0]) {
      return ['This article has no promo image, please add one.'];
    } else if (!doc.data.promo[0].primary?.image?.square) {
      // getCrop won't work without square/ratioed layouts and therefore won't render an image
      // on the front end.
      return [
        "This article's promo image has no square layout, re-add the image and save it to fix.",
      ];
    }
  }

  return [];
}

async function run() {
  const snapshotFile = await downloadPrismicSnapshot();

  let totalErrors = 0;
  const allErrors = [];

  for (const doc of getPrismicDocuments(snapshotFile)) {
    const errors = [
      ...detectEur01Safelinks(doc),
      ...detectBrokenInterpretationTypeLinks(doc),
      ...detectNonHttpContributorLinks(doc),
      ...detectNonPromoImageStories(doc),
    ];

    totalErrors += errors.length;

    // If there are any errors, report them to the console.
    if (errors.length > 0) {
      allErrors.push({
        id: doc.id,
        type: doc.type,
        title: doc.data.title,
        errors,
      });

      console.log(
        chalk.blue(
          `https://wellcomecollection.prismic.io/documents~b=working&c=published&l=en-gb/${doc.id}/`
        )
      );
      for (const msg of errors) {
        console.log(`- ${msg}`);
      }
      console.log('');
    }
  }

  const s3Client = new S3Client({ region: 'eu-west-1' });

  console.log('Uploading Prismic linting reporting to S3');
  const putObjectCommand = new PutObjectCommand({
    Bucket: 'dash.wellcomecollection.org',
    Key: 'prismic-linting/report.json',
    Body: JSON.stringify({
      errors: allErrors,
      totalErrors,
      ref: snapshotFile.split('.')[snapshotFile.split('.').length - 1],
      createdDate: new Date().toString(),
    }),
    ACL: 'public-read',
    ContentType: 'application/json',
  });

  await s3Client.send(putObjectCommand);

  const cloudFrontClient = new CloudFrontClient({ region: 'eu-west-1' });
  const command = new CreateInvalidationCommand({
    DistributionId: 'EIOS79GG23UUY',
    InvalidationBatch: {
      Paths: { Items: [`/prismic-linting/report.json`], Quantity: 1 },
      CallerReference: `PrismicModelInvalidationCallerReference${Date.now()}`,
    },
  });
  await cloudFrontClient.send(command);

  if (totalErrors === 0) {
    console.log(chalk.green('✅ No errors detected'));
  } else {
    console.log(
      chalk.red(`🚨 ${totalErrors} error${totalErrors > 1 ? 's' : ''} detected`)
    );
    process.exit(1);
  }
}

run().catch(err => {
  error(err);
  process.exit(1);
});
