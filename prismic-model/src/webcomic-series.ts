// This has been deprecated and we should be using the article format of comic
// and general article series.
import title from './parts/title';
import structuredText from './parts/structured-text';
import promo from './parts/promo';
import contributorsWithTitle from './parts/contributorsWithTitle';
import { CustomType } from './types/CustomType';

const webcomicSeries: CustomType = {
  id: 'webcomic-series',
  label: '[Deprecated] Webcomic series',
  repeatable: true,
  status: false,
  json: {
    '[Deprecated] Webcomic series': {
      title: title,
      description: structuredText({ label: 'Description' }),
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

export default webcomicSeries;
