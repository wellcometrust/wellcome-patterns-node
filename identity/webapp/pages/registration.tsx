import { FormEvent } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { PageWrapper } from '../src/frontend/components/PageWrapper';
import { font } from '@weco/common/utils/classnames';
import {
  Checkbox,
  CheckboxLabel,
  FullWidthButton,
  FlexStartCheckbox,
} from '../src/frontend/Registration/Registration.style';
import { Container, Wrapper } from '../src/frontend/components/Layout.style';
import WellcomeTextInput, {
  TextInputErrorMessage,
} from '@weco/common/views/components/TextInput/TextInput';
import { usePageTitle } from '../src/frontend/hooks/usePageTitle';
import Layout8 from '@weco/common/views/components/Layout8/Layout8';
import Layout10 from '@weco/common/views/components/Layout10/Layout10';
import Space from '@weco/common/views/components/styled/Space';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import ButtonSolid, {
  ButtonTypes,
} from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { getServerData } from '@weco/common/server-data';
import { AppErrorProps } from '@weco/common/views/pages/_app';
import { SimplifiedServerData } from '@weco/common/server-data/types';
import { RegistrationInputs, decodeToken } from '../src/utility/jwt-codec';
import { stringFromStringOrStringArray } from '@weco/common/utils/array';
import RegistrationInformation from '../src/frontend/Registration/RegistrationInformation';
import getConfig from 'next/config';
import {
  collectionsResearchAgreementTitle,
  collectionsResearchAgreementLabel,
} from '../copy';
import { JwtPayload } from 'jsonwebtoken';

const { serverRuntimeConfig: config } = getConfig();

type Props = {
  serverData: SimplifiedServerData;
  sessionToken: string;
  auth0State: string;
  email: string;
};

export const getServerSideProps: GetServerSideProps<Props | AppErrorProps> =
  async context => {
    const serverData = await getServerData(context);
    const auth0State = stringFromStringOrStringArray(context.query.state);
    const sessionToken = stringFromStringOrStringArray(
      context.query.session_token
    );

    let token: string | JwtPayload = '';
    let email = '';

    // We can get an error here if somebody tries to use an invalid session token;
    // which we return as a user error.
    try {
      token = decodeToken(sessionToken, config.auth0.actionSecret);
    } catch (error) {
      return {
        props: {
          err: {
            statusCode: 400,
            message: 'Invalid session_token query parameter',
          },
        },
      };
    }

    if (typeof token !== 'string') {
      email = token.email;
    }

    return {
      props: {
        serverData,
        sessionToken,
        auth0State,
        email,
      },
    };
  };

const RegistrationPage: NextPage<Props> = ({
  sessionToken,
  auth0State,
  email,
}) => {
  const { control, trigger, handleSubmit, formState } =
    useForm<RegistrationInputs>();

  usePageTitle('Register for a library account');

  // Use the user from the context provider as first preference, as it will
  // change without a page reload being required

  const updateActionData = (_, event: FormEvent<HTMLFormElement>) => {
    (event.target as HTMLFormElement).submit(); // Use the action/method if client side validation passes
  };

  return (
    <PageWrapper title={`Registration`}>
      <Layout10>
        <Space v={{ size: 'xl', properties: ['margin-top'] }}>
          <Container>
            <Wrapper>
              <Layout8>
                <Space v={{ size: 'xl', properties: ['padding-top'] }}>
                  <RegistrationInformation email={email} />

                  <form
                    action="/account/api/registration"
                    method="POST"
                    onSubmit={handleSubmit(updateActionData)}
                    noValidate
                  >
                    <input
                      type="hidden"
                      name="sessionToken"
                      value={sessionToken}
                    />
                    <input type="hidden" name="state" value={auth0State} />
                    <SpacingComponent>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Enter your first name' }}
                        render={({ onChange, value, name }, { invalid }) => (
                          <WellcomeTextInput
                            required
                            id={name}
                            name={name}
                            label="First name"
                            value={value}
                            setValue={onChange}
                            isValid={!invalid}
                            setIsValid={() => trigger('firstName')}
                            showValidity={formState.isSubmitted}
                            errorMessage={formState.errors.firstName?.message}
                          />
                        )}
                      />
                    </SpacingComponent>
                    <SpacingComponent>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Enter your last name' }}
                        render={({ onChange, value, name }, { invalid }) => (
                          <WellcomeTextInput
                            required
                            id={name}
                            name={name}
                            label="Last name"
                            value={value}
                            setValue={onChange}
                            isValid={!invalid}
                            setIsValid={() => trigger('lastName')}
                            showValidity={formState.isSubmitted}
                            errorMessage={formState.errors.lastName?.message}
                          />
                        )}
                      />
                    </SpacingComponent>

                    <SpacingComponent>
                      <h3 className={font('intb', 5)}>
                        {collectionsResearchAgreementTitle}
                      </h3>
                      <Controller
                        name="termsAndConditions"
                        control={control}
                        defaultValue={false}
                        rules={{ required: 'Accept the terms to continue.' }}
                        render={({ value, onChange }) => (
                          <FlexStartCheckbox>
                            <Checkbox
                              name={'termsAndConditions'}
                              id={'termsAndConditions'}
                              value={value}
                              onChange={(e: FormEvent<HTMLInputElement>) =>
                                onChange(e.currentTarget.checked)
                              }
                              checked={value}
                              text={
                                <CheckboxLabel>
                                  {collectionsResearchAgreementLabel}
                                </CheckboxLabel>
                              }
                            />
                          </FlexStartCheckbox>
                        )}
                      />
                      <Space v={{ size: 's', properties: ['margin-top'] }}>
                        <ErrorMessage
                          errors={formState.errors}
                          name="termsAndConditions"
                          render={({ message }) => (
                            <TextInputErrorMessage>
                              {message}
                            </TextInputErrorMessage>
                          )}
                        />
                      </Space>
                    </SpacingComponent>
                    <SpacingComponent>
                      <FullWidthButton>
                        <ButtonSolid
                          type={ButtonTypes.submit}
                          text="Create library account"
                        />
                      </FullWidthButton>
                    </SpacingComponent>
                  </form>
                </Space>
              </Layout8>
            </Wrapper>
          </Container>
        </Space>
      </Layout10>
    </PageWrapper>
  );
};

export default RegistrationPage;
