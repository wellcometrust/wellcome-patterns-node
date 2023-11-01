import { CopyUrl, CopyContent } from '@weco/content/components/CopyButtons';
import Readme from '@weco/content/components/CopyButtons/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import { singleLineOfText } from '../../content';

const CopyUrlTemplate = args => (
  <ReadmeDecorator WrappedComponent={CopyUrl} args={args} Readme={Readme} />
);
export const copyUrl = CopyUrlTemplate.bind({});
copyUrl.args = {
  id: 't59c279p',
  url: 'https://wellcomecollection.org/works/t59c279p',
};
copyUrl.storyName = 'CopyUrl';

const CopyContentTemplate = args => (
  <ReadmeDecorator WrappedComponent={CopyContent} args={args} Readme={Readme} />
);
export const copyContent = CopyContentTemplate.bind({});
const content = singleLineOfText();
copyContent.args = {
  CTA: 'Copy credit information',
  content,
  displayedContent: <p>{content}</p>,
};
copyContent.storyName = 'CopyContent';
