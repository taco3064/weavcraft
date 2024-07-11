import axios from 'axios';

import { withConnRefusedCatch, type QueryFunctionParams } from '../common';
import type { SigninOptions } from './auth.types';

export const getSigninOptions = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  SigninOptions[]
>(async function ({ queryKey: [redirectTo] }) {
  const { data } = await axios.post('/service/auth/supabase/info', {
    redirectTo,
  });

  return data;
});
