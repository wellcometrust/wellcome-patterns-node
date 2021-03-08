import React from 'react';
import { useForm, Controller, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AccountCreated } from './AccountCreated';
import { PageWrapper } from './PageWrapper';
import {
  Button,
  Checkbox,
  Container,
  ErrorAlert,
  Heading,
  InvalidFieldAlert,
  Label,
  Link,
  PasswordRulesList,
  SecondaryButton,
  TextInput,
  Title,
  Wrapper,
} from './Registration.style';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import Icon from '@weco/common/views/components/Icon/Icon';
import { useRegisterUser, RegistrationError } from './useRegisterUser';
import { PasswordInput } from './PasswordInput';

type RegistrationInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
};

const validEmailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validPasswordPattern = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*/;

export function Registration(): JSX.Element {
  const { register, control, handleSubmit, formState } = useForm<RegistrationInputs>({
    defaultValues: { password: '' },
  });
  const { registerUser, isSuccess, error: registrationError } = useRegisterUser();

  if (isSuccess) {
    return <AccountCreated />;
  }

  const Field: React.FC<{
    name: keyof RegistrationInputs;
    label: string;
    type?: string;
    placeholder?: string;
    rules: RegisterOptions;
  }> = ({ name, label, type = 'text', placeholder, rules }) => {
    return (
      <>
        <Label htmlFor={name}>{label}</Label>
        <ErrorMessage
          errors={formState.errors}
          name={name}
          render={({ message }) => <InvalidFieldAlert>{message}</InvalidFieldAlert>}
        />
        <TextInput
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={register(rules)}
          invalid={formState.errors[name]}
        />
      </>
    );
  };

  const createUser = (formData: RegistrationInputs) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAndConditions, ...userDetails } = formData;
    registerUser(userDetails);
  };

  return (
    <PageWrapper>
      <Container>
        <Wrapper>
          <Title>Register for a library account</Title>
          <p>
            An account lets you order items from the library&apos;s closed stores and access our online subscription
            collections.
          </p>
          <p>
            The first time you come to the library, you&apos;ll need to complete your <a href="">library membership</a>.
          </p>

          {registrationError && (
            <>
              <ErrorAlert>
                <Icon name="cross" />
                {registrationError === RegistrationError.EMAIL_ALREADY_EXISTS && (
                  <>
                    <span>That account already exists</span>
                    <span>
                      You can try to <a href="#">login</a>
                    </span>
                  </>
                )}
                {registrationError === RegistrationError.PASSWORD_TOO_COMMON && 'Password is too common'}
                {registrationError === RegistrationError.UNKNOWN && 'An unknown error occurred'}
              </ErrorAlert>
            </>
          )}
          <SpacingComponent />

          <form onSubmit={handleSubmit(createUser)} noValidate>
            <Heading>Personal details</Heading>
            <Field
              name="firstName"
              label="First name"
              placeholder="Forename"
              rules={{ required: 'Missing first name' }}
            />
            <Field name="lastName" label="Last name" placeholder="Surname" rules={{ required: 'Missing last name' }} />
            <SpacingComponent />
            <Heading>Login details</Heading>
            <Field
              name="email"
              type="email"
              label="Email address"
              placeholder="myname@email.com"
              rules={{
                required: 'Missing email address',
                pattern: {
                  value: validEmailPattern,
                  message: 'Invalid email address',
                },
              }}
            />
            <Label htmlFor="password" className="font-hnm font-size-4">
              Password
            </Label>
            <ErrorMessage
              errors={formState.errors}
              name="password"
              render={({ message }) => <InvalidFieldAlert>{message}</InvalidFieldAlert>}
            />
            <PasswordInput
              name="password"
              control={control}
              rules={{
                required: 'Missing password',
                pattern: {
                  value: validPasswordPattern,
                  message: 'Invalid password',
                },
              }}
            />
            <PasswordRulesList>
              <li className="font-hnl font-size-6">One lowercase character</li>
              <li className="font-hnl font-size-6">One uppercase character</li>
              <li className="font-hnl font-size-6">One number</li>
              <li className="font-hnl font-size-6">8 characters minimum</li>
            </PasswordRulesList>
            <SpacingComponent />
            <ErrorMessage
              errors={formState.errors}
              name="termsAndConditions"
              render={({ message }) => <InvalidFieldAlert>{message}</InvalidFieldAlert>}
            />
            <Controller
              name="termsAndConditions"
              control={control}
              defaultValue={false}
              rules={{ required: 'You must accept to proceed' }}
              render={({ value, onChange }) => (
                <Checkbox
                  onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.checked)}
                  checked={value}
                  text={
                    <span>
                      I have read and agree to the{' '}
                      <Link
                        href="https://wellcome.org/about-us/governance/privacy-and-terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy and Terms
                      </Link>{' '}
                      for Wellcome
                    </span>
                  }
                />
              )}
            />
            <SpacingComponent />
            <Button type="submit">Create account</Button>
            <SpacingComponent />
            <SecondaryButton type="reset">Cancel</SecondaryButton>
          </form>
        </Wrapper>
      </Container>
    </PageWrapper>
  );
}
