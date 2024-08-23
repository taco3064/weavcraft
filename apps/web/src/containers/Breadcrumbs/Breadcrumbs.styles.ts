import { makeStyles } from 'tss-react/mui';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export const useMainStyles = makeStyles<Pick<BreadcrumbsProps, 'stickyTop'>>({
  name: 'Breadcrumbs',
})((theme, { stickyTop }) => ({
  root: {
    userSelect: 'none',
    top: stickyTop,
    background: theme.palette.background.default,
  },
  right: {
    marginLeft: 'auto',
  },
}));
