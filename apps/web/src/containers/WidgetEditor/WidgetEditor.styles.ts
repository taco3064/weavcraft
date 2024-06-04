import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './WidgetEditor.types';

export const useAppendNodeStyles = makeStyles({
  name: 'AppendNode',
})((theme) => ({
  toggle: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary.contrastText,
    margin: theme.spacing(1),
  },
}));

export const useSettingStyles = makeStyles({ name: 'PrimitiveValue' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100% - ${theme.spacing(8)})`,
      overflow: 'hidden auto',

      '& > *': {
        width: '100%',
      },
    },
    row: {
      '& > *': {
        margin: '0 !important',
      },
    },
    tabs: {
      '& + *': {
        height: '100%',
        overflow: 'hidden auto',
      },
    },
  })
);

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
