import structuredText from './structured-text';
import text from './text';
import link from './link';
import select from './select';
import boolean from './boolean';

export default function () {
  return {
    type: 'Slice',
    fieldset: 'Gif video',
    'non-repeat': {
      caption: structuredText({ label: 'Caption', singleOrMulti: 'single' }),
      tasl: text(
        'TASL',
        'title|author|sourceName|sourceLink|license|copyrightHolder|copyrightLink'
      ),
      video: link('Video', 'media', [], 'Video'),
      playbackRate: select('Playback rate', [
        '0.1',
        '0.25',
        '0.5',
        '0.75',
        '1',
        '1.25',
        '1.5',
        '1.75',
        '2',
      ]),
      autoPlay: boolean('Auto play', true),
      loop: boolean('Loop video', true),
      mute: boolean('Mute video', true),
      showControls: boolean('Show controls', false),
    },
  };
}
