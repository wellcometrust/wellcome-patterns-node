import { GetServerSideProps, NextPage } from 'next';
import { PageWrapper } from '../src/frontend/components/PageWrapper';
import {
  Container,
  Wrapper,
  SectionHeading,
} from '../src/frontend/components/Layout.style';
import { HighlightMessage } from '../src/frontend/Registration/Registration.style';
import ButtonSolidLink from '@weco/common/views/components/ButtonSolidLink/ButtonSolidLink';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import { getServerData } from '@weco/common/server-data';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { removeUndefinedProps } from '@weco/common/utils/json';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { useUser } from '@weco/common/views/components/UserProvider/UserProvider';
import auth0 from '../src/utility/auth0';

const ValidatedPage: NextPage<Props> = ({ success, message, isNewSignUp }) => {
  const { state: userState } = useUser();
  const urlUsed = message === 'This URL can be used only once';

  // As discussed here https://github.com/wellcomecollection/wellcomecollection.org/issues/6952
  // we want to show the success message in this scenario, and the message value is the only thing we can use to determine that
  // auth0.com/docs/brand-and-customize/email/email-template-descriptions#redirect-to-results-for-verification-email-template
  return (
    <PageWrapper title={`Email verified`}>
      <Layout10>
        <Space v={{ size: 'xl', properties: ['margin-top'] }}>
          <Container>
            <Wrapper>
              {success || urlUsed ? (
                <>
                  <SectionHeading as="h1">Email verified</SectionHeading>
                  <p>Thank you for verifying your email address.</p>
                  {isNewSignUp && (
                    <div data-test-id="new-sign-up">
                      <p>
                        The library team will review your application and will
                        confirm your membership within the next 72 hours. In the
                        meantime, you can browse through{' '}
                        <a href="/collections">our digital collections</a> or
                        sign in to your account below.
                      </p>
                      <HighlightMessage>
                        <strong>Reminder:</strong> you will need to email a form
                        of personal identification (ID) and proof of address to
                        the Library team in order to confirm your details.
                      </HighlightMessage>
                    </div>
                  )}
                  <ButtonSolidLink
                    link="/account"
                    text={
                      userState === 'signedin'
                        ? 'View your library account'
                        : 'Sign in'
                    }
                  />
                </>
              ) : (
                <>
                  <SectionHeading as="h1">
                    Failed to verify email
                  </SectionHeading>
                  <p>{message}</p>
                  <p>
                    If you need help, please{' '}
                    <a
                      href="https://wellcomelibrary.org/using-the-library/services-and-facilities/contact-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      contact us
                    </a>
                  </p>
                </>
              )}
            </Wrapper>
          </Container>
        </Space>
      </Layout10>
    </PageWrapper>
  );
};

type Props = {
  serverData: SimplifiedServerData;
  success: boolean;
  message: string | string[];
  isNewSignUp: boolean;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const { query, req, res } = context;
    const { success, message, supportSignUp } = query;
    const didSucceed = success === 'true';

    if (didSucceed) {
      // The email validation state is held within the ID token, which will be
      // refreshed by fetching a new access token.
      try {
        await auth0.getAccessToken(req, res, { refresh: true });
      } catch (e) {
        // It doesn't matter if this fails; it means the user doesn't currently have a session
      }
    }

    const serverData = await getServerData(context);

    return {
      props: removeUndefinedProps({
        serverData,
        success: didSucceed,
        message: message || null,
        isNewSignUp: supportSignUp === 'true',
      }),
    };
  };

export default ValidatedPage;
