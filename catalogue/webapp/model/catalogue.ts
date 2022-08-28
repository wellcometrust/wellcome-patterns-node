import {
  Concept,
  ConceptAggregations,
  Image,
  ImageAggregations,
  WorkAggregations,
  DigitalLocation,
  Work,
} from '@weco/common/model/catalogue';

import { Label } from '@weco/common/model/labels';
import {
  ArchiveLabels,
  getArchiveLabels,
  getCardLabels,
  getProductionDates,
} from '../utils/works';

export type ResultType = Work | WorkBasic | Image | Concept;

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
    : Result extends WorkBasic
    ? WorkAggregations
    : Result extends Image
    ? ImageAggregations
    : Result extends Concept
    ? ConceptAggregations
    : null;
};

// This is a minimal subset of the Work fields, enough to render a search
// result, but nothing more.
export type WorkBasic = {
  id: string;
  title: string;
  referenceNumber?: string;
  thumbnail?: DigitalLocation;
  archiveLabels?: ArchiveLabels;
  cardLabels: Label[];
  productionDates: string[];
  primaryContributorLabel?: string;
};

export function transformWorkToWorkBasic(work: Work): WorkBasic {
  const { id, title, referenceNumber, thumbnail } = work;

  const archiveLabels = getArchiveLabels(work);
  const cardLabels = getCardLabels(work);
  const productionDates = getProductionDates(work);
  const primaryContributorLabel = work.contributors.find(
    contributor => contributor.primary
  )?.agent.label;

  return {
    id,
    title,
    referenceNumber,
    thumbnail,
    archiveLabels,
    cardLabels,
    productionDates,
    primaryContributorLabel,
  };
}
