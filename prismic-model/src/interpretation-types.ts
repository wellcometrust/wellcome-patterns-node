import title from './parts/title';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const interpretationTypes: CustomType = {
  id: 'interpretation-types',
  label: 'Interpretation type',
  repeatable: true,
  status: true,
  json: {
    'Interpretation type': {
      title,
      // TODO: This should be a Key text field
      // see: https://prismic.io/docs/core-concepts/key-text
      abbreviation: structuredText({
        label: 'Abbreviation',
        singleOrMulti: 'single',
        overrideDefaultHtmlTypes: ['paragraph'],
      }),
      description: structuredText({ label: 'Message' }),
      primaryDescription: structuredText({
        label: 'Message if primary interpretation',
        singleOrMulti: 'multi',
      }),
    },
  },
};

export default interpretationTypes;
