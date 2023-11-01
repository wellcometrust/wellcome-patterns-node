import CollapsibleContent from '@weco/common/views/components/CollapsibleContent';
import { prismicRichTextMultiline } from '@weco/cardigan/stories/content';
import PrismicHtmlBlock from '@weco/common/views/components/PrismicHtmlBlock/PrismicHtmlBlock';

const Template = args => <CollapsibleContent {...args} />;
export const basic = Template.bind({});
basic.args = {
  id: 'test',
  controlText: {
    defaultText: 'Show me more',
    contentShowingText: 'Show me less',
  },
  children: <PrismicHtmlBlock html={prismicRichTextMultiline} />,
};
basic.storyName = 'CollapsibleContent';
