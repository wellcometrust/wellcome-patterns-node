import InfoBox from '@weco/content/components/InfoBox/InfoBox';
import { a11Y, a11YVisual, clock, location, ticket } from '@weco/common/icons';
import Readme from '@weco/content/components/InfoBox/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';

const Template = args => (
  <ReadmeDecorator WrappedComponent={InfoBox} args={args} Readme={Readme} />
);
export const basic = Template.bind({});
basic.args = {
  title: 'Visit us',
  items: [
    {
      description: [
        {
          type: 'paragraph',
          text: 'Free admission',
          spans: [],
        },
      ],
      icon: ticket,
    },
    {
      description: [
        {
          type: 'paragraph',
          text: 'Galleries open Tuesday–Sunday, Opening times',
          spans: [
            {
              type: 'hyperlink',
              start: 31,
              end: 44,
              data: {
                link_type: 'Web',
                url: '/opening-times',
              },
            },
          ],
        },
      ],
      icon: clock,
    },
    {
      description: [
        {
          type: 'paragraph',
          text: 'Medicine Man gallery, level 1',
          spans: [],
        },
      ],
      icon: location,
    },
    {
      description: [
        {
          type: 'paragraph',
          text: 'Step-free access is available to all floors of the building',
          spans: [],
        },
      ],
      icon: a11Y,
    },
    {
      description: [
        {
          type: 'paragraph',
          text: 'Large-print guides, transcripts and magnifiers are available in the gallery',
          spans: [],
        },
      ],
      icon: a11YVisual,
    },
  ],
};
basic.storyName = 'InfoBox';
