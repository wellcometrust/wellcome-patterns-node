import Select from '@weco/content/components/Select/Select';

const Template = args => <Select {...args} />;
export const basic = Template.bind({});
basic.args = {
  name: 'sortBy',
  label: 'sort by',
  options: [
    { text: 'Relevance' },
    { text: 'Oldest to newest' },
    { text: 'Newest to oldest' },
  ],
};
basic.storyName = 'Select';
