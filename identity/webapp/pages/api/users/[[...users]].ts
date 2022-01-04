import { NextApiHandler } from 'next';
import getConfig from 'next/config';
import auth0 from '../../../src/utility/auth0';
import axios, { AxiosInstance, Method as AxiosMethod } from 'axios';

const { serverRuntimeConfig: config } = getConfig();

export const identityAxios: AxiosInstance = axios.create({
  baseURL: config.remoteApi.host,
  headers: {
    'x-api-key': config.remoteApi.apiKey,
  },
});

const handleIdentityApiRequest: NextApiHandler = auth0.withApiAuthRequired(
  async (req, res) => {
    try {
      const { accessToken } = await auth0.getAccessToken(req, res);
      const path = `/users/` + (req.query['users'] as string[]).join('/');
      const remoteResponse = await identityAxios
        .request({
          url: path,
          method: req.method as AxiosMethod,
          data: req.body,
          headers: {
            ...identityAxios.defaults.headers.common,
            Authorization: `Bearer ${accessToken}`,
          },
          validateStatus: (status: number) => status >= 200 && status < 500,
        })
        .catch(error => error.response);

      res.status(remoteResponse.status).send(remoteResponse.data);
    } catch (e) {
      // Something went wrong with getting the access token
      console.error('Unexpected authentication error', e);
      res.status(401).send({ message: 'Authentication error' });
    }
  }
);

export default handleIdentityApiRequest;
