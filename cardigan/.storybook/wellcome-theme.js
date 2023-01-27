import { create } from '@storybook/theming';
import { themeValues } from '@weco/common/views/themes/config';
import logo from '../public/images/favicon.ico';

export default create({
  base: 'light',
  brandTitle: 'Cardigan',
  brandUrl: 'https://wellcomecollection.org',
  brandImage:`/${logo}`,
  fontBase: '"Inter", sans-serif',
});
