import InfoBlock from '@weco/content/components/InfoBlock/InfoBlock';
import Readme from '@weco/content/components/InfoBlock/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={InfoBlock} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  title: 'Book your ticket',
  text: [
    {
      type: 'list-item',
      text: 'It’s still free to visit our museum and library. You’ll just need to choose a time slot and book a ticket before you arrive.',
      spans: [],
    },
    {
      type: 'list-item',
      text: 'You can explore the museum for as long as you’d like, but  library sessions are now limited to either a morning or an afternoon. Library tickets include museum entry too.',
      spans: [],
    },
  ],
  slink: { link_type: 'Web', url: '/covid-book-your-ticket' },
};
basic.storyName = 'InfoBlock';
