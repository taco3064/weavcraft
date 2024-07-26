import Cookies from 'js-cookie';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { AppSettingsContext } from './AppProviderManager.hooks';
import { getAuthTokens, refreshTokens } from '~web/services';
import type { AppSettingsProviderProps } from './AppProviderManager.types';

export default function AppSettingsProvider({
  children,
  value,
}: AppSettingsProviderProps) {
  const handleRef = useRef<Record<'refresh' | 'replace', () => void>>();
  const { asPath } = useRouter();

  const { data: tokens } = useSuspenseQuery({
    queryHash: 'auth-tokens',
    queryKey: [],
    queryFn: getAuthTokens,
  });

  const { mutate: onRefresh } = useMutation({
    mutationFn: refreshTokens,
    onSuccess: ({ accessToken, refreshToken }) => {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
    },
  });

  useImperativeHandle(
    handleRef,
    () => ({
      replace: () => global.location?.replace(asPath.replace(/#.*$/, '')),
      refresh: () => {
        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          onRefresh(refreshToken);
        }
      },
    }),
    [asPath, onRefresh]
  );

  useEffect(() => {
    const { refresh, replace } = handleRef.current || {};

    if (!tokens) {
      refresh?.();
    } else {
      Cookies.set('accessToken', tokens.accessToken);
      Cookies.set('refreshToken', tokens.refreshToken);
      replace?.();
    }
  }, [tokens]);

  return (
    <AppSettingsContext.Provider value={value}>
      {tokens ? null : children}
    </AppSettingsContext.Provider>
  );
}
