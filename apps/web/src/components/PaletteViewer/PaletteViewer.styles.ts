import { makeStyles } from 'tss-react/mui';
import type { ViewerStyleParams } from './PaletteViewer.types';

export const useTooltipStyles = makeStyles<Record<string, string>>({
  name: 'TooltipContent',
})((theme, { color, contrastText }) => ({
  root: {
    background: color,
    border: `1px solid ${theme.palette.divider}`,
    opacity: 0.8,
  },
  markCell: {
    display: 'none',
  },
  labelCell: {
    color: contrastText,
  },
  valueCell: {
    color: `${contrastText} !important`,
  },
}));

export const useViewerStyles = makeStyles<ViewerStyleParams>({
  name: 'PaletteViewer',
})((theme, { clickable, size, palette: { background, divider, text } }) => ({
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
      bottom: theme.spacing(2),
      transform: 'translateX(-50%)',
      pointerEvents: 'none',

      [theme.breakpoints.down('md')]: {
        bottom: theme.spacing(0),
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
    fontSize: `${Math.min(150, size / 2)}%` as never,
    height: `calc(${size}px + ${theme.spacing(10)})`,

    [theme.breakpoints.down('md')]: {
      fontSize: '0.7em',
      height: `calc(${size}px + ${theme.spacing(4)})`,
    },
    '& > *.MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: theme.spacing(1),
      fontWeight: 600,
      fontSize: '1em',
      cursor: clickable ? 'pointer' : 'default',

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
