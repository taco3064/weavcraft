import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './MainLayout.types';

export const useMenuStyles = makeStyles<{ isAuthenticated: boolean }>({
  name: 'UserAvatarMenu',
})((theme, { isAuthenticated }) => ({
  thumb: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    filter: `brightness(${isAuthenticated ? 1 : 0.6})`,
  },
  content: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1.5, 3),
  },
}));

export const useLayoutStyles = makeStyles<StyleParams>({ name: 'MainLayout' })(
  (theme, { maxWidth = 'xs', open }) => {
    const drawerWidth = Math.max(444, theme.breakpoints.values[maxWidth]);

    return {
      logo: {
        fontSize: '2.5rem',
      },
      header: {
        display: 'flex',

        transition: theme.transitions.create(
          ['border-radius', 'height', 'margin'],
          {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
        ),
        [theme.breakpoints.up('md')]: {
          borderRadius: open ? theme.spacing(4, 0, 0, 4) : 0,
          height: theme.spacing(open ? 6 : 8),
          margin: theme.spacing(open ? 1 : 0, 0),
        },
        '& > *': {
          height: theme.spacing(8),

          '& > [role="status"]': {
            marginLeft: 'auto',
          },
        },
      },
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

        '& > [role="navigation"]': {
          background: 'inherit',
          height: '100%',
          overflow: 'hidden auto',

          '& > *[role="heading"]': {
            background: 'inherit',
            height: theme.spacing(8),

            '& > *:last-child': {
              marginLeft: 'auto',
            },
          },
        },
      },
      avatar: {
        justifyContent: 'center',

        '& > *': {
          color: `${theme.palette.secondary.contrastText} !important`,
          background: `${theme.palette.secondary.main} !important`,
        },
      },
      description: {
        whiteSpace: 'pre-line',
        display: '-webkit-box',
        overflow: 'hidden',

        '&:not(:hover)': {
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        },
      },
    };
  }
);
