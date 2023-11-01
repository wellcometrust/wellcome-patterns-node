import TagsGroup from '@weco/content/components/TagsGroup/TagsGroup';
import Readme from '@weco/content/components/TagsGroup/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={TagsGroup} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  title: 'Listen or subscribe on',
  tags: [
    {
      textParts: ['SoundCloud'],
      linkAttributes: {
        href: { pathname: '/', query: '' },
        as: { pathname: '/', query: '' },
      },
    },
    {
      textParts: ['Google Podcasts'],
      linkAttributes: {
        href: { pathname: '/', query: '' },
        as: { pathname: '/', query: '' },
      },
    },
    {
      textParts: ['Spotify'],
      linkAttributes: {
        href: { pathname: '/', query: '' },
        as: { pathname: '/', query: '' },
      },
    },
    {
      textParts: ['Apple'],
      linkAttributes: {
        href: { pathname: '/', query: '' },
        as: { pathname: '/', query: '' },
      },
    },
    {
      textParts: ['Player'],
      linkAttributes: {
        href: { pathname: '/', query: '' },
        as: { pathname: '/', query: '' },
      },
    },
  ],
};
basic.storyName = 'TagsGroup';
