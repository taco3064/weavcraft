import type { Href } from '~web/hooks';
import type { PortalContainerEl } from '~web/components';

export interface Breadcrumb {
  label: string;
  href?: Href;
}

export interface BreadcrumbsProps {
  currentBreadcrumbLabel?: string;
  currentPageTitle: string;
  customBreadcrumbs?: Record<`/${string}`, 'nonLinkable' | 'hidden'>;
  disableGutters?: boolean;
  stickyTop?: number;
  onToolbarMount?: (toolbarEl: PortalContainerEl) => void;

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
