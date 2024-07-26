import Cookies from 'js-cookie';
import _capitalize from 'lodash/capitalize';
import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { doSingOut, getMe, getSigninOptions } from '~web/services';
import { useAuthState } from '~web/contexts';
import type { MenuItemOptions } from '../useAppMenuItems';
import type { SigninOptions, SigninProvider } from '../imports.types';

export function useUserinfo() {
  const { isAuth, accessToken } = useAuthState();

  const { data: userinfo } = useQuery({
    enabled: isAuth,
    queryKey: [accessToken as string],
    queryFn: getMe,
  });

  return userinfo;
}

export function useAuthMutation(disabled = false) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { providers, ...providerState } = useSigninProviders(disabled);

  const { mutate: onSignout, ...signoutState } = useMutation({
    mutationFn: doSingOut,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      global.location?.reload();

      enqueueSnackbar(t('msg-success-signout'), {
        variant: 'success',
      });
    },
  });

  return {
    providers,
    isPending: [providerState, signoutState].some(({ isPending }) => isPending),
    onSignout: () => onSignout(Cookies.get('refreshToken') as string),

    onSignin: (provider: SigninProvider) => {
      if (global.location) {
        const { url } = providers.find(
          ({ options }) => options.provider === provider
        )?.options as SigninOptions;

        global.location.replace(url);
      }
    },
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
        providers?.map((options) => {
          const { provider } = options;

          const icon = `fa${
            _capitalize(provider) as Capitalize<SigninProvider>
          }` as const;

          return {
            options,
            icon,
            label: `btn-signin-with-${provider}`,
          };
        }) || [],
      [providers]
    ),
  };
}
