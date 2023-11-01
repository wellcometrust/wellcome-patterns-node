import SegmentedControl from '@weco/content/components/SegmentedControl/SegmentedControl';

const Template = args => <SegmentedControl {...args} />;
export const basic = Template.bind({});
basic.args = {
  id: 'test',
  activeId: 1,
  items: [
    { id: 1, url: '#', text: 'Everything' },
    { id: 2, url: '#', text: 'Today' },
    { id: 3, url: '#', text: 'This weekend' },
  ],
};
basic.storyName = 'SegmentedControl';
