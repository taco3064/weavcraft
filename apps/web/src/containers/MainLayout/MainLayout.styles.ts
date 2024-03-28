import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './MainLayout.types';

export const useMenuStyles = makeStyles({ name: 'UserAvatarMenu' })(
  (theme) => ({
    thumb: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    content: {
      padding: 0,
    },
    item: {
      padding: theme.spacing(1.5, 3),
    },
  })
);

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
          height: theme.spacing(open ? 6.5 : 8),
          marginTop: theme.spacing(open ? 1.5 : 0),
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
      icon: {
        justifyContent: 'center',
      },
      description: {
        whiteSpace: 'pre-line',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
      },
    };
  }
);
