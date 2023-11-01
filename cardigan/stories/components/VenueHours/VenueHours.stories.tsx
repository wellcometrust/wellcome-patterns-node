import VenueHours from '@weco/content/components/VenueHours/VenueHours';
import { galleriesVenue } from '@weco/common/test/fixtures/components/galleries-venue';
import Readme from '@weco/content/components/VenueHours/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = () => (
  <ReadmeDecorator
    WrappedComponent={VenueHours}
    args={{ venue: galleriesVenue, weight: 'featured' }}
    Readme={Readme}
  />
);
export const basic = Template.bind({});

basic.storyName = 'VenueHours';
