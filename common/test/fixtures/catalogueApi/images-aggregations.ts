import { HasImageAggregations } from '../../../model/catalogue';

const aggregations: HasImageAggregations = {
  aggregations: {
    license: {
      buckets: [
        {
          data: {
            id: 'cc-0',
            label: 'CC0 1.0 Universal',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cc-by',
            label: 'Attribution 4.0 International (CC BY 4.0)',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cc-by-nc',
            label: 'Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'cc-by-nc-nd',
            label:
              'Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'inc',
            label: 'In copyright',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
        {
          data: {
            id: 'pdm',
            label: 'Public Domain Mark',
            type: 'License',
          },
          count: 0,
          type: 'AggregationBucket',
        },
      ],
      type: 'Aggregation',
    },
    type: 'Aggregations',
  },
};

export default aggregations;
