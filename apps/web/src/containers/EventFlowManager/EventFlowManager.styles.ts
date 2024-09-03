import { makeStyles } from 'tss-react/mui';

export const useStartNodeStyles = makeStyles({ name: 'StartNode' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    node: {
      padding: 2,
      fontSize: theme.typography.h3.fontSize,
    },
  })
);

export const useEditorStyles = makeStyles({ name: 'Editor' })((theme) => ({
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
  fitView: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
