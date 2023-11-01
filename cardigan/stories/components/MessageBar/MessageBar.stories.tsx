import MessageBar from '@weco/content/components/MessageBar/MessageBar';
import Readme from '@weco/content/components/MessageBar/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={MessageBar} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  tagText: 'Smoke test',
  children: (
    <>
      Things may not always be what they seem.
      <a href="/works/progress">Find out more</a>.
    </>
  ),
};
basic.storyName = 'MessageBar';
