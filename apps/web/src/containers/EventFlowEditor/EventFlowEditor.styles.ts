import { makeStyles } from 'tss-react/mui';

export const useToolbarStyles = makeStyles({ name: 'FlowToolbar' })(
  (theme) => ({
    root: {
      position: 'absolute',
      bottom: theme.spacing(2),
    },
    toolbar: {
      right: theme.spacing(2),
    },
    viewport: {
      left: theme.spacing(2),
    },
  })
);

export const useMainStyles = makeStyles({ name: 'EventFlowEditor' })(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  flow: {
    position: 'relative',
    width: '100%',
    height: '100%',

    '& div:has(> a[aria-label="React Flow attribution"])': {
      display: 'none !important',
    },
  },
}));
