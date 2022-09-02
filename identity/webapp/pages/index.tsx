import React, {
  FC,
  ComponentProps,
  useState,
  ComponentPropsWithoutRef,
} from 'react';
import Icon from '@weco/common/views/components/Icon/Icon';
import { GetServerSideProps, NextPage } from 'next';
import auth0, { withPageAuthRequiredSSR } from '../src/utility/auth0';
import { ChangeDetailsModal } from '../src/frontend/MyAccount/ChangeDetailsModal';
import { PageWrapper } from '../src/frontend/components/PageWrapper';
import {
  Wrapper,
  Container,
  Title,
  Header,
  SectionHeading,
} from '../src/frontend/components/Layout.style';
import {
  StatusAlert,
  StyledDl,
  StyledDd,
  ProgressBar,
  ProgressIndicator,
  ItemTitle,
  ItemStatus,
  ItemPickup,
  ButtonWrapper,
} from '../src/frontend/MyAccount/MyAccount.style';
import { InlineLoading } from '../src/frontend/MyAccount/Loading';
import { ChangeEmail } from '../src/frontend/MyAccount/ChangeEmail';
import { ChangePassword } from '../src/frontend/MyAccount/ChangePassword';
import { DeleteAccount } from '../src/frontend/MyAccount/DeleteAccount';
import { useRequestedItems } from '../src/frontend/hooks/useRequestedItems';
import WobblyEdge from '@weco/common/views/components/WobblyEdge/WobblyEdge';
import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import { font } from '@weco/common/utils/classnames';
import { allowedRequests } from '@weco/common/values/requests';
import { info2 } from '@weco/common/icons';
import StackingTable from '@weco/common/views/components/StackingTable/StackingTable';
import HTMLDate from '@weco/common/views/components/HTMLDate/HTMLDate';
import { useUser } from '@weco/common/views/components/UserProvider/UserProvider';
import { getServerData } from '@weco/common/server-data';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { useRouter } from 'next/router';
import {
  Auth0UserProfile,
  auth0UserProfileToUserInfo,
} from '@weco/common/model/user';
import { Claims } from '@auth0/nextjs-auth0';
import { sierraStatusCodeToLabel } from '@weco/common/data/microcopy';
import { URLSearchParams } from 'url';
import { useSendVerificationEmail } from '../src/frontend/hooks/useSendVerificationEmail';
import { UnverifiedEmail } from '../src/frontend/MyAccount/UnverifiedEmail';

type DetailProps = {
  label: string;
  value?: string;
};

type DetailListProps = {
  listItems: DetailProps[];
};

const Detail: FC<DetailProps> = ({ label, value }) => (
  <>
    <dt className={font('intb', 5)}>{label}</dt>
    <StyledDd className={`${font('intr', 5)}`}>{value}</StyledDd>
  </>
);

const DetailList: FC<DetailListProps> = ({ listItems }) => {
  return (
    <StyledDl>
      {listItems.map(item => (
        <Detail key={item.label} label={item.label} value={item.value} />
      ))}
    </StyledDl>
  );
};

const TextButton: FC<ComponentPropsWithoutRef<'button'>> = ({
  children,
  ...props
}) => (
  <button
    className={font('intr', 5)}
    style={{
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
    }}
    {...props}
  >
    {children}
  </button>
);

const RequestsFailed: FC<{ retry: () => void }> = ({ retry }) => (
  <p className={`${font('intr', 5)}`}>
    Something went wrong fetching your item requests.
    <TextButton
      onClick={() => {
        retry();
      }}
    >
      Try again
    </TextButton>
  </p>
);

const AccountStatus: FC<ComponentProps<typeof StatusAlert>> = ({
  type,
  children,
}) => {
  return (
    <StatusAlert type={type}>
      <Icon icon={info2} color={`currentColor`} />
      <Space
        h={{
          size: 's',
          properties: ['margin-left'],
        }}
      >
        {children}
      </Space>
    </StatusAlert>
  );
};

