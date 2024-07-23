import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { ParsedUrlQuery } from 'querystring';

import type { Breadcrumb, BreadcrumbsHookParams } from './Breadcrumbs.types';

export function useBreadcrumbs({
  currentPageTitle,
  currentBreadcrumbLabel = currentPageTitle,
  customBreadcrumbs,
  isTutorialMode,
  onCatchAllRoutesTransform,
}: BreadcrumbsHookParams) {
  const { t } = useTranslation();
  const { pathname, query } = useRouter();

  return pathname
    .split('/')
    .slice(1)
    .reduce<Breadcrumb[]>(
      (result, url, i, arr) => {
        const matched = getQuery(query, url);

        if (matched) {
          const { key, value } = matched;
          const breadcrumbs = onCatchAllRoutesTransform?.(key, value) || [];

          result.push(
            ...(Array.isArray(breadcrumbs) ? breadcrumbs : [breadcrumbs])
          );

          return result;
        }

        const isLast = i === arr.length - 1;
        const paths = arr.slice(0, i + 1);
        const href = `/${paths.join('/')}` as const;
        const { [href]: status } = customBreadcrumbs || {};

        if (status === 'nonLinkable') {
          result.push({
            label: isLast
              ? currentBreadcrumbLabel
              : t(`ttl-breadcrumbs.${paths.join('.')}.label`),
          });
        } else if (status !== 'hidden') {
          result.push({
            href: `${isTutorialMode ? '/tutorial' : ''}${href}`,
            label: isLast
              ? currentBreadcrumbLabel
              : t(`ttl-breadcrumbs.${paths.join('.')}.label`),
          });
        }

        return result;
      },
      !isTutorialMode || pathname === '/tutorial'
        ? []
        : [{ href: '/tutorial', label: t('ttl-breadcrumbs.tutorial.label') }]
    );
}

function getQuery(query: ParsedUrlQuery, url: string) {
  const queryKey = Object.keys(query).find(
    (key) => url === (Array.isArray(query[key]) ? `[...${key}]` : `[${key}]`)
  );

  const queryValue = query[queryKey as string];

  if (queryKey && queryValue) {
    return {
      key: queryKey,
      value: queryValue,
    };
  }
}
