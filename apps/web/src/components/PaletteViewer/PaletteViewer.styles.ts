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
})(
  (
    theme,
    {
      clickable,
      config: { background, text, ...config } = {},
      disableBorder,
      disableBorderRadius,
      disableResponsiveText,
      size,
    }
  ) => {
    const divider = config.divider || theme.palette.divider;

    return {
      root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: disableBorder ? 0 : `1px solid ${divider}`,
        borderRadius: disableBorderRadius ? 0 : theme.spacing(2),

        '& > *:not(.MuiDivider-root):not(.MuiGrid-root.MuiGrid-container)': {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          left: '50%',
          top: theme.spacing(14 * (Math.min(110, size / 2) / 110)),
          transform: 'translateX(-50%)',
          pointerEvents: 'none',

          [theme.breakpoints.down('md')]: {
            top: theme.spacing(8),
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
      responsiveFont: {
        fontSize: `${(Math.min(200, size / 2) / 120) * 100}%`,

        ...(!disableResponsiveText && {
          [theme.breakpoints.down('sm')]: {
            fontSize: '0.75em',
          },
        }),
      },
      divider: {
        position: 'absolute',
        top: theme.spacing(6),
        width: '100%',
        fontWeight: 600,

        '&::before, &::after': {
          borderTopColor: divider,
        },
        '& > .MuiDivider-wrapper': {
          display: 'flex',
          flexDirection: 'column',
          fontSize: '80%',
          color: text?.disabled || theme.palette.text.disabled,
        },
      },
      background: {
        height: `calc(${size}px + ${theme.spacing(16)})`,

        [theme.breakpoints.down('md')]: {
          height: `calc(${size}px + ${theme.spacing(7)})`,

          '& > *.MuiGrid-item': {
            padding: `${theme.spacing(0.5, 1)} !important`,
          },
        },
        '& > *.MuiGrid-item': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: theme.spacing(1, 2),
          fontWeight: 600,
          fontSize: '1em',
          cursor: clickable ? 'pointer' : 'default',

          '& > *': {
            pointerEvents: 'none',
            userSelect: 'none',
          },
          '&:first-of-type': {
            alignItems: 'flex-start',
            background: background?.default || theme.palette.background.default,
            borderRight: `1px solid ${divider}`,
            color: text?.primary || theme.palette.text.primary,

            '&:hover': {
              color: `${
                text?.secondary || theme.palette.text.secondary
              } !important`,
            },
          },
          '&:last-of-type': {
            alignItems: 'flex-end',
            background: background?.paper || theme.palette.background.paper,
            borderLeft: `1px solid ${divider}`,
            color: text?.secondary || theme.palette.text.secondary,

            '&:hover': {
              color: `${
                text?.primary || theme.palette.text.primary
              } !important`,
            },
          },
        },
      },
    };
  }
);
