import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { NAV_ITEMS, USER_SETTINGS } from './useAppMenuItems.const';
import { useAuthState } from '~web/contexts';
import type {
  MenuItemOptions,
  NavItem,
  UserSettingType,
} from './useAppMenuItems.types';

export function useAppNavItems() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const resource = i18n.getResource(
      i18n.language,
      'common',
      'ttl-breadcrumbs'
    );

    return Object.keys(resource).reduce<NavItem[]>((result, id) => {
      if (id in NAV_ITEMS) {
        result.push({
          ...NAV_ITEMS[id],
          label: `ttl-breadcrumbs.${id}`,
          href: `/${id}`,
        });
      }

      return result;
    }, []);
  }, [i18n]);
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
  const { isAuth } = useAuthState();

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
