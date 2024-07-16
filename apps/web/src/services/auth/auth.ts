import axios from 'axios';

import { withConnRefusedCatch } from '../common';
import type { QueryFunctionParams } from '../common';
import type { SigninInfo, SigninOptions } from './auth.types';

export const getSigninOptions = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  SigninOptions[]
>(async function ({ queryKey: [redirectTo] }) {
  const { data } = await axios.post('/service/auth/supabase/info', {
    redirectTo,
  });

  return data;
});

export const getAccessToken = withConnRefusedCatch<
  QueryFunctionParams<[SigninInfo]>,
  { accessToken: string }
>(async function ({
  queryKey: [{ accessToken, providerToken, refreshToken, tokenType }],
}) {
  const { data } = await axios.post('/service/auth/login/supabase', {
    accessToken,
    providerToken,
    refreshToken,
    tokenType,
  });

  return data;
});

export const doSingOut = withConnRefusedCatch<void, void>(async function () {
  const { data } = await axios.post('/service/auth/logout');

  return data;
});
