import { ArticleAggregations, EventAggregations } from './api';

export type { ArticleAggregations, EventAggregations };

// Response objects
export type ContentApiError = {
  errorType: string;
  httpStatus: number;
  label: string;
  description: string;
  type: 'Error';
};
