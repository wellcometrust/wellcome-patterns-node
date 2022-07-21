import title from './parts/title';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const audiences: CustomType = {
  id: 'audiences',
  label: 'Audience',
  repeatable: true,
  status: true,
  json: {
    Audience: {
      title,
      description: structuredText({
        label: 'Description',
        singleOrMulti: 'single',
      }),
    },
  },
};

export default audiences;
