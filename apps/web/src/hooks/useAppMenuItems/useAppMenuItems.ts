import Core from '@weavcraft/core';
import _capitalize from 'lodash/capitalize';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

import { NAV_ITEMS, USER_SETTINGS } from './useAppMenuItems.const';
import { getSigninOptions } from '~web/services';
import { useAuth } from '../useAppSettingsContext';
import type { SigninOptions, SigninProvider } from '../imports.types';

import type {
  MenuItemOptions,
  NavItem,
  UserSettingType,
} from './useAppMenuItems.types';

export function useNavIcon(category: string) {
  return NAV_ITEMS[category]?.icon as Core.IconCode;
}

export function useAppNavItems() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const resource = i18n.getResource(
      i18n.language,
      'common',
      'ttl-breadcrumbs'
    );

    return Object.keys(resource).reduce<NavItem[]>((result, category) => {
      if (category in NAV_ITEMS) {
        result.push({
          ...NAV_ITEMS[category],
          label: `ttl-breadcrumbs.${category}`,
          href: `/${category}`,
        });
      }

      return result;
    }, []);
  }, [i18n]);
}

export function useSigninProviders(disabled = false) {
  const { origin, pathname, search } = global.location || {};
  const { isAuth } = useAuth();

  const { data: providers, isLoading: isPending } = useQuery({
    enabled: !disabled && !isAuth,
    queryKey: [[origin, pathname, search].join('')],
    queryFn: getSigninOptions,
  });

  const options = useMemo<MenuItemOptions<{ options: SigninOptions }>[]>(
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
  );

  return {
    isPending,
    providers: options,

    onSignin: (provider: SigninProvider) => {
      if (global.location) {
        const { url } = options.find(
          ({ options }) => options.provider === provider
        )?.options as SigninOptions;

        global.location.replace(url);
      }
    },
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

export function useUserSettings<T>(externals?: Record<UserSettingType, T>) {
  const { isAuth } = useAuth();

  return {
    options: useMemo(
      () =>
        USER_SETTINGS.reduce<MenuItemOptions[]>((acc, { id, icon, auth }) => {
          const label = `lbl-${id}`;
          const href = `/user-settings/${id}`;

          if (!auth || isAuth) {
            acc.push({ icon, label, href });
          }

          return acc;
        }, []),
      [isAuth]
    ),
    settings: USER_SETTINGS.map((setting) => ({
      ...setting,
      external: externals?.[setting.id] as T,
    })),
  };
}
