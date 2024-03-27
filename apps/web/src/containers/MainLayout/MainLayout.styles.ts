import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './MainLayout.types';

export const useHeaderStyles = makeStyles<Pick<StyleParams, 'open'>>({
  name: 'MainLayoutHeader',
})((theme, { open }) => ({
  root: {
    display: 'flex',

    transition: theme.transitions.create(['borderRadius', 'height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& > *': {
      height: theme.spacing(8),
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: open ? theme.spacing(4, 0, 0, 4) : 0,
      height: theme.spacing(open ? 6.5 : 8),
      marginTop: theme.spacing(open ? 1.5 : 0),
    },
  },
}));

export const useSubheaderStyles = makeStyles({ name: 'MainLayoutSubheader' })(
  (theme) => ({
    root: {
      background: 'inherit',

      '& > *': {
        height: theme.spacing(8),
      },
    },
  })
);

export const useLayoutStyles = makeStyles<StyleParams>({ name: 'MainLayout' })(
  (theme, { maxWidth = 'xs', open }) => {
    const drawerWidth = Math.max(444, theme.breakpoints.values[maxWidth]);

    return {
      content: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5),
        marginLeft: open ? drawerWidth + 8 : 0,
        width: `calc(100vw - ${open ? drawerWidth : 0}px)`,

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('md')]: {
          marginLeft: 0,
          width: '100%',
        },
      },
      drawer: {
        maxWidth: '100%',
        width: drawerWidth,
        borderRadius: theme.spacing(0, 4, 4, 0),
      },
      list: {
        background: 'inherit',
        height: '100%',
        overflow: 'hidden auto',
      },
    };
  }
);
