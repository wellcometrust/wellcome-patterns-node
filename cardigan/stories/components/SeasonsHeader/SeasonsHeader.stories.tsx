import SeasonsHeader from '@weco/content/components/SeasonsHeader/SeasonsHeader';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import { ImageType } from '@weco/common/model/image';

const image: ImageType = {
  contentUrl:
    'https://images.prismic.io/wellcomecollection/7b0bfd6f-6a12-432f-9040-2c9724cb7605_ep_000832_016.jpg?auto=compress,format&rect=0,0,4000,2250&w=3200&h=1800',
  width: 3200,
  height: 1800,
  alt: '',
  tasl: {
    title: 'Refugee Astronaut by Yinka Shonibare CBE',
    sourceName: 'Wellcome Collection',
  },
};

const headerProps = {
  labels: { labels: [{ text: 'Article' }] },
  title: 'What does it mean to be human, now?',
  start: new Date('2021-01-05T00:00:00.000Z'),
  end: new Date('2021-01-26T00:00:00.000Z'),
  FeaturedMedia: <PrismicImage image={image} quality="low" />,
  standfirst: [
    {
      type: 'paragraph',
      text: 'Throughout history, pandemics have been powerful engines of change, exposing structural inequalities in the distribution of health and wealth.',
      spans: [],
    },
  ],
};

const Template = args => <SeasonsHeader {...args} />;
export const basic = Template.bind({});
basic.args = {
  labels: headerProps.labels,
  title: headerProps.title,
  start: headerProps.start,
  end: headerProps.end,
  standfirst: headerProps.standfirst,
  FeaturedMedia: headerProps.FeaturedMedia,
};
basic.storyName = 'SeasonsHeader';
