import SectionHeader from '@weco/content/components/SectionHeader/SectionHeader';
import Readme from '@weco/content/components/SectionHeader/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={SectionHeader}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});
basic.args = {
  title: 'You may have missed',
};
basic.storyName = 'SectionHeader';
