import React, { useState, useEffect } from 'react';
import Info2 from '@weco/common/icons/components/Info2';

import { useUserInfo, withUserInfo } from './UserInfoContext';
import { ChangeDetailsModal } from './ChangeDetailsModal';
import { PageWrapper } from '../components/PageWrapper';
import { Container, Title, Header, Intro } from '../components/Layout.style';
import {
  SectionHeading,
  StatusAlert,
  Wrapper,
  StyledDl,
  StyledDd,
  ProgressBar,
  ProgressIndicator,
} from './MyAccount.style';
import { Loading } from './Loading';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import { UpdateUserSchema } from '../../types/schemas/update-user';
import { useHistory } from 'react-router';
import WobblyEdge from '@weco/common/views/components/WobblyEdge/WobblyEdge';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import Table from '@weco/common/views/components/Table/Table';
import { font } from '@weco/common/utils/classnames';
import { RequestsList } from '@weco/common/model/requesting';

type DetailProps = {
  label: string;
  value?: string;
};

type DetailListProps = {
  listItems: DetailProps[];
};

const DetailList: React.FC<DetailListProps> = ({ listItems }) => {
  return (
    <StyledDl>
      {listItems.map(item => (
        <Detail key={item.label} label={item.label} value={item.value} />
      ))}
    </StyledDl>
  );
};

const Detail: React.FC<DetailProps> = ({ label, value }) => (
  <>
    <dt className={font('hnb', 5)}>{label}</dt>
    <StyledDd className={`${font('hnl', 5)}`}>{value}</StyledDd>
  </>
);

const AccountStatus: React.FC<React.ComponentProps<typeof StatusAlert>> = ({
  type,
  children,
}) => {
  return (
    <StatusAlert type={type}>
      <Info2 height="32" width="32" fill="currentColor" />
      {children}
    </StatusAlert>
  );
};

async function fetchRequestedItems(userId): Promise<RequestsList | undefined> {
  try {
    const response = await fetch(`/api/users/${userId}/item-requests`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, isLoading, update } = useUserInfo();
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [requests, setRequests] = useState<RequestsList>();
  const allowedRequests = 10;

  useEffect(() => {
    async function fetchRequests() {
      if (user && user.userId) {
        const items = await fetchRequestedItems(user.userId);
        setRequests(items);
      }
    }
    fetchRequests();
  }, [user]);

  const logoutOnDeletionRequest = () => {
    history.replace(
      `/logout?returnTo=${encodeURIComponent('/delete-requested')}`
    );
  };

  return (
    <PageWrapper>
      <Header
        v={{
          size: 'l',
          properties: ['margin-bottom'],
        }}
      >
        <Layout12>
          <Space
            v={{
              size: 'l',
              properties: ['padding-top', 'padding-bottom'],
            }}
          >
            <Title>Library account</Title>
            <Intro>
              {/* TODO get real text */}
              {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis magni reprehenderit at cum repudiandae
              architecto eaque facere optio culpa, quasi amet, nobis ipsa quaerat error debitis maxime minima veritatis.
              Corrupti? */}
            </Intro>
          </Space>
        </Layout12>
        <div className="is-hidden-s">
          <WobblyEdge background="cream" />
        </div>
      </Header>
      <Layout10>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {!user?.emailValidated && (
              <AccountStatus type="info">
                You have not yet validated your email address
              </AccountStatus>
            )}
            {isEmailUpdated && (
              <AccountStatus type="success">Email updated</AccountStatus>
            )}
            {isPasswordUpdated && (
              <AccountStatus type="success">Password updated</AccountStatus>
            )}
            <SectionHeading>Personal details</SectionHeading>
            <Container>
              <Wrapper>
                <DetailList
                  listItems={[
                    {
                      label: 'Name',
                      value: `${user?.firstName} ${user?.lastName}`,
                    },
                    { label: 'Email', value: user?.email },
                    { label: 'Library card number', value: user?.barcode },
                    /* Membership expiry date? */
                  ]}
                />
                <Space
                  as="span"
                  h={{
                    size: 'l',
                    properties: ['margin-right'],
                  }}
                >
                  <ChangeDetailsModal
                    id="change-email"
                    buttonText="Change Email"
                    onComplete={(newUserInfo?: UpdateUserSchema) => {
                      if (newUserInfo) update(newUserInfo);
                      setIsEmailUpdated(true);
                    }}
                  >
                    <ChangeEmail />
                  </ChangeDetailsModal>
                </Space>
                <ChangeDetailsModal
                  id="change-password"
                  buttonText="Change password"
                  onComplete={() => {
                    setIsPasswordUpdated(true);
                  }}
                >
                  <ChangePassword />
                </ChangeDetailsModal>
              </Wrapper>
            </Container>

            {requests && (
              <>
                <SectionHeading>Item requests</SectionHeading>
                <Container>
                  <Wrapper>
                    <Space
                      as="p"
                      className={`${font('hnb', 5)}`}
                      v={{ size: 's', properties: ['margin-bottom'] }}
                    >{`${
                      allowedRequests - requests?.totalResults
                    } of ${allowedRequests} requests remaining`}</Space>
                    <ProgressBar>
                      <ProgressIndicator
                        percentage={
                          (requests.totalResults / allowedRequests) * 100
                        }
                      />
                    </ProgressBar>
                    <Table
                      plain={true}
                      withBorder={false}
                      rows={[
                        ['Title', 'Status', 'Pickup location'],
                        ...requests.results.map(result => [
                          `${result.item.title ? result.item.title : ''}`,
                          result.status.label,
                          result.pickupLocation.label,
                        ]),
                      ]}
                    />
                  </Wrapper>
                </Container>
              </>
            )}

            <SectionHeading>Delete library account</SectionHeading>
            <Container>
              <Wrapper>
                <p className={font('hnb', 5)}>
                  Request a deletion of your account
                </p>
                <ChangeDetailsModal
                  id="delete-account"
                  buttonText="Request deletion"
                  isDangerous
                  onComplete={logoutOnDeletionRequest}
                >
                  <DeleteAccount />
                </ChangeDetailsModal>
              </Wrapper>
            </Container>
          </>
        )}
      </Layout10>
    </PageWrapper>
  );
};

export const MyAccount = withUserInfo(Profile);
