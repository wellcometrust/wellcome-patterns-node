import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { font, classNames } from '@weco/common/utils/classnames';
import WorkTitle from '../WorkTitle/WorkTitle';
import WorkLink from '../WorkLink';
import { StyledLink } from './ArchiveTree.styles';
import { UiTreeNode } from './ArchiveTree.helpers';
import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { TreeControl } from '@weco/content/components/ArchiveTree/ArchiveTree.styles';
import Icon from '@weco/common/views/components/Icon/Icon';
import { chevron } from '@weco/common/icons';

const RefNumber = styled.span.attrs({
  className: font('intr', 6),
})`
  line-height: 1;
  display: block;
  color: ${props => props.theme.color('neutral.600')};
  text-decoration: none;
`;

type Props = {
  item: UiTreeNode;
  hasControl: boolean;
  level: number;
  isSelected: boolean;
  currentWorkId: string;
  highlightCondition: 'primary' | 'secondary' | undefined;
};

const WorkItem: FunctionComponent<Props> = ({
  item,
  hasControl,
  level,
  isSelected,
  currentWorkId,
  highlightCondition,
}) => {
  const { isEnhanced } = useContext(AppContext);
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
      }}
      className={font('intr', 6)}
    >
      {isEnhanced && level > 1 && hasControl && (
        <TreeControl
          data-gtm-trigger="tree_chevron"
          $highlightCondition={highlightCondition}
        >
          <Icon rotate={item.openStatus ? undefined : 270} icon={chevron} />
        </TreeControl>
      )}
      <WorkLink id={item.work.id} source="archive_tree" scroll={false} passHref>
        <StyledLink
          className={classNames({
            [font('intb', 6)]: level === 1,
            [font('intr', 6)]: level > 1,
          })}
          tabIndex={isEnhanced ? (isSelected ? 0 : -1) : 0}
          $isCurrent={currentWorkId === item.work.id}
          $hasControl={hasControl}
          data-gtm-trigger="tree_link"
          data-gtm-data-tree-level={level}
          onClick={event => {
            // We don't want to open the branch, when the work link is activated
            event.stopPropagation();
          }}
        >
          <WorkTitle title={item.work.title} />
          <RefNumber>{item.work.referenceNumber}</RefNumber>
        </StyledLink>
      </WorkLink>
    </div>
  );
};

export default WorkItem;
