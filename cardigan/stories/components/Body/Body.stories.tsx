import Body from '@weco/content/components/Body/Body';
import {
  captionedImage,
  text as textContent,
  videoEmbed,
  imageGallery,
  quote,
} from '@weco/cardigan/stories/content';

const Template = args => <Body {...args} />;
export const basic = Template.bind({});
basic.args = {
  body: [
    {
      type: 'picture',
      value: captionedImage(),
    },
    {
      type: 'text',
      value: textContent(),
    },
    {
      type: 'videoEmbed',
      value: videoEmbed,
    },
    {
      type: 'text',
      value: textContent(),
    },
    {
      type: 'imageGallery',
      value: imageGallery(),
    },
    {
      type: 'text',
      value: textContent(),
    },
    {
      type: 'quote',
      value: quote(),
    },
  ],
};
basic.storyName = 'Body';
