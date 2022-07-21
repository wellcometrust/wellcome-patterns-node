import text from './parts/text';
import description from './parts/description';
import image from './parts/image';
import list from './parts/list';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const people: CustomType = {
  id: 'people',
  label: 'Person',
  repeatable: true,
  status: true,
  json: {
    Person: {
      name: text('Full name'),
      description: description,
      pronouns: text('Pronouns'),
      image: image('Image'),
      sameAs: list('Same as', {
        link: text('Link'),
        title: structuredText({ label: 'Link text', singleOrMulti: 'single' }),
      }),
    },
  },
};

export default people;
