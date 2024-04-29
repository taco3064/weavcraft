import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { NAV_ITEMS } from './useAppMenuItems.const';
import type { MenuItemOptions, NavItem } from './useAppMenuItems.types';

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

export function useTutorialLessons(paramKey: string) {
  const { i18n } = useTranslation();
  const { query } = useRouter();
  const { [paramKey]: expanded } = query;

  const tutorials = useMemo(() => {
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

  return {
    expanded: (expanded as string) || tutorials[0].id,
    tutorials,
  };
}
