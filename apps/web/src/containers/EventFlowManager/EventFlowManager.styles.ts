import { makeStyles } from 'tss-react/mui';

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
    '& div.react-flow__edges': {
      zIndex: theme.zIndex.tooltip,
    },
  },
  fitView: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
