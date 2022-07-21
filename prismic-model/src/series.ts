import title from './parts/title';
import promo from './parts/promo';
import body from './parts/body';
import contributorsWithTitle from './parts/contributorsWithTitle';
import list from './parts/list';
import select from './parts/select';
import timestamp from './parts/timestamp';
import structuredText from './parts/structured-text';
import { documentLink } from './parts/link';
import { CustomType } from './types/CustomType';

// This is called `ArticleSeries` and the id `series`, as it was a
// mistake we made way back when when all we were doing was articles
const articleSeries: CustomType = {
  id: 'series',
  label: 'Story series',
  repeatable: true,
  status: true,
  json: {
    'Story series': {
      title: title,
      color: select('Colour', ['green', 'purple', 'red', 'teal']),
      body,
    },
    Schedule: {
      schedule: list('Schedule', {
        title: title,
        publishDate: timestamp('Date to be published'),
      }),
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
      seasons: list('Seasons', {
        season: documentLink({
          label: 'Season',
          linkMask: 'seasons',
          placeholder: 'Select a Season',
        }),
      }),
    },
  },
};

export default articleSeries;