type Props = {
  serverData: SimplifiedServerData;
  user?: Claims;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  withPageAuthRequiredSSR({
    getServerSideProps: async context => {
      const serverData = await getServerData(context);

      // When a user goes through the registration flow, we create a user
      // with a placeholder name and *then* update their name in Sierra.
      //
      // This causes an issue if they go from the registration flow directly
      // to their account page:
      //
      //    - We can't update their name directly with the Auth0 management
      //      API, because it's synced from Sierra.
      //    - Auth0 syncs data from Sierra whenever the user authenticates,
      //      i.e. logs in [2], and despite trying I haven't found an easy way
      //      to get Auth0 to re-sync without a login.
      //
      // So to get something working for sign-up, we assume that anybody who
      // signs in with the placeholder surname has just signed up, and we log
      // them out and redirect to the /success page.
      //
      // When they log back in, Auth0 will re-sync their data and pick up their
      // updated name.
      //
      // This is less than ideal, but it gets _something_ working, and we can
      // revisit re-syncing user data without a login later.
      //
      // [1]: https://wellcome.slack.com/archives/CUA669WHH/p1656325929053499?thread_ts=1656322401.443269&cid=CUA669WHH
      // [2]: https://auth0.com/docs/manage-users/user-accounts/user-profiles#caching-user-profiles
      //
      const session = auth0.getSession(context.req, context.res);

      if (session.user.family_name === 'Auth0_Registration_tempLastName') {
        const successParams = new URLSearchParams();
        successParams.append('email', session.user.email);

        const params = new URLSearchParams();
        params.append('returnTo', `/success?${successParams}`);

        return {
          redirect: {
            destination: `/api/auth/logout?${params}`,
            permanent: false,
          },
        };
      }

      return {
        props: {
          serverData,
        },
      };
    },
  });

const AccountPage: NextPage<Props> = ({ user: auth0UserClaims }) => {
  const {
    requestedItems,
    state: requestedItemsState,
    fetchRequests,
  } = useRequestedItems();
  const sendVerificationEmail = useSendVerificationEmail();
  const { user: contextUser } = useUser();
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  // Use the user from the context provider as first preference, as it will
  // change without a page reload being required
  const user =
    contextUser ||
    auth0UserProfileToUserInfo(auth0UserClaims as Auth0UserProfile);

  const router = useRouter();

  const logoutOnDeletionRequest = () => {
    router.replace(
      `/api/auth/logout?returnTo=${encodeURIComponent('/delete-requested')}`
    );
  };

  return (
    <PageWrapper title={`Your library account`}>
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
          </Space>
        </Layout12>
        <div className="is-hidden-s">
          <WobblyEdge background="cream" />
        </div>
      </Header>
      <Layout10>
        <>
          {!user?.emailValidated && (
            <AccountStatus type="info">
              <UnverifiedEmail {...sendVerificationEmail} />
            </AccountStatus>
          )}
          {isEmailUpdated && (
            <AccountStatus type="success">Email updated</AccountStatus>
          )}
          {isPasswordUpdated && (
            <AccountStatus type="success">Password updated</AccountStatus>
          )}
          <SectionHeading addBottomPadding={true}>
            Personal details
          </SectionHeading>
          <Container>
            <Wrapper removeBottomPadding={true}>
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
              <ButtonWrapper>
                <ChangeDetailsModal
                  id="change-email"
                  buttonText="Change email"
                  onComplete={() => {
                    setIsEmailUpdated(true);
                  }}
                  render={props => <ChangeEmail {...props} />}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <ChangeDetailsModal
                  id="change-password"
                  buttonText="Change password"
                  onComplete={() => {
                    setIsPasswordUpdated(true);
                  }}
                  render={props => <ChangePassword {...props} />}
                />
              </ButtonWrapper>
            </Wrapper>
          </Container>

          <SectionHeading addBottomPadding={true}>Item requests</SectionHeading>
          <Container>
            <Wrapper>
              {(() => {
                switch (requestedItemsState) {
                  case 'initial':
                  case 'loading':
                    return (
                      <Space v={{ size: 'l', properties: ['padding-bottom'] }}>
                        <InlineLoading />
                      </Space>
                    );
                  case 'failed':
                    return <RequestsFailed retry={fetchRequests} />;
                  case 'success':
                    if (requestedItems.totalResults === 0) {
                      return (
                        <Space
                          as="p"
                          className={`${font('intr', 5)}`}
                          v={{
                            size: 's',
                            properties: ['margin-bottom'],
                            overrides: { small: 1 },
                          }}
                        >
                          Any item requests you make will appear here.
                        </Space>
                      );
                    } else {
                      return (
                        <>
                          <Space
                            as="p"
                            className={`${font('intb', 5)}`}
                            v={{ size: 's', properties: ['margin-bottom'] }}
                          >{`You have requested ${requestedItems.totalResults} out of ${allowedRequests} items`}</Space>
                          <ProgressBar>
                            <ProgressIndicator
                              percentage={
                                (requestedItems.totalResults /
                                  allowedRequests) *
                                100
                              }
                            />
                          </ProgressBar>
                          <StackingTable
                            maxWidth={1180}
                            rows={[
                              [
                                'Title',
                                'Status',
                                'Pickup date requested',
                                'Pickup location',
                              ].filter(Boolean),
                              ...requestedItems.results.map(result =>
                                [
                                  <>
                                    <ItemTitle
                                      as="a"
                                      href={`/works/${result.workId}`}
                                    >
                                      {result.workTitle || 'Unknown title'}
                                    </ItemTitle>
                                    {result.item.title && (
                                      <Space
                                        v={{
                                          size: 's',
                                          properties: ['margin-top'],
                                        }}
                                      >
                                        <ItemTitle>
                                          {result.item.title}
                                        </ItemTitle>
                                      </Space>
                                    )}
                                  </>,
                                  <ItemStatus key={`${result.item.id}-status`}>
                                    {sierraStatusCodeToLabel[
                                      result.status.id
                                    ] ?? result.status.label}
                                  </ItemStatus>,
                                  result.pickupDate ? (
                                    <HTMLDate
                                      date={new Date(result.pickupDate)}
                                    />
                                  ) : (
                                    <p>n/a</p>
                                  ),
                                  <ItemPickup key={`${result.item.id}-pickup`}>
                                    {result.pickupLocation.label}
                                  </ItemPickup>,
                                ].filter(Boolean)
                              ),
                            ]}
                          />
                          <Space
                            className={`${font('intr', 5)}`}
                            v={{
                              size: 'l',
                              properties: ['margin-top'],
                            }}
                          >
                            Requests made will be available to pick up from the
                            library for one week from your selected pickup date.
                            If you wish to cancel a request, please{' '}
                            <a href="mailto:library@wellcomecollection.org">
                              contact the library team.
                            </a>
                          </Space>
                        </>
                      );
                    }
                }
              })()}
            </Wrapper>
          </Container>

          <SectionHeading addBottomPadding={true}>
            Cancel library membership
          </SectionHeading>
          <Container>
            <Wrapper>
              <p className={font('intr', 5)}>
                If you no longer wish to be a library member, you can cancel
                your membership. The library team will be notified and your
                online account will be closed.
              </p>
              <ChangeDetailsModal
                id="delete-account"
                buttonText="Cancel your membership"
                onComplete={logoutOnDeletionRequest}
                render={props => <DeleteAccount {...props} />}
              />
            </Wrapper>
          </Container>
        </>
      </Layout10>
    </PageWrapper>
  );
};

export default AccountPage;
