import type { ToolbarProps } from '@mui/material/Toolbar';
import type { Href, PortalContainerEl } from '~web/components';

export interface Breadcrumb {
  label: string;
  href?: Href;
}

export interface BreadcrumbsProps extends Pick<ToolbarProps, 'disableGutters'> {
  currentBreadcrumbLabel?: string;
  currentPageTitle: string;
  onToolbarMount?: (toolbarEl: PortalContainerEl) => void;

  onCatchAllRoutesTransform?: (
    name: string,
    value: string[] | string
  ) => Breadcrumb | Breadcrumb[] | undefined;
}
