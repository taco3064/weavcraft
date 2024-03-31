import type { ToolbarProps } from '@mui/material/Toolbar';
import type { UrlObject } from 'url';

export interface Breadcrumb {
  label: string;
  href?: string | UrlObject;
}

export interface BreadcrumbsProps extends Pick<ToolbarProps, 'disableGutters'> {
  currentBreadcrumbLabel?: string;
  currentPageTitle: string;
  onToolbarMount?: (toolbar: HTMLDivElement | null) => void;

  onCatchAllRoutesTransform?: (
    name: string,
    value: string[] | string
  ) => Breadcrumb | Breadcrumb[] | undefined;
}
