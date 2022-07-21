import structuredText from './parts/structured-text';
import text from './parts/text';
import boolean from './parts/boolean';
import link, { webLink } from './parts/link';
import { CustomType } from './types/CustomType';

const popupDialog: CustomType = {
  id: 'popup-dialog',
  label: 'Popup dialog',
  repeatable: false,
  status: true,
  json: {
    'Popup dialog': {
      openButtonText: text('Open button text'),
      title: text('Title inside the open dialog'),
      text: structuredText({
        label: 'Text inside the open dialog',
        singleOrMulti: 'single',
      }),
      linkText: text('CTA inside the open dialog button text'),
      link: webLink({ label: 'CTA inside the open dialog button link' }),
      isShown: boolean('Is shown?', false),
    },
  },
};

export default popupDialog;
