import LabelsList from '@weco/common/views/components/LabelsList/LabelsList';

const Template = args => <LabelsList {...args} />;
export const basic = Template.bind({});
basic.args = {
  labels: [{ text: 'Gallery tour' }, { text: 'Audio described' }],
};
basic.storyName = 'LabelsList';
