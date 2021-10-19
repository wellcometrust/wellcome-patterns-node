import { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import ButtonOutlinedLink from '@weco/common/views/components/ButtonOutlinedLink/ButtonOutlinedLink';
import Space from '@weco/common/views/components/styled/Space';
import { classNames, font } from '@weco/common/utils/classnames';
import IsArchiveContext from '@weco/common/views/components/IsArchiveContext/IsArchiveContext';
import TogglesContext from '@weco/common/views/components/TogglesContext/TogglesContext';
import { PhysicalItem, Work } from '@weco/common/model/catalogue';
import {
  getLocationLabel,
  getLocationShelfmark,
  getFirstPhysicalLocation,
  getEncoreLink,
} from '@weco/common/utils/works';
import ConfirmItemRequest from '../ConfirmItemRequest/ConfirmItemRequest';
import {
  unrequestableStatusIds,
  unrequestableMethodIds,
} from '../WorkDetails/WorkDetails';
import StackingTable from '@weco/common/views/components/StackingTable/StackingTable';
import { useUser } from '@weco/common/views/components/UserProvider/UserProvider';

const Wrapper = styled(Space).attrs({
  v: { size: 'm', properties: ['margin-bottom', 'padding-bottom'] },
})<{ underline: boolean }>`
  ${props =>
    props.underline &&
    `
    border-bottom: 1px solid ${props.theme.color('pumice')};
  `}
`;

type ButtonWrapperProps = {
  styleChangeWidth: number;
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  // This transform is to align the request button
  // with the top of the other table headings
  transform: translateY(-1.2em);

  @media (max-width: ${props => props.styleChangeWidth}px) {
    margin-top: ${props => props.theme.spacingUnit * 2}px;
    transform: translateY(0);
  }
`;

const DetailHeading = styled.h3.attrs({
  className: classNames({
    [font('hnb', 5, { small: 3, medium: 3 })]: true,
    'no-margin': true,
  }),
})``;

export type Props = {
  item: PhysicalItem;
  work: Work;
  userHeldItems?: Set<string>;
  encoreLink?: string;
  isLast: boolean;
};

const PhysicalItemDetails: FunctionComponent<Props> = ({
  item,
  work,
  userHeldItems,
  isLast,
}) => {
  const { user, state: userState } = useUser();
  const isArchive = useContext(IsArchiveContext);
  const { enableRequesting } = useContext(TogglesContext);
  const [isActive, setIsActive] = useState(false);

  const isHeldByUser = item.id && userHeldItems?.has(item.id);

  const physicalLocation = getFirstPhysicalLocation(item); // ok to assume items only have a single physicalLocation

  const isOpenShelves = physicalLocation?.locationType.id === 'open-shelves';

  const isRequestableOnline =
    physicalLocation?.accessConditions?.[0]?.method?.id === 'online-request';

  const accessMethod =
    physicalLocation?.accessConditions?.[0]?.method?.label || '';

  const accessStatus =
    physicalLocation?.accessConditions?.[0]?.status?.label ||
    (isRequestableOnline ? 'Open' : '');

  const accessNote = physicalLocation?.accessConditions?.[0]?.note;

  const locationLabel = physicalLocation && getLocationLabel(physicalLocation);

  const locationShelfmark =
    physicalLocation && getLocationShelfmark(physicalLocation);

  const requestItemUrl = isRequestableOnline ? getEncoreLink(work) : undefined;

  const accessMethodId =
    physicalLocation?.accessConditions?.[0]?.method?.id || '';

  const accessStatusId =
    physicalLocation?.accessConditions?.[0]?.status?.id || '';

  // Work out whether to show status, access and request button
  const showStatus = isOpenShelves || accessStatus;
  const showAccess = !isOpenShelves;
  const hideRequestButton =
    unrequestableStatusIds.some(i => i === accessStatusId) ||
    unrequestableMethodIds.some(i => i === accessMethodId) ||
    (!user && enableRequesting);
  const showButton =
    (enableRequesting && !hideRequestButton) ||
    (!enableRequesting && requestItemUrl);

  const title = item.title || '';
  const itemNote = item.note || '';
  const location = locationLabel || '';
  const shelfmark = locationShelfmark || '';

  function createRows() {
    const requestButton =
      enableRequesting && !hideRequestButton ? (
        <ConfirmItemRequest
          isActive={isActive}
          setIsActive={setIsActive}
          item={item}
          work={work}
          initialHoldNumber={userHeldItems?.size ?? 0}
        />
      ) : (
        requestItemUrl &&
        !hideRequestButton && (
          <ButtonOutlinedLink text={'Request item'} link={requestItemUrl} />
        )
      );

    const headingRow = [
      'Location',
      showStatus ? 'Status' : ' ',
      showAccess ? 'Access' : ' ',
      ' ',
    ];

    const dataRow = [
      <>
        <div>{location}</div>
        <div>{shelfmark}</div>
      </>,
      showStatus ? (
        <span>{isOpenShelves ? 'Open shelves' : accessStatus}</span>
      ) : (
        ' '
      ),
      showAccess ? accessMethod : ' ',
      enableRequesting ? (
        userState !== 'loading' ? (
          showButton ? (
            <ButtonWrapper styleChangeWidth={isArchive ? 980 : 620}>
              {requestButton}
            </ButtonWrapper>
          ) : (
            ' '
          )
        ) : (
          'Loading...'
        )
      ) : showButton ? (
        <ButtonWrapper styleChangeWidth={isArchive ? 980 : 620}>
          {requestButton}
        </ButtonWrapper>
      ) : (
        ' '
      ),
    ];

    return [headingRow, dataRow];
  }

  return (
    <>
      <Wrapper underline={!isLast}>
        {(title || itemNote) && (
          <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
            <DetailHeading>{title}</DetailHeading>
            {itemNote && (
              <span dangerouslySetInnerHTML={{ __html: itemNote }} />
            )}
          </Space>
        )}
        <StackingTable
          rows={createRows()}
          plain={true}
          maxWidth={isArchive ? 980 : 620}
          columnWidths={[180, 200, null, null]}
        />
        {accessNote &&
          !isHeldByUser && ( // if the user currently has this item on hold, we don't want to show the note that says another user has it
            <Space v={{ size: 'm', properties: ['margin-top'] }}>
              <DetailHeading>Note</DetailHeading>
              <span dangerouslySetInnerHTML={{ __html: accessNote }} />
            </Space>
          )}
        {isHeldByUser && (
          <Space v={{ size: 'm', properties: ['margin-top'] }}>
            <DetailHeading>Note</DetailHeading>
            <span
              dangerouslySetInnerHTML={{
                __html: 'You have requested this item.',
              }}
            />
          </Space>
        )}
      </Wrapper>
    </>
  );
};

export default PhysicalItemDetails;
