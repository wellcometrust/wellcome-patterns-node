import DateRange from '@weco/content/components/DateRange/DateRange';

const now = new Date('2022-03-01T13:15:00Z');
const oneHourFromNow = new Date('2022-03-01T13:15:00Z');
oneHourFromNow.setHours(now.getHours() + 1);
const oneWeekFromNow = new Date('2022-03-01T13:15:00Z');
oneWeekFromNow.setHours(now.getHours() + 168);

const Template = args => <DateRange {...args} />;
export const sameDay = Template.bind({});
sameDay.args = {
  start: now,
  end: oneHourFromNow,
};
sameDay.storyName = 'Same day';

export const acrossMultipleDays = Template.bind({});
acrossMultipleDays.args = {
  start: now,
  end: oneWeekFromNow,
};
acrossMultipleDays.storyName = 'Across multiple days';

export const withSplit = Template.bind({});
withSplit.args = {
  start: now,
  end: oneHourFromNow,
  splitTime: true,
};
withSplit.storyName = 'With date/time on separate lines';
