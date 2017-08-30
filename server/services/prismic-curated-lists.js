import Prismic from 'prismic-javascript';
import {prismicApi} from './prismic-api';

export async function getCuratedList(id: string) {
  const fetchLinks = [
    'series.name', 'series.description', 'series.commissionedLength', 'series.color', 'series.wordpressSlug'
  ];
  const prismic = await prismicApi();
  const curatedLists = await prismic.query([
    Prismic.Predicates.at('my.curated-lists.uid', id),
    Prismic.Predicates.at('document.type', 'curated-lists')
  ], {fetchLinks});

  const curatedList = curatedLists.results.length > 0 && curatedLists.results[0];

  if (!curatedList) {
    return null;
  }

  return curatedList;
}
