import axios from 'axios';
import _camelCase from 'lodash/camelCase';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';
import type { UserData } from '@weavcraft/common';

import type {
  AccessTokenInfo,
  AccessTokenWithExpiry,
  SigninOptions,
} from './account.types';

//* - User Account Services
export const getMe = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  UserData
>(async function ({ queryKey: [accessToken] }) {
  const { data } = await axios.get('/service/me', {
    headers: { Authorization: accessToken },
  });

  return data;
});

//* - Auth Services
export const getSigninOptions = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  SigninOptions[]
>(async function ({ queryKey: [redirectTo] }) {
  const { data } = await axios.post('/service/auth/supabase/info', {
    redirectTo,
  });

  return data;
});

export const getAuthTokens = withConnRefusedCatch<
  QueryFunctionParams<[]>,
  Pick<AccessTokenInfo, 'accessToken' | 'refreshToken'> | null
>(async function () {
  const { hash } = global.location || {};
  const info = getTokenInfo(hash);

  if (info) {
    const { data } = await axios.post('/service/auth/login/supabase', info);

    return data;
  }

  return { status: 200, success: true, data: null };
});

export const refreshTokens = withConnRefusedCatch<
  string,
  Pick<AccessTokenInfo, 'accessToken' | 'refreshToken'>
>(async function (refreshToken) {
  const { data } = await axios.post('/service/auth/refresh-access-token', {
    refreshToken,
  });

  return data;
});

export const doSingOut = withConnRefusedCatch<string, void>(async function (
  refreshToken
) {
  const { data } = await axios.post('/service/auth/logout', { refreshToken });

  return data;
});

const TOKEN_INFO_KEYS: (keyof AccessTokenWithExpiry)[] = [
  'accessToken',
  'providerToken',
  'refreshToken',
  'tokenType',
];

function getTokenInfo(hash?: string) {
  const validKeys = Object.values(TOKEN_INFO_KEYS).flat();

  const params = Object.fromEntries(
    Array.from(new URLSearchParams(hash).entries()).map(([key, value]) => [
      _camelCase(key) as keyof AccessTokenInfo,
      value,
    ])
  );

  return validKeys.some((key) => !(key in params))
    ? undefined
    : Object.entries(params).reduce((acc, [key, value]) => {
        const fieldName = _camelCase(key) as keyof AccessTokenWithExpiry;

        return !TOKEN_INFO_KEYS.includes(fieldName)
          ? acc
          : { ...acc, [fieldName]: value };
      }, {} as AccessTokenInfo);
}
