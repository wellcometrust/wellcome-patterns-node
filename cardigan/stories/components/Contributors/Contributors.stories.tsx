import Contributors from '@weco/content/components/Contributors/Contributors';
import Readme from '@weco/content/components/Contributors/README.md';
import { ReadmeDecorator } from '@weco/cardigan/config/decorators';
import { organisation, person } from '@weco/cardigan/stories/content';

const Template = args => (
  <ReadmeDecorator
    WrappedComponent={Contributors}
    args={args}
    Readme={Readme}
  />
);
export const basic = Template.bind({});
basic.args = {
  contributors: [
    {
      contributor: {
        type: 'people',
        id: 'xxx',
        ...person(),
      },
      role: {
        id: 'xxx',
        title: 'Speaker',
      },
      description: null,
    },
    {
      contributor: {
        type: 'organisations',
        id: 'xxx',
        ...organisation(),
      },
      role: {
        id: 'xxx',
        title: 'Partner',
      },
      description: null,
    },
  ],
};
basic.storyName = 'Contributors';
