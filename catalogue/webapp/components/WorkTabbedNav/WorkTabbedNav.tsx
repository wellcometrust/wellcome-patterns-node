import { WorkBasic } from '@weco/catalogue/services/wellcome/catalogue/types';
import { FunctionComponent } from 'react';
import SubNavigation from '@weco/common/views/components/SubNavigation/SubNavigation';
import { listView, eye } from '@weco/common/icons';
import { toLink as itemLink } from '../ItemLink';

type Props = {
  work: WorkBasic;
  selected: 'catalogueDetails' | 'imageViewer';
};
const WorkTabbedNav: FunctionComponent<Props> = ({ work, selected }) => {
  const itemUrl = itemLink({ workId: work.id, source: 'work', props: {} });
  return (
    <SubNavigation
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
          name: 'Catalogue details',
          icon: listView,
        },
        {
          id: 'imageViewer',
          url: itemUrl,
          name: 'Image viewer',
          icon: eye,
        },
      ]}
      currentSection={selected}
      hasDivider
    />
  );
};

export default WorkTabbedNav;
