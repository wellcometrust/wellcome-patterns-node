import structuredText from './parts/structured-text';
import title from './parts/title';
import image from './parts/image';
import link, { documentLink } from './parts/link';
import { CustomType } from './types/CustomType';

const card: CustomType = {
  id: 'card',
  label: 'Card',
  repeatable: true,
  status: true,
  json: {
    Card: {
      title,
      format: documentLink({
        label: 'Format',
        linkMask: ['event-formats', 'article-formats', 'labels'],
      }),
      description: structuredText({
        label: 'Description',
        singleOrMulti: 'single',
      }),
      image: image('Image'),
      link: link('Link'),
    },
  },
};

export default card;
