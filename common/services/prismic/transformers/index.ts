import { Tasl } from '../../../model/tasl';
import { licenseTypeArray } from '../../../model/license';
import linkResolver from '../link-resolver';
import {
  isFilledLinkToDocument,
  isFilledLinkToMediaField,
  isFilledLinkToWebField,
} from '../types';
import * as prismicH from '@prismicio/helpers';
import * as prismicT from '@prismicio/types';

export function transformTaslFromString(pipedString: string | null): Tasl {
  if (pipedString === null) {
    return { title: '' };
  }

  // We expect a string of title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink
  // e.g. Self|Rob Bidder|||CC-BY-NC
  try {
    const list = (pipedString || '').split('|');

    if (list.length > 7) {
      throw new Error('TASL has more than 7 elements');
    }

    const v = list
      .concat(Array(7 - list.length))
      .map(v => (!v.trim() ? undefined : v.trim()));

    const [
      title,
      author,
      sourceName,
      sourceLink,
      maybeLicense,
      copyrightHolder,
      copyrightLink,
    ] = v;
    const license = licenseTypeArray.find(l => l === maybeLicense);
    return {
      title,
      author,
      sourceName,
      sourceLink,
      license,
      copyrightHolder,
      copyrightLink,
    };
  } catch (e) {
    console.warn(`Unable to parse TASL from input (${pipedString}): ${e}`);
    return {
      title: pipedString,
    };
  }
}

export function transformLink(
  link?: prismicT.LinkField<string, string, any>
): string | undefined {
  if (link) {
    if (isFilledLinkToWebField(link) || isFilledLinkToMediaField(link)) {
      return link.url;
    } else if (isFilledLinkToDocument(link)) {
      return linkResolver(link);
    } else {
      console.warn(`Unable to construct link for ${JSON.stringify(link)}`);
    }
  }
}

/** Transform a Prismic timestamp into a JavaScript date.
 *
 * Note: this is preferable to passing a value to the `Date` constructor
 * (i.e. `new Date(…)`) because it handles the timezone offset which is present
 * in Prismic timestamps, whereas some older browsers can't parse that.
 *
 */
export function transformTimestamp(
  field: prismicT.TimestampField
): Date | undefined {
  return prismicH.asDate(field) || undefined;
}
