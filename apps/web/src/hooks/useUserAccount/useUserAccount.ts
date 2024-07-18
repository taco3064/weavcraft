import Cookies from 'js-cookie';
import Core from '@weavcraft/core';
import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { doSignIn, doSingOut, getMe, getSigninOptions } from '~web/services';
import { useAuthState } from '~web/contexts';
import type { MenuItemOptions } from '../useAppMenuItems';

import type { SigninOptions, SigninProvider } from '../imports.types';

export function useUserinfo() {
  const { isAuth } = useAuthState();

  const { data: userinfo } = useQuery({
    enabled: isAuth,
    queryKey: [],
    queryFn: getMe,
  });

  return userinfo;
}

export function useAuthMutation(disabled = false) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { providers, ...providerState } = useSigninProviders(disabled);

  const { mutate: onSignin, ...signinState } = useMutation({
    mutationFn: doSignIn,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: ({ accessToken }) => {
      Cookies.set('token', accessToken);
      global.location?.reload();
    },
  });

  const { mutate: onSignout, ...signoutState } = useMutation({
    mutationFn: doSingOut,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () => {
      Cookies.remove('token');
      global.location?.reload();

      enqueueSnackbar(t('msg-success-signout'), {
        variant: 'success',
      });
    },
  });

  return {
    providers,
    isPending: [providerState, signinState, signoutState].some(
      ({ isPending }) => isPending
    ),

    onSignout,
    onSignin: (provider: SigninProvider) =>
      onSignin(
        providers.find(({ options }) => options.provider === provider)
          ?.options as SigninOptions
      ),
  };
}

function useSigninProviders(disabled: boolean) {
  const { origin, pathname, search } = global.location || {};
  const { isAuth } = useAuthState();

  const { data: providers, isLoading: isPending } = useQuery({
    enabled: !disabled && !isAuth,
    queryKey: [[origin, pathname, search].join('')],
    queryFn: getSigninOptions,
  });

  return {
    isPending,

    providers: useMemo<MenuItemOptions<{ options: SigninOptions }>[]>(
      () =>
        providers?.map((options) => ({
          options,
          label: `btn-signin-with-${options.provider}`,
          icon: `fa${options.provider.replace(
            /^./,
            options.provider.charAt(0).toUpperCase()
          )}` as Core.IconCode,
        })) || [],
      [providers]
    ),
  };
}
