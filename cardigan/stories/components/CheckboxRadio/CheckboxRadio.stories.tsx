import CheckboxRadio from '@weco/common/views/components/CheckboxRadio/CheckboxRadio';

const Template = args => <CheckboxRadio {...args} />;
export const checkbox = Template.bind({});
checkbox.args = {
  id: 1,
  type: 'checkbox',
  text: 'Manuscripts',
};

export const radio = Template.bind({});
radio.args = {
  id: 2,
  type: 'radio',
  text: 'Manuscripts',
};
