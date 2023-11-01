import Breadcrumb from '@weco/common/views/components/Breadcrumb/Breadcrumb';

const Template = args => <Breadcrumb {...args} />;
export const basic = Template.bind({});
basic.args = {
  items: [
    {
      text: 'Content type',
      url: '/content-type',
    },
    {
      prefix: 'Part of',
      text: 'The Ambroise Paré collection',
      url: '/part-of/this',
    },
  ],
};
basic.storyName = 'Breadcrumb';
