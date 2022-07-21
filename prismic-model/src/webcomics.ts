import title from './parts/title';
import list from './parts/list';
import { documentLink } from './parts/link';
import promo from './parts/promo';
import articleBody from './parts/article-body';
import contributorsWithTitle from './parts/contributorsWithTitle';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const webcomics: CustomType = {
  id: 'webcomics',
  label: 'Webcomic',
  repeatable: true,
  status: false,
  json: {
    Webcomic: {
      title,
      format: documentLink({ label: 'Format', linkMask: 'article-formats' }),
      image: {
        type: 'Image',
        config: {
          label: 'Webcomic',
        },
      },
      body: articleBody,
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
    'Content relationships': {
      series: list('Series', {
        series: documentLink({ label: 'Series', linkMask: 'webcomic-series' }),
      }),
    },
    Overrides: {
      publishDate: {
        config: {
          label:
            'Override publish date rendering. This will not affect ordering',
        },
        type: 'Timestamp',
      },
    },
  },
};

export default webcomics;
