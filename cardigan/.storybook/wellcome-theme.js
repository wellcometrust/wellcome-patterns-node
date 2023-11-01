import { create } from '@storybook/theming';
import logo from '../public/images/favicon.ico';

export default create({
  base: 'light',
  brandTitle: 'Cardigan',
  brandUrl: 'https://wellcomecollection.org',
  brandImage:`/${logo}`,
  fontBase: '"Inter", sans-serif',
});
