import WobblyBottom from '@weco/common/views/components/WobblyBottom/WobblyBottom';
import PrismicImage from '@weco/common/views/components/PrismicImage/PrismicImage';
import { image as contentImage } from '@weco/cardigan/stories/content';
import { font } from '@weco/common/utils/classnames';

const Template = args => <WobblyBottom {...args} />;
export const image = Template.bind({});
image.args = {
  backgroundColor: 'warmNeutral.300',
  children: <PrismicImage image={contentImage()} quality="low" />,
};

export const headline = Template.bind({});
headline.args = {
  backgroundColor: 'warmNeutral.300',
  children: <h1 className={font('wb', 2)}>Lorem ipsum dolor sit amet</h1>,
};
