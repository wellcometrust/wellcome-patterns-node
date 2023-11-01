import ImagePlaceholder from '@weco/content/components/ImagePlaceholder/ImagePlaceholder';
import Readme from '@weco/content/components/ImagePlaceholder/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={ImagePlaceholder}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});
basic.args = {
  backgroundColor: 'accent.blue',
};
basic.storyName = 'ImagePlaceholder';
