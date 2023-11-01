import StatusIndicator from '@weco/content/components/StatusIndicator/StatusIndicator';
import Readme from '@weco/content/components/StatusIndicator/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const now = new Date();
const tomorrow = new Date();
tomorrow.setHours(now.getHours() + 24);

const threeDaysFromNow = new Date();
threeDaysFromNow.setHours(now.getHours() + 72);

const twoWeeksFromNow = new Date();
twoWeeksFromNow.setHours(now.getHours() + 336);

const twoWeeksAgo = new Date();
twoWeeksAgo.setHours(now.getHours() - 336);

const aWeekAgo = new Date();
aWeekAgo.setHours(now.getHours() - 168);

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={StatusIndicator}
    args={args}
    Readme={Readme}
  />
);
export const comingSoon = Template.bind({});
comingSoon.args = {
  start: tomorrow,
  end: twoWeeksFromNow,
};
comingSoon.storyName = 'Coming soon';

export const past = Template.bind({});
past.args = {
  start: twoWeeksAgo,
  end: aWeekAgo,
};
past.storyName = 'Past';

export const finalWeek = Template.bind({});
finalWeek.args = {
  start: now,
  end: threeDaysFromNow,
};
finalWeek.storyName = 'Final week';

export const nowOn = Template.bind({});
nowOn.args = {
  start: now,
  end: twoWeeksFromNow,
};
nowOn.storyName = 'Now on';
