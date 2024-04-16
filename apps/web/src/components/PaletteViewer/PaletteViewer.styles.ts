import { makeStyles } from 'tss-react/mui';
import type { Palette } from '@mui/material/styles';

export const useViewerStyles = makeStyles<Palette>({
  name: 'PaletteViewer',
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
      bottom: theme.spacing(1),
      transform: 'translateX(-50%)',
      pointerEvents: 'none',

      [theme.breakpoints.down('md')]: {
        bottom: theme.spacing(-1),
      },
      '& > svg': {
        borderRadius: '50%',
        width: '100% !important',

        [theme.breakpoints.down('md')]: {
          width: '80% !important',
        },
        '&:has(> g:hover)': {
          animation: 'rotation 20s infinite linear',
        },
        '& > g': {
          pointerEvents: 'auto',
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
      fontSize: '0.7em',
      height: theme.spacing(28),
    },
    '& > *.MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: theme.spacing(1),
      fontWeight: 600,
      fontSize: '1em',

      '& > *': {
        pointerEvents: 'none',
        userSelect: 'none',
      },
      '&:first-of-type': {
        alignItems: 'flex-start',
        background: background.default,
        borderRight: `1px solid ${divider}`,
        color: text.primary,

        '&:hover': {
          color: `${text.secondary} !important`,
        },
      },
      '&:last-of-type': {
        alignItems: 'flex-end',
        background: background.paper,
        borderLeft: `1px solid ${divider}`,
        color: text.secondary,

        '&:hover': {
          color: `${text.primary} !important`,
        },
      },
    },
  },
}));
