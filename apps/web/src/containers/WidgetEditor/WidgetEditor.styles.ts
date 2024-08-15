import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './WidgetEditor.types';

export const useMainStyles = makeStyles<MainStyleParams>({
  name: 'WidgetEditor',
})((theme, { marginTop }) => ({
  root: {
    marginTop:
      typeof marginTop === 'number' &&
      Number.isFinite(marginTop) &&
      !Number.isNaN(marginTop)
        ? marginTop
        : 0,
  },
  tabs: {
    marginBottom: theme.spacing(2),
    '& + *': {
      height: '100%',
      overflow: 'hidden auto',
    },

    '& button.MuiTab-root': {
      textTransform: 'capitalize',
    },
  },
  content: {
    alignItems: 'center',
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 3),
    userSelect: 'none',
  },
}));
