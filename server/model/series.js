// @flow
import {List} from 'immutable';
import {type Promo} from './promo';
import {type ArticleStub} from './article-stub';
import {type Pagination} from '../controllers/index';
import {series} from '../data/series';

type ChapterColor =
  | 'purple'
  | 'red'
  | 'orange'
  | 'turquoise';

export type ArticleSeries = {|
  url: string;
  name: string;
  description?: string;
  commissionedLength?: ?number;
|}

export type Series = {|
  url: string;
  name: string;
  description?: string;
  commissionedLength?: ?number;
  items: List<ArticleStub>;
  total: number;
  color: ChapterColor;
|}

// Anything below is a massive hack due to the fact that we don't have a CMS that
// supports our concept or series.
export function getUnpublishedSeries(seriesId: String): ?Series {
  return series.find(s => s.url === seriesId);
}

export function getForwardFill(series: Series): List<ArticleStub> {
  const forwardFill = getUnpublishedSeries(series.url);

  if (forwardFill) {
    const missingCount = forwardFill.commissionedLength - series.items.size;
    const usefulForwardFill = forwardFill.items.takeLast(missingCount);
    const newSeriesItems = series.items.concat(usefulForwardFill);
    series.items = newSeriesItems;
  }

  return series;
}
