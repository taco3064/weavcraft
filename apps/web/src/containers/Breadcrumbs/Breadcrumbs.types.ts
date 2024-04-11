import type { Href, PortalContainerEl } from '~web/components';

export interface Breadcrumb {
  label: string;
  href?: Href;
}

export interface BreadcrumbsProps {
  currentBreadcrumbLabel?: string;
  currentPageTitle: string;
  isInTutorial?: boolean;
  stickyTop?: number;
  onToolbarMount?: (toolbarEl: PortalContainerEl) => void;

  onCatchAllRoutesTransform?: (
    name: string,
    value: string[] | string
  ) => Breadcrumb | Breadcrumb[] | undefined;
}
