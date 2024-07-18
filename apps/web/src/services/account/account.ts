import axios from 'axios';
import _camelCase from 'lodash/camelCase';
import type { UserData } from '@weavcraft/common';

import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

import type {
  AccessTokenInfo,
  AccessTokenWithExpiry,
  SigninOptions,
} from './account.types';

//* - User Account Services
export const getMe = withConnRefusedCatch<QueryFunctionParams<[]>, UserData>(
  async function () {
    const { data } = await axios.get('/service/me');

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

export const doSingOut = withConnRefusedCatch<void, void>(async function () {
  const { data } = await axios.post('/service/auth/logout');

  return data;
});

export const doSignIn = withConnRefusedCatch<
  SigninOptions,
  { accessToken: string }
>(async function (info) {
  const iframe = global.document?.createElement('iframe');

  iframe?.setAttribute('src', info.url);
  iframe?.setAttribute('style', 'display:none;');
  global.document.body.appendChild(iframe);

  return new Promise((resolve) =>
    iframe?.addEventListener('load', async () => {
      const { hash } = iframe.contentWindow?.location || {};
      const info = getTokenInfo(hash);

      if (!info) {
        return;
      }

      const { data } = await axios.post('/service/auth/login/supabase', info);

      iframe.remove();
      resolve(data);
    })
  );
});

const TOKEN_INFO_KEYS = [
  'accessToken',
  'providerToken',
  'refreshToken',
  'tokenType',
] as (keyof AccessTokenWithExpiry)[];

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
