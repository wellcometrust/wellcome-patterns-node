import BetaMessage from '@weco/content/components/BetaMessage/BetaMessage';
const Template = args => <BetaMessage {...args} />;

export const basic = Template.bind({});
basic.args = {
  message: 'We are working to make this item available online by July 2022.',
};
basic.storyName = 'BetaMessage';
