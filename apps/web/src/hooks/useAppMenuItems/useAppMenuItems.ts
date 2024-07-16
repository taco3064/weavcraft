import Core from '@weavcraft/core';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { NAV_ITEMS } from './useAppMenuItems.const';
import { getSigninOptions } from '~web/services';
import { useAuth } from '~web/contexts';
import type { MenuItemOptions, NavItem } from './useAppMenuItems.types';
import type { SigninProvider } from '../imports.types';

export function useAppNavItems() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const resource = i18n.getResource(
      i18n.language,
      'common',
      'ttl-breadcrumbs'
    );

    return Object.keys(resource).reduce<NavItem[]>(
      (result, id) => [
        ...result,
        {
          ...NAV_ITEMS[id],
          label: `ttl-breadcrumbs.${id}`,
          href: `/${id}`,
        },
      ],
      []
    );
  }, [i18n]);
}

export function useSigninOptions(disabled = false) {
  const origin = global.location?.origin;

  const { pathname } = useRouter();
  const { isAuthenticated } = useAuth();

  const queryHash = useMemo(() => {
    return !disabled && !isAuthenticated && Boolean(origin)
      ? nanoid()
      : undefined;
  }, [disabled, isAuthenticated, origin]);

  const { data: options, isLoading } = useQuery({
    enabled: Boolean(queryHash),
    queryHash,
    queryKey: [`${origin}/${pathname.replace(/^\//, '')}`],
    queryFn: getSigninOptions,
  });

  return {
    isLoading,
    options: useMemo<MenuItemOptions[]>(
      () =>
        options?.map(({ provider }) => ({
          label: `btn-signin-with-${provider}`,
          icon: `fa${provider.replace(
            /^./,
            provider.charAt(0).toUpperCase()
          )}` as Core.IconCode,
        })) || [],
      [options]
    ),
    onSignin: (provider: SigninProvider) =>
      global.location?.replace(
        options?.find(({ provider: p }) => p === provider)?.url as string
      ),
  };
}

export function useTutorialLessons() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const resource = i18n.getResource(i18n.language, 'tutorial', 'ttl-lessons');

    return Object.keys(resource).reduce<
      Exclude<MenuItemOptions & { id: string }, 'divider'>[]
    >((result, id) => {
      const label = `ttl-breadcrumbs.${id}.label`;

      return [
        ...result,
        {
          id: label.replace(/^ttl-breadcrumbs\./, '').replace(/\.label$/, ''),
          label,
          icon: NAV_ITEMS[id]?.icon,
          href: `/tutorial/${id}`,
          items: Object.keys(resource[id] || {}).map((key) => ({
            href: `/tutorial/${id}#${key}`,
            label: `tutorial:ttl-lessons.${id}.${key}`,
          })),
        },
      ];
    }, []);
  }, [i18n]);
}
