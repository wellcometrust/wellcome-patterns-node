import VenueClosedPeriods from '@weco/content/components/VenueClosedPeriods/VenueClosedPeriods';
import { libraryVenue } from '@weco/common/test/fixtures/components/library-venue';

const Template = () => {
  return <VenueClosedPeriods venue={libraryVenue} />;
};
export const basic = Template.bind({});

basic.storyName = 'VenueClosedPeriods';
