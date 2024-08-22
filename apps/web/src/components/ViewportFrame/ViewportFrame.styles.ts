import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './ViewportFrame.types';

export const useMainStyles = makeStyles<StyleParams>({ name: 'ViewportFrame' })(
  (theme, { breakpoint, scale, translateY }) => {
    const borderColor = theme.palette.common.black;

    return {
      root: {
        position: 'relative',
        display: 'flex',
        margin: 'auto',
        transform: `translateY(${translateY}px) !important`,

        transition: theme.transitions.create(['width', 'height', 'transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          background: theme.palette.action.disabled,
          transform: 'translate(-50%, -50%)',
        },
      },
      container: {
        paddingBottom: theme.spacing(8),
      },
      content: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',

        '& > iframe': {
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        },
        '& > [role="progressbar"]': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      },
      mobile: {
        maxWidth: process.env.NEXT_PUBLIC_XS_WIDTH,
        aspectRatio: '5 / 9.5',
        borderRadius: theme.spacing(4 * scale),
        borderStyle: 'solid',
        borderWidth: theme.spacing(
          10 * scale,
          2 * scale,
          12 * scale,
          2 * scale
        ),
        borderColor,

        '&::before': {
          width: theme.spacing(12 * scale),
          height: theme.spacing(1 * scale),
          top: theme.spacing(-5 * scale),
          left: '50%',
          borderRadius: theme.spacing(1),
        },
        '&::after': {
          width: theme.spacing(8 * scale),
          height: theme.spacing(8 * scale),
          bottom: theme.spacing(-14 * scale),
          left: '50%',
          borderRadius: '50%',
        },
      },
      tablet: {
        maxWidth: theme.breakpoints.values[breakpoint],
        aspectRatio: '3 / 4',
        borderRadius: theme.spacing(4 * scale),
        borderStyle: 'solid',
        borderWidth: theme.spacing(6 * scale, 2 * scale, 8 * scale, 2 * scale),
        borderColor,

        '&::before': {
          width: theme.spacing(8 * scale),
          height: theme.spacing(0.5 * scale),
          top: theme.spacing(-3 * scale),
          left: '50%',
          borderRadius: theme.spacing(1),
        },
        '&::after': {
          width: theme.spacing(6 * scale),
          height: theme.spacing(6 * scale),
          bottom: theme.spacing(-10 * scale),
          left: '50%',
          borderRadius: '50%',
        },
      },
      laptop: {
        maxWidth: theme.breakpoints.values[breakpoint],
        width: '90%',
        aspectRatio: '4 / 2.7',
        borderRadius: theme.spacing(1 * scale),
        borderStyle: 'solid',
        borderWidth: theme.spacing(2 * scale, 2 * scale, 4 * scale),
        borderColor,

        '&::before': {
          width: '110%',
          height: theme.spacing(6 * scale),
          bottom: theme.spacing(-15 * scale),
          left: '50%',
          background: borderColor,
          borderRadius: theme.spacing(0, 0, 1 * scale, 1 * scale),
        },
        '&::after': {
          width: theme.spacing(30 * scale),
          height: theme.spacing(4 * scale),
          bottom: theme.spacing(-12 * scale),
          left: '50%',
          borderRadius: theme.spacing(0, 0, 1 * scale, 1 * scale),
        },
      },
    };
  }
);
