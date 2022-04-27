import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNewToken, decodeToken } from '../../src/utility/jwt-codec';
import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig: config } = getConfig();

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const { state, firstName, lastName, termsAndConditions, sessionToken } =
      req.body;

    if (
      !state ||
      !firstName ||
      !lastName ||
      !termsAndConditions ||
      !sessionToken
    ) {
      console.error('Missing required fields');
      res.redirect(302, `/account/error`);
    }

    try {
      const decodedToken = decodeToken(sessionToken);
      const formData = { firstName, lastName, termsAndConditions };

      if (typeof decodedToken !== 'string') {
        const newToken = generateNewToken(decodedToken, state, formData);
        const redirectUri = `${config.auth0.domain}/continue`;

        axios
          .post(redirectUri, { token: newToken })
          .then(() => {
            res.redirect(302, `/account`);
          })
          .catch(error => {
            console.error(error);
            res.redirect(302, `/account/error`);
          });
      }
    } catch (error) {
      console.error(error);
      res.redirect(302, `/account/error`);
    }
  } else {
    res.redirect('/account');
  }
};
