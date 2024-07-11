import Cookies from 'js-cookie';
import Core from '@weavcraft/core';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getSigninOptions } from '~web/services';
import type { AuthState } from './useAuth.types';
import type { MenuItemOptions } from '../useAppMenuItems';

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,

  signin: async (type) => {
    set({ isAuthenticated: true });
    Cookies.set('token', nanoid());
  },
  signout: async () => {
    set({ isAuthenticated: false });
    Cookies.remove('token');
    global.location?.reload();
  },
}));

export function useSigninOptions() {
  const origin = global.location?.origin;

  const { pathname } = useRouter();
  const { isAuthenticated } = useAuth();

  const { data: options } = useQuery({
    enabled: !isAuthenticated && Boolean(origin),
    queryKey: [`${origin}/${pathname.replace(/^\//, '')}`],
    queryFn: getSigninOptions,
  });

  return useMemo<MenuItemOptions[]>(
    () =>
      options?.map(({ provider }) => ({
        label: `btn-signin-with-${provider}`,
        icon: `fa${provider.replace(
          /^./,
          provider.charAt(0).toUpperCase()
        )}` as Core.IconCode,
      })) || [],
    [options]
  );
}
