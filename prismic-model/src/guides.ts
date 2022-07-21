import title from './parts/title';
import body from './parts/body';
import promo from './parts/promo';
import { documentLink } from './parts/link';
import timestamp from './parts/timestamp';
import structuredText from './parts/structured-text';
import boolean from './parts/boolean';
import { CustomType } from './types/CustomType';

const guides: CustomType = {
  id: 'guides',
  label: 'Guide',
  repeatable: true,
  status: true,
  json: {
    Guide: {
      title,
      format: documentLink({ label: 'Format', linkMask: 'guide-formats' }),
      datePublished: timestamp('Date published'),
      showOnThisPage: boolean(
        "Show 'On this page' anchor links. This will only appear if there are more than 2 H2s in the body",
        false
      ),
      body,
    },
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

export default guides;
