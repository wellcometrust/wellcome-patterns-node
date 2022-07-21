import title from './parts/title';
import promo from './parts/promo';
import body from './parts/body';
import contributorsWithTitle from './parts/contributorsWithTitle';
import { documentLink } from './parts/link';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const eventSeries: CustomType = {
  id: 'event-series',
  label: 'Event series',
  repeatable: true,
  status: true,
  json: {
    'Event series': {
      title,
      backgroundTexture: documentLink({
        label: 'Background texture',
        linkMask: 'background-textures',
      }),
      body,
    },
    Contributors: contributorsWithTitle(),
    Promo: {
      promo,
    },
    Metadata: {
      metadataDescription: structuredText({
        label: 'Metadata description',
        singleOrMulti: 'single',
      }),
    },
  },
};

export default eventSeries;
