import axios from 'axios';
import _camelCase from 'lodash/camelCase';
import _get from 'lodash/get';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';
import type { UserData } from '@weavcraft/common';

import type {
  AccessTokenInfo,
  AccessTokenWithExpiry,
  MeOptions,
  RefreshTokensOptions,
  SigninOptions,
} from './account.types';

//* - User Account Services
export const getMe = withConnRefusedCatch<MeOptions | string, UserData>(
  async function (options) {
    const { accessToken, baseURL = '/service' } =
      typeof options === 'string' ? { accessToken: options } : options;

    const { data } = await axios.get('/me', {
      baseURL,
      headers: { Authorization: accessToken },
    });

    return data;
  }
);

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

export const getRefreshToken = withConnRefusedCatch<
  QueryFunctionParams<[]>,
  string | null
>(async function () {
  const { hash } = global.location || {};
  const info = getTokenInfo(hash);

  const { data = null } = !info
    ? {}
    : await axios.post('/service/auth/login/supabase', info);

  return {
    status: 200,
    success: true,
    data: _get(data, ['data', 'refreshToken']) || null,
  };
});

export const refreshTokens = withConnRefusedCatch<
  RefreshTokensOptions | string,
  Pick<AccessTokenInfo, 'accessToken' | 'refreshToken'>
>(async function (options) {
  const { refreshToken, baseURL = '/service' } =
    typeof options === 'string' ? { refreshToken: options } : options;

  const { data } = await axios.post(
    '/auth/refresh-access-token',
    { refreshToken },
    { baseURL }
  );

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
