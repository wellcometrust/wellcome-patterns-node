import { CustomType } from './types/CustomType';
import title from './parts/title';
import link from './parts/link';
import list from './parts/list';
import image from './parts/image';
import structuredText from './parts/structured-text';
import embed from './parts/embed';
import contributorsWithTitle from './parts/contributorsWithTitle';
import number from './parts/number';

const exhibitionGuides: CustomType = {
  id: 'exhibition-guides',
  label: 'Exhibition Guide',
  repeatable: true,
  status: true,
  json: {
    Guide: {
      title,
      'related-content': link('Related document, e.g. Exhibition', 'document', [
        'exhibitions',
      ]),
    },
    // We are providing a repeatable list of guide components which could be:
    // A gallery section, a subsection, or a stop within those sections
    // We did have an extra field 'partOf' where editors can indicate what section or subsection
    // a stop is related to, but removed this to get a first iteration and think about hierarchy structure later
    Component: {
      components: list('Guide Component', {
        number: number('Position number'),
        title,
        creator: contributorsWithTitle(),
        image: image('image'),
        description: structuredText('Description', 'single'),
        'audio-with-description': link('Audio', 'media', []),
        'audio-without-description': link('Audio', 'media', []),
        'bsl-video': embed('Embed (Youtube)'),
        caption: structuredText('Caption', 'single'),
        transcript: structuredText('Transcript', 'single'),
      }),
    },
  },
};

export default exhibitionGuides;
