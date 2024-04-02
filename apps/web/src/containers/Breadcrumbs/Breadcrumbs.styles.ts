import { makeStyles } from 'tss-react/mui';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export const useBreadcrumbsStyles = makeStyles<
  Pick<BreadcrumbsProps, 'stickyTop'>
>({ name: 'Breadcrumbs' })((theme, { stickyTop }) => ({
  root: {
    userSelect: 'none',
    top: stickyTop,
  },
  right: {
    marginLeft: 'auto',
  },
}));
