import { makeStyles } from 'tss-react/mui';
import type { DrawerStyleParams } from './Drawer.types';

export const useDrawerStyles = makeStyles<DrawerStyleParams>({
  name: 'Drawer',
})((theme, { breakpoint, open, width }) => ({
  content: {
    marginLeft: open ? width : 0,
    width: `calc(100% - ${open ? width : 0}px)`,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down(breakpoint)]: {
      marginLeft: 0,
      width: '100%',
    },
  },
  paper: {
    width,

    [theme.breakpoints.down(breakpoint)]: {
      width: '100%',
    },
  },
}));
