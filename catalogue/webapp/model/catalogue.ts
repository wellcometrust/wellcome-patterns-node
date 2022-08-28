import {
  Concept,
  ConceptAggregations,
  Image,
  ImageAggregations,
  Work,
  WorkAggregations,
} from '@weco/common/model/catalogue';

export type ResultType = Work | Image | Concept;

export type CatalogueResultsList<Result extends ResultType> = {
  type: 'ResultList';
  totalResults: number;
  totalPages: number;
  results: Result[];
  pageSize: number;
  prevPage: string | null;
  nextPage: string | null;
  aggregations?: Result extends Work
    ? WorkAggregations
    : Result extends Image
    ? ImageAggregations
    : Result extends Concept
    ? ConceptAggregations
    : null;
};
