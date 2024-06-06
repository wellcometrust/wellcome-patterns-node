/**
 * Most documents would live in the content app, but because these are universal,
 * i.e opening times, global alert, and the popup dialog, we have them in common
 */
import * as prismic from '@prismicio/client';
import {
  GlobalAlertDocument,
  PopupDialogDocument,
} from '@weco/common/prismicio-types';

export type DayField = prismic.GroupField<{
  startDateTime: prismic.TimestampField;
  endDateTime: prismic.TimestampField;
}>;

export type ModifiedDayOpeningTime = {
  overrideDate: prismic.TimestampField;
  type: prismic.SelectField<
    | 'Bank holiday'
    | 'Easter'
    | 'Christmas and New Year'
    | 'Late Spectacular'
    | 'other'
  >;
  startDateTime: prismic.TimestampField;
  endDateTime: prismic.TimestampField;
};

export function emptyPrismicQuery<
  T extends prismic.PrismicDocument,
>(): prismic.Query<T> {
  return {
    page: 1,
    results_per_page: 0,
    results_size: 0,
    total_results_size: 0,
    total_pages: 0,
    next_page: null,
    prev_page: null,
    results: [] as T[],
  };
}

export function emptyDocument<T extends prismic.PrismicDocumentWithoutUID>(
  data: T['data']
): prismic.PrismicDocumentWithoutUID<T['data']> {
  return {
    id: '',
    uid: null,
    url: null,
    type: '',
    href: '',
    tags: [],
    first_publication_date: '2020-06-29T15:13:27+0000',
    last_publication_date: '2020-06-29T15:13:27+0000',
    slugs: [],
    linked_documents: [],
    lang: 'en-gb',
    alternate_languages: [],
    data,
  };
}

export function emptyGlobalAlert(
  overrides: Partial<GlobalAlertDocument['data']> = {}
): GlobalAlertDocument {
  return emptyDocument<GlobalAlertDocument>({
    isShown: 'hide',
    routeRegex: null,
    text: [],
    ...overrides,
  }) as GlobalAlertDocument;
}

export function emptyPopupDialog(): PopupDialogDocument {
  return emptyDocument<PopupDialogDocument>({
    isShown: false,
    link: { link_type: 'Web' },
    linkText: null,
    openButtonText: null,
    text: [],
    title: null,
  }) as PopupDialogDocument;
}
