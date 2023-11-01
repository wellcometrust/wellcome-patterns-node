import Footer from '@weco/common/views/components/Footer';
import { venues } from '@weco/common/test/fixtures/components/venues';
import Readme from '@weco/common/views/components/Footer/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={Footer} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  venues,
};
basic.storyName = 'Footer';
