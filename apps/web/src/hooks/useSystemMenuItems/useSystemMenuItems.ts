import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { NAV_ITEMS } from './useSystemMenuItems.const';
import type { MenuItemOptions } from '../useAuth';
import type { NavItem } from './useSystemMenuItems.types';

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

export function useTutorialLessons() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const resource = i18n.getResource(i18n.language, 'tutorial', 'ttl-lessons');

    return Object.keys(resource).reduce<Exclude<MenuItemOptions, 'divider'>[]>(
      (result, id) => [
        ...result,
        {
          label: `ttl-breadcrumbs.${id}.label`,
          icon: NAV_ITEMS[id]?.icon,
          href: `/tutorial/${id}`,
          items: Object.keys(resource[id] || {}).map((key) => ({
            href: `/tutorial/${id}#${key}`,
            label: `tutorial:ttl-lessons.${id}.${key}`,
          })),
        },
      ],
      []
    );
  }, [i18n]);
}
