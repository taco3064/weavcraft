import { makeStyles } from 'tss-react/mui';

export const useBreadcrumbsStyles = makeStyles({ name: 'Breadcrumbs' })(
  (theme) => ({
    root: {
      userSelect: 'none',
    },
    right: {
      marginLeft: 'auto',
    },
  })
);
