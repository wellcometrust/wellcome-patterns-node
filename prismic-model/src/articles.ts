import title from './parts/title';
import promo from './parts/promo';
import list from './parts/list';
import link, { documentLink } from './parts/link';
import number from './parts/number';
import articleBody from './parts/article-body';
import contributorsWithTitle from './parts/contributorsWithTitle';
import singleLineText from './parts/single-line-text';
import structuredText from './parts/structured-text';
import { CustomType } from './types/CustomType';

const articles: CustomType = {
  id: 'articles',
  label: 'Story',
  repeatable: true,
  status: true,
  json: {
    Story: {
      title,
      format: documentLink({ label: 'Format', linkMask: 'article-formats' }),
      body: articleBody,
    },
    Outro: {
      outroResearchItem: link('Outro: Research item'),
      outroResearchLinkText: singleLineText('Outro: Research link text'),
      outroReadItem: link('Outro: Read item'),
      outroReadLinkText: singleLineText('Outro: Read link text'),
      outroVisitItem: link('Outro: Visit item'),
      outroVisitLinkText: singleLineText('Outro: Visit link text'),
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
        series: documentLink({ label: 'Series', linkMask: 'series' }),
        positionInSeries: number('Position in series'),
      }),
      seasons: list('Seasons', {
        season: documentLink({
          label: 'Season',
          linkMask: 'seasons',
          placeholder: 'Select a Season',
        }),
      }),
      parents: list('Parents', {
        order: number('Order'),
        parent: documentLink({
          label: 'Parent',
          linkMask: 'exhibitions',
          placeholder: 'Select a parent',
        }),
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

export default articles;
