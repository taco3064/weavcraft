import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { ParsedUrlQuery } from 'querystring';

import type { Breadcrumb, BreadcrumbsHookParams } from './Breadcrumbs.types';

export const useBreadcrumbs = (() => {
  function getQuery(query: ParsedUrlQuery, url: string) {
    const queryKey = Object.keys(query).find(
      (key) => url === (Array.isArray(query[key]) ? `[...${key}]` : `[${key}]`)
    );

    const queryValue = query[queryKey as string];

    if (queryKey && queryValue) {
      return Array.isArray(queryValue)
        ? {
            key: queryKey,
            value: queryValue,
          }
        : {
            key: queryKey,
            value: queryValue,
          };
    }
  }

  return ({
    currentPageTitle,
    currentBreadcrumbLabel = currentPageTitle,
    customBreadcrumbs,
    isTutorialMode,
    onCatchAllRoutesTransform,
  }: BreadcrumbsHookParams) => {
    const { t } = useTranslation();
    const { pathname, query } = useRouter();

    return pathname
      .split('/')
      .slice(1)
      .reduce<Breadcrumb[]>(
        (result, url, i, arr) => {
          const isLast = i === arr.length - 1;
          const matched = getQuery(query, url);

          if (matched) {
            const { key, value } = matched;
            const breadcrumbs = onCatchAllRoutesTransform?.(key, value) || [];

            result.push(
              ...(Array.isArray(breadcrumbs) ? breadcrumbs : [breadcrumbs])
            );
          } else {
            const paths = arr.slice(0, i + 1);
            const href = `/${paths.join('/')}` as const;
            const { [href]: status } = customBreadcrumbs || {};

            if (status !== 'hidden') {
              result.push({
                href:
                  status === 'nonLinkable'
                    ? undefined
                    : `${isTutorialMode ? '/tutorial' : ''}${href}`,
                label: isLast
                  ? currentBreadcrumbLabel
                  : t(`ttl-breadcrumbs.${paths.join('.')}.label`),
              });
            }
          }

          return result;
        },
        !isTutorialMode || pathname === '/tutorial'
          ? []
          : [{ href: '/tutorial', label: t('ttl-breadcrumbs.tutorial.label') }]
      );
  };
})();
