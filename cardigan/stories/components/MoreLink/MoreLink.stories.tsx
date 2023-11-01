import MoreLink from '@weco/content/components/MoreLink/MoreLink';
import Readme from '@weco/content/components/MoreLink/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={MoreLink} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  url: '#',
  name: 'View all exhibitions',
};
basic.storyName = 'MoreLink';
