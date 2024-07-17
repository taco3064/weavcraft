import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './MainLayout.types';

export const useMenuStyles = makeStyles<{ isAuth: boolean }>({
  name: 'UserAvatarMenu',
})((theme, { isAuth }) => ({
  thumb: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    filter: `brightness(${isAuth ? 1 : 0.6})`,
  },
  content: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1.5, 3),
  },
}));

export const useMainStyles = makeStyles<StyleParams>({ name: 'MainLayout' })(
  (theme, { maxWidth = 'xs', menuMode }) => {
    const drawerWidth = Math.max(444, theme.breakpoints.values[maxWidth]);

    const nextWidth =
      theme.breakpoints.keys[theme.breakpoints.keys.indexOf(maxWidth) + 1] ||
      'xl';

    return {
      logo: {
        fontSize: '2.5rem',
      },
      header: {
        display: 'flex',
        height: theme.spacing(menuMode ? 4 : 8),
        top: theme.spacing(menuMode ? 2 : 0),
        marginBottom: theme.spacing(menuMode ? 4 : 0),

        borderRadius: !menuMode
          ? 0
          : menuMode === 'nav'
          ? theme.spacing(4, 0, 0, 4)
          : theme.spacing(0, 4, 4, 0),

        transition: theme.transitions.create(
          ['border-radius', 'height', 'margin', 'top'],
          {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
        ),
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
        width: `calc(100vw - ${menuMode ? drawerWidth + 8 : 0}px)`,

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: process.env.NEXT_PUBLIC_TRANSITION_DURATION,
        }),
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        [theme.breakpoints.up('md')]: {
          marginLeft: menuMode !== 'nav' ? 0 : drawerWidth + 8,
          marginRight: menuMode !== 'custom' ? 0 : drawerWidth + 8,
        },
      },
      drawer: {
        maxWidth: '100%',
        width: drawerWidth,
        borderRadius: 0,
        userSelect: 'none',

        [theme.breakpoints.up(nextWidth)]: {
          borderRadius:
            menuMode === 'custom'
              ? theme.spacing(4, 0, 0, 4)
              : theme.spacing(0, 4, 4, 0),
        },
        [theme.breakpoints.down(nextWidth)]: {
          width: '100%',
        },
        '& > [role="navigation"]': {
          background: 'inherit',
          height: '100%',
          overflow: 'hidden auto',

          '& > *': {
            gap: 0,
          },
          '& > *[role="heading"]': {
            display: 'flex',
            background: 'inherit',
            height: theme.spacing(8),
            alignItems: 'center',
          },
        },
      },
      custom: {
        background: 'inherit',
        height: '100%',
        overflow: 'hidden auto',
      },
      avatar: {
        display: 'flex',
        alignItems: 'center',

        '& > *': {
          color: `${theme.palette.primary.contrastText} !important`,
          background: `${theme.palette.primary.main} !important`,
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
