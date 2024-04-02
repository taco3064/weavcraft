import { makeStyles } from 'tss-react/mui';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export const useBreadcrumbsStyles = makeStyles<
  Pick<BreadcrumbsProps, 'stickyTop'>
>({ name: 'Breadcrumbs' })((theme, { stickyTop }) => ({
  root: {
    userSelect: 'none',
    top: stickyTop,
    background: theme.palette.background.default,

    '& > *[role="toolbar"]': {
      padding: theme.spacing(0, 1.5),
    },
  },
  right: {
    marginLeft: 'auto',
  },
}));
