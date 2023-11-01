import FeaturedText from '@weco/content/components/FeaturedText/FeaturedText';
import Readme from '@weco/content/components/FeaturedText/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={FeaturedText}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});
basic.args = {
  html: [
    {
      type: 'paragraph',
      text: 'Walk inside an innovative mobile clinic, and follow its development from the early prototypes to the first complete version.',
      spans: [],
    },
  ],
};
basic.storyName = 'FeaturedText';
