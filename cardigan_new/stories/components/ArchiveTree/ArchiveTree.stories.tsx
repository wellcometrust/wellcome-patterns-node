import type { Meta, StoryObj } from '@storybook/react';
import ArchiveTree from '@weco/content/components/ArchiveTree';
import collectionTree from '@weco/cardigan/stories/data/collection-tree';

export const Basic: StoryObj<typeof ArchiveTree> = {
  name: 'ArchiveTree'
}

const meta: Meta<typeof ArchiveTree> = {
  component: ArchiveTree,
  title: 'Components/ArchiveTree',
  args: {
    work: collectionTree
  }
};

export default meta;