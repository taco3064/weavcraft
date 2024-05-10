import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './SwitchIconButton.types';

export const useButtonStyles = makeStyles<StyleParams>({
  name: 'SwitchIconButton',
})((theme, { classes }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    width: theme.spacing(6),
    height: theme.spacing(6),

    [`& > .${classes.icon}`]: {
      display: 'block',
    },
    [`& > .${classes.hoveredIcon}`]: {
      display: 'none',
    },

    '&:hover': {
      [`& > .${classes.icon}`]: {
        display: 'none',
      },
      [`& > .${classes.hoveredIcon}`]: {
        display: 'block',
      },
    },
  },
}));
