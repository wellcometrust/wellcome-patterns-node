import TitledTextList from '@weco/content/components/TitledTextList/TitledTextList';
import Readme from '@weco/content/components/TitledTextList/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const items = [
  {
    title: '17th-18th century Burney Collection newspapers',
    text: [
      {
        type: 'paragraph',
        text: 'The newspapers and news pamphlets, gathered by the Reverend Charles Burney (1757-1817) include more than 1,000 pamphlets, proclamations, newsbooks and newspapers from the period. Hosted by the British Library.',
        spans: [],
      },
    ],
    link: 'https://wellcomecollection.org',
    label: {
      id: 'YCVHBBUAACgAUxW0',
      title: 'Online',
    },
  },
  {
    title: '19th century British Library newspapers',
    text: [
      {
        type: 'paragraph',
        text: 'A selectio of 19th-century national and local British newspapers held by the British Library. All newsparpers are full text and fully searchable, with full runs of the publication where possible.',
        spans: [],
      },
    ],
    link: 'https://bbc.co.uk',
    label: {
      id: 'YCVHKRUAACoAUxXw',
      title: 'In library',
    },
  },
];

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={TitledTextList}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});
basic.args = {
  items,
};
basic.storyName = 'TitledTextList';
