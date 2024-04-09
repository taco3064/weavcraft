import { makeStyles } from 'tss-react/mui';
import type { ThemePalette } from '@weavcraft/types';

export const useDisplayStyles = makeStyles<ThemePalette>({
  name: 'PaletteDisplay',
})((theme, { background, divider, text }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '& > *:not(.MuiGrid-root.MuiGrid-container)': {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      left: '50%',
      bottom: theme.spacing(-4),
      transform: 'translateX(-50%)',

      [theme.breakpoints.down('md')]: {
        bottom: theme.spacing(-6),
      },
      '& > svg': {
        width: '100% !important',

        [theme.breakpoints.down('md')]: {
          width: '80% !important',
        },
        '&:hover': {
          animation: 'rotation 20s infinite linear',
        },
        '& > g': {
          transform: 'translate(-5px, -5px)',
        },
        '@keyframes rotation': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(359deg)',
          },
        },
      },
    },
  },
  background: {
    height: theme.spacing(34),

    [theme.breakpoints.down('md')]: {
      fontSize: '0.75em',
      height: theme.spacing(28),
    },
    '& > *.MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: theme.spacing(1),
      fontWeight: 600,
      fontSize: '1.125em',

      '&:first-of-type': {
        alignItems: 'flex-start',
        background: background.default,
        borderRight: `1px solid ${divider}`,
        color: text.primary,
      },
      '&:last-of-type': {
        alignItems: 'flex-end',
        background: background.paper,
        borderLeft: `1px solid ${divider}`,
        color: text.secondary,
      },
    },
  },
}));
