import Placeholder from '@weco/content/components/Placeholder/Placeholder';
import Readme from '@weco/content/components/Placeholder/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={Placeholder} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  isLoading: true,
  nRows: 1,
};
basic.storyName = 'Placeholder';
