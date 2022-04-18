import { sign, verify } from 'jsonwebtoken';

// we need some jwt encoding to deal with passing data to an auth0 action
// https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/redirect-with-actions#pass-data-back-to-auth0

type TokenPayload = {
  iat: number;
  iss: string;
  sub: string;
  exp: number;
  aud?: string;
  state?: string;
};

type GeneratedTokenPayload = {
  iat: number;
  iss: string;
  sub: string;
  exp: number;
  aud: string;
  state?: string;
  other?: FormDataObject;
};

type FormDataObject = {
  firstname: string;
  surname: string;
  termsAndConditions: boolean;
};

// we first need to decode the session token we receive on redirecting from the post-login flow action
export const decodeToken = (token: string): Promise<TokenPayload> => {
  try {
    const decoded = verify(token, process.env.AUTH0_ACTION_SECRET);
    console.log(decoded, 'the decoded query');
    return decoded;
  } catch (e) {
    console.log('Invalid session_token');
  }
};

// we then need to add our registration form data to the token along with other details
// this token object includes iat, iss, sub, exp and ip (from auth0 incoming token)
// we must also include the state, which validates our ability to finish the action with /continue
// finally we must make sure to add aud (audience) as without this the token won't be accepted by auth0
export const generateNewToken = (
  dataFromAuth0: Promise<TokenPayload>,
  state: string,
  formData: FormDataObject
): Promise<GeneratedTokenPayload> => {
  const payload = {
    ...dataFromAuth0,
    aud: 'https://wellcomecollection.org/account/registration',
    state,
    other: formData,
  };

  const token = sign(payload, process.env.AUTH0_ACTION_SECRET, {
    algorithm: 'HS256',
  });
  return token;
};
