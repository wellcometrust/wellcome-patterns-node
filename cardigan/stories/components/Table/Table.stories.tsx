import Table from '@weco/content/components/Table/Table';

const Template = args => <Table {...args} />;
export const colHeaders = Template.bind({});
colHeaders.args = {
  caption: 'Delivery schedule',
  hasRowHeaders: false,
  rows: [
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['09:00', '09:00', '09:00', '09:00', '09:00', '09:00'],
    ['10:00', '10:00', '10:00', '10:00', '10:00', '10:00'],
    ['11:00', '11:00', '11:00', '11:00', '11:00', '11:00'],
    ['12:00', '12:00', '12:00', '12:00', '12:00', '12:00'],
    ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00'],
    ['14:00', '14:00', '14:00', '14:00', '14:00', '14:00'],
  ],
};
colHeaders.storyName = 'Column headers';

export const rowHeaders = Template.bind({});
rowHeaders.args = {
  caption: 'Delivery schedule',
  hasRowHeaders: true,
  rows: [
    ['Monday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    ['Tuesday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    ['Wednesday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    ['Thursday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    ['Friday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    ['Saturday', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  ],
};
rowHeaders.storyName = 'Row headers';
