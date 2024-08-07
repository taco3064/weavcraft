import type { ReactElement } from 'react';
import type { Href, PortalContainerEl } from '../imports.types';

export interface Breadcrumb {
  label: string;
  href?: Href;
}

export interface BreadcrumbsProps {
  currentBreadcrumbLabel?: string;
  currentPageTitle: string;
  customBreadcrumbs?: Record<`/${string}`, 'nonLinkable' | 'hidden'>;
  disableGutters?: boolean;
  disableHeaderTitle?: boolean;
  stickyTop?: number;
  toolbar?: ReactElement | ((toolbarEl: PortalContainerEl) => void);

  onCatchAllRoutesTransform?: (
    name: string,
    value: string[] | string
  ) => Breadcrumb | Breadcrumb[] | undefined;
}

export interface BreadcrumbsHookParams
  extends Pick<
    BreadcrumbsProps,
    | 'currentPageTitle'
    | 'currentBreadcrumbLabel'
    | 'customBreadcrumbs'
    | 'onCatchAllRoutesTransform'
  > {
  isTutorialMode: boolean;
}
