import structuredText from './parts/structured-text';
import select from './parts/select';
import text from './parts/text';
import { CustomType } from './types/CustomType';

const globalAlert: CustomType = {
  id: 'global-alert',
  label: 'Global alert',
  repeatable: false,
  status: true,
  json: {
    'Global alert': {
      text: structuredText({
        label: 'text',
        singleOrMulti: 'multi',
        extraHtmlTypes: ['heading2'],
        placeholder: 'text',
      }),
      isShown: select('Display', ['hide', 'show'], 'hide', 'Show or hide'),
      routeRegex: text(
        'Write a pipe-separated (|) list of page paths here if you only want the alert to display on certain pages. Leave empty if you want the alert to appear on all pages.',
        'path(s) to match'
      ),
    },
  },
};

export default globalAlert;
