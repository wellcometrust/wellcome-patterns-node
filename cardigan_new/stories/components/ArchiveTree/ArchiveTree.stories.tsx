import { Meta, StoryObj } from '@storybook/react';

import collectionTree from '@weco/cardigan_new/stories/data/collection-tree';
import work from '@weco/cardigan_new/stories/data/work';
import ArchiveTree from '@weco/content/components/ArchiveTree';
import IsArchiveContext from '@weco/content/components/IsArchiveContext/IsArchiveContext';

const meta: Meta<typeof ArchiveTree> = {
  title: 'Components/ArchiveTree',
  component: ArchiveTree,
  args: {
    work: collectionTree,
  },
  parameters: {
    disableSnapshot: true,
    mockData: [
      {
        url: '/api/works/:id',
        method: 'GET',
        status: 200,
        response: () => {
          return work;
        },
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof ArchiveTree>;

const Template = args => (
  <IsArchiveContext.Provider value={true}>
    <ArchiveTree {...args} />
  </IsArchiveContext.Provider>
);

export const Basic: Story = {
  name: 'ArchiveTree',
  render: Template,
};