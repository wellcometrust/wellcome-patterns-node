import ArchiveTree from '@weco/content/components/ArchiveTree';
import collectionTree from '@weco/cardigan/stories/data/collection-tree';

const Template = args => <ArchiveTree {...args} />;

export const basic = Template.bind({});
basic.args = {
  work: collectionTree,
};
basic.storyName = 'ArchiveTree';
basic.parameters = {
  chromatic: {
    // I tried to delay the snapshot for 15s (the max) and it still gives an error.
    // This still allows the Canvas view, it just won't snapshot/compare it.
    disableSnapshot: true,
  },
};
