import CompactCard from '@weco/content/components/CompactCard/CompactCard';
import BannerCard from '@weco/content/components/BannerCard/BannerCard';
import FeaturedCard from '@weco/content/components/FeaturedCard/FeaturedCard';
import EventPromo from '@weco/content/components/EventPromo/EventPromo';
import ExhibitionPromo from '@weco/content/components/ExhibitionPromo/ExhibitionPromo';
import StoryPromo from '@weco/content/components/StoryPromo/StoryPromo';
import { exhibitionBasic } from '@weco/cardigan/stories/data/prismic/exhibition';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import {
  squareImage,
  singleLineOfText,
  bannerCardItem,
  articleBasic,
  image,
  event,
} from '@weco/cardigan/stories/content';
import Readme from '@weco/content/components/FeaturedCard/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import { font } from '@weco/common/utils/classnames';

const primaryLabelList = [{ text: 'Study day' }, { text: 'Schools' }];
const secondaryLabelList = [{ text: 'Speech-to-text' }];
const imageProps = squareImage();
const sharedParameters = {
  chromatic: { diffThreshold: 0.2, delay: 1000 },
};

const CompactCardTemplate = args => <CompactCard {...args} />;

export const compactCard = CompactCardTemplate.bind({});
compactCard.args = {
  url: 'https://wellcomecollection.org',
  title: 'Wellcome Collection',
  description: singleLineOfText(),
  Image: <PrismicImage image={imageProps} quality="low" />,
  DateInfo: null,
  Tags: null,
  primaryLabels: primaryLabelList,
  secondaryLabels: secondaryLabelList,
  xOfY: [1, 1],
};
compactCard.storyName = 'CompactCard';
compactCard.parameters = {
  ...sharedParameters,
  gridSizes: { s: 12, m: 10, l: 8, xl: 8 },
};

const BannerCardTemplate = args => <BannerCard {...args} />;
export const bannerCard = BannerCardTemplate.bind({});
bannerCard.args = {
  item: bannerCardItem,
};
bannerCard.storyName = 'BannerCard';
bannerCard.parameters = sharedParameters;

const FeaturedCardTemplate = args => {
  return (
    <ReadmeDecorator
      WrappedComponent={FeaturedCard}
      args={{
        id: 'id',
        image: image(),
        labels: [{ text: 'Article' }],
        link: { url: '#', text: 'Remote diagnosis from wee to the web' },
        background: args.background,
        textColor: args.textColor,
        isReversed: args.isReversed,
      }}
      Readme={Readme}
    >
      <h2 className={font('wb', 2)}>Remote diagnosis from wee to the Web</h2>
      <p className={font('intr', 5)}>
        Medical practice might have moved on from when patients posted flasks of
        their urine for doctors to taste, but telehealth today keeps up the
        tradition of remote diagnosis – to our possible detriment.
      </p>
    </ReadmeDecorator>
  );
};
export const featuredCard = FeaturedCardTemplate.bind({});
featuredCard.args = {
  background: 'neutral.700',
  textColor: 'white',
  isReversed: false,
};
featuredCard.storyName = 'FeaturedCard';
featuredCard.parameters = sharedParameters;

const EventPromoTemplate = args => <EventPromo {...args} />;
export const eventPromo = EventPromoTemplate.bind({});
eventPromo.args = {
  position: 0,
  event,
};
eventPromo.parameters = {
  ...sharedParameters,
  gridSizes: { s: 12, m: 6, l: 4, xl: 4 },
};
eventPromo.storyName = 'EventPromo';

const ExhibitionPromoTemplate = args => <ExhibitionPromo {...args} />;
export const exhibitionPromo = ExhibitionPromoTemplate.bind({});
exhibitionPromo.args = { exhibition: exhibitionBasic };
exhibitionPromo.parameters = {
  ...sharedParameters,
  gridSizes: { s: 12, m: 6, l: 4, xl: 4 },
};
exhibitionPromo.storyName = 'ExhibitionPromo';

const StoryPromoTemplate = args => <StoryPromo {...args} />;
export const storyPromo = StoryPromoTemplate.bind({});
storyPromo.args = {
  article: articleBasic,
  position: 0,
};
storyPromo.parameters = {
  ...sharedParameters,
  gridSizes: { s: 12, m: 6, l: 4, xl: 4 },
};
storyPromo.storyName = 'StoryPromo';
