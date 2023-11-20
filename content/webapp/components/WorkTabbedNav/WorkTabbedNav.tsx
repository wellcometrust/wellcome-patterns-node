import { WorkBasic } from '@weco/content/services/wellcome/catalogue/types';
import { FunctionComponent } from 'react';
import Tabs from '@weco/content/components/Tabs';
import { listView, eye } from '@weco/common/icons';
import { toLink as itemLink } from '../ItemLink';

type Props = {
  work: WorkBasic;
  selected: 'catalogueDetails' | 'imageViewer';
};
const WorkTabbedNav: FunctionComponent<Props> = ({ work, selected }) => {
  const itemUrl = itemLink({ workId: work.id, source: 'work', props: {} });
  return (
    <Tabs
      tabBehaviour="navigate"
      label="Search Categories"
      items={[
        {
          id: 'catalogueDetails',
          url: {
            href: {
              pathname: '/works/[workId]',
              query: {
                workId: work.id,
              },
            },
            as: {
              pathname: `/works/${work.id}`,
            },
          },
          text: 'Catalogue details',
          icon: listView,
        },
        {
          id: 'imageViewer',
          url: itemUrl,
          text: 'Image viewer',
          icon: eye,
        },
      ]}
      currentSection={selected}
    />
  );
};

export default WorkTabbedNav;
