import axios from 'axios';
import _set from 'lodash/set';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';
import type { UserData } from '@weavcraft/common';

import type {
  CredentialTokens,
  Credentials,
  MeOptions,
  SigninOptions,
} from './account.types';

export const getCredentialTokens = withConnRefusedCatch<
  Credentials | string,
  CredentialTokens
>(async function (options) {
  const now = Date.now();

  const { data } = await (typeof options === 'string'
    ? axios.post(
        '/auth/refresh-access-token',
        { refreshToken: options },
        { baseURL: process.env.NEXT_PUBLIC_API_URL }
      )
    : axios.post('/auth/login/supabase', options, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      }));

  return _set(data, ['data', 'expiresAt'], now + 1000 * 60 * 60 * 24 * 7);
});

export const doSingOut = withConnRefusedCatch<string, void>(async function (
  refreshToken
) {
  const { data } = await axios.post('/service/auth/logout', { refreshToken });

  return data;
});

export const getMe = withConnRefusedCatch<
  QueryFunctionParams<[MeOptions | string]>,
  UserData
>(async function ({ queryKey: [options] }) {
  const { accessToken, baseURL = '/service' } =
    typeof options === 'string' ? { accessToken: options } : options;

  const { data } = await axios.get(`${baseURL}/me`, {
    headers: { Authorization: accessToken },
  });

  return data;
});

export const getSigninOptions = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  SigninOptions[]
>(async function ({ queryKey: [redirectTo] }) {
  const { data } = await axios.post('/service/auth/supabase/info', {
    redirectTo,
  });

  return data;
});
