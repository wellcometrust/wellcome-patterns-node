import { image, singleLineOfText } from '@weco/cardigan/stories/content';
import BookPromo from '@weco/content/components/BookPromo/BookPromo';

const Template = args => <BookPromo {...args} />;

export const basic = Template.bind({});
basic.args = {
  book: {
    id: 'cardigan',
    cover: image(
      'https://images.prismic.io/wellcomecollection/1e958377a9f21d49a5de6578212e02ad4381d473_9781781254875_0.png?auto=compress,format',
      575,
      884
    ),
    title: singleLineOfText(),
    subtitle: singleLineOfText(),
  },
};
basic.storyName = 'BookPromo';
basic.parameters = {
  gridSizes: { s: 12, m: 6, l: 4, xl: 4 },
  chromatic: { diffThreshold: 0.2 },
};
