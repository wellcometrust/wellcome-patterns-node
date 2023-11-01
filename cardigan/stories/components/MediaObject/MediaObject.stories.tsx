import { MediaObject } from '@weco/content/components/MediaObject/MediaObject';
import { mockData } from '@weco/common/test/fixtures/components/media-object';
import { mockImage } from '@weco/common/test/fixtures/components/compact-card';
import Readme from '@weco/content/components/MediaObject/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={MediaObject} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  title: mockData.title,
  text: mockData.text,
  image: mockImage,
};
basic.storyName = 'MediaObject';
