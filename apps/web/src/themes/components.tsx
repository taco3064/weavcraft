import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import type { ThemeOptions } from '@mui/material/styles';

import type { TransitionProps } from './themes.types';

const NONE_IMPORTANT = '0 !important';
const BRIGHTNESS_HIGHLIGHT = 'brightness(1.2)';

//* Dialog Transition
export const SlideDownTransition = forwardRef<unknown, TransitionProps>(
  (props, ref) => <Slide ref={ref} direction="down" {...props} />
);

export const SlideUpTransition = forwardRef<unknown, TransitionProps>(
  (props, ref) => <Slide ref={ref} direction="up" {...props} />
);

SlideDownTransition.displayName = 'SlideDownTransition';
SlideUpTransition.displayName = 'SlideUpTransition';

//* Default Component Styles
export const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        overflow: 'hidden !important',
      },
      body: {
        fontFamily: 'Verdana',
        overflow: 'hidden auto',
        maxHeight: '100vh',
      },
    },
  },
  MuiAccordion: {
    defaultProps: {
      slotProps: { transition: { timeout: 600 } },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        width: '100%',
        borderRadius: `${theme.spacing(2)} !important`,

        '&::before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          borderRadius: `${theme.spacing(2)} !important`,

          '& + :not(.Mui-expanded):not(button)': {
            borderTopLeftRadius: theme.spacing(2),
            borderTopRightRadius: theme.spacing(2),
          },
        },
        '&:not(.Mui-expanded):not(button)': {
          '&:has(+ :not(.Mui-expanded):not(button))': {
            borderBottomLeftRadius: NONE_IMPORTANT,
            borderBottomRightRadius: NONE_IMPORTANT,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& + :not(.Mui-expanded):not(button)': {
            borderTopLeftRadius: NONE_IMPORTANT,
            borderTopRightRadius: NONE_IMPORTANT,
          },
        },
      }),
    },
  },
  MuiAccordionActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        '&:has(*)': {
          padding: theme.spacing(1),
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-expanded > .MuiAccordionSummary-content': {
          color: theme.palette.text.primary,
        },
      }),
      content: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.disabled,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: 600,
        gap: theme.spacing(1),
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      action: {
        alignItems: 'center',
      },
      icon: ({ theme }) => ({
        fontSize: theme.typography.h4.fontSize,
        alignItems: 'center',
      }),
      message: {
        whiteSpace: 'pre-line',
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      position: 'sticky',
    },
    styleOverrides: {
      root: {
        justifyContent: 'center',
        userSelect: 'none',
      },
    },
    variants: [
      {
        props: { variant: 'outlined' },
        style: ({ theme }) => ({
          background: theme.palette.background.paper,
          borderRadius: `${theme.spacing(2.5)} / 50%`,
        }),
      },
    ],
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        userSelect: 'none',

        '&:hover': {
          filter: BRIGHTNESS_HIGHLIGHT,
        },
      },
      containedInherit: ({ theme }) => ({
        background: theme.palette.text.disabled,
        color: theme.palette.getContrastText(theme.palette.text.disabled),
      }),
    },
  },
  MuiButtonGroup: {
    variants: [
      {
        props: { component: DialogActions },
        style: ({ theme }) => ({
          display: 'flex',
          gap: 0,
          padding: 0,

          '& > *:first-of-type': {
            borderRadius: theme.spacing(0, 0, 0, 2),
          },
          '& > *:last-of-type': {
            borderRadius: theme.spacing(0, 0, 2, 0),
          },
          '& > *': {
            margin: NONE_IMPORTANT,
            height: theme.spacing(6),
          },
        }),
      },
    ],
  },
  MuiCollapse: {
    styleOverrides: {
      wrapperInner: {
        width: '100%',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      maxWidthXs: {
        maxWidth: `${process.env.NEXT_PUBLIC_XS_WIDTH}px !important`,
      },
    },
  },
  MuiDialog: {
    defaultProps: {
      TransitionComponent: SlideUpTransition,
      transitionDuration: 400,
      onPointerDown: (e) => e.stopPropagation(),
      onTouchEnd: (e) => e.stopPropagation(),
    },
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.spacing(2),
      }),
      paperFullScreen: {
        borderRadius: 0,
      },
    },
  },
  MuiDialogContent: {
    defaultProps: {
      dividers: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1.5, 3),
      }),
    },
    variants: [
      {
        props: { dividers: true },
        style: {
          borderBottom: 0,
        },
      },
    ],
  },
  MuiDialogTitle: {
    defaultProps: {
      color: 'secondary',
      fontWeight: 'bolder',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        justifyContent: 'center',
        height: theme.spacing(8),
        padding: theme.spacing(1.5, 3),
        userSelect: 'none',
      }),
    },
  },
  MuiDrawer: {
    defaultProps: {
      transitionDuration: process.env.NEXT_PUBLIC_TRANSITION_DURATION,
    },
  },
  MuiFilledInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
      }),
    },
  },
  MuiIcon: {
    defaultProps: {
      baseClassName: 'material-icons-outlined',
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        userSelect: 'none',

        '&:hover': {
          filter: BRIGHTNESS_HIGHLIGHT,
        },
      },
    },
  },
  MuiImageList: {
    styleOverrides: {
      root: {
        width: '100%',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(1),
        fontWeight: 500,

        '&:hover': {
          filter: BRIGHTNESS_HIGHLIGHT,
          fontWeight: 600,
        },
        '&:disabled': {
          pointerEvents: 'none !important',
          textDecoration: 'none !important',
        },
      }),
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        width: '100%',
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        zIndex: theme.zIndex.appBar,
      }),
    },
  },
  MuiMenu: {
    defaultProps: {
      onPointerDown: (e) => e.stopPropagation(),
      onTouchEnd: (e) => e.stopPropagation(),
    },
    styleOverrides: {
      paper: {
        borderRadius: 12,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeLarge: {
        fontSize: '1.5rem',
      },
      fontSizeMedium: {
        fontSize: '1.2rem',
      },
      fontSizeSmall: {
        fontSize: '1rem',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      labelIcon: ({ theme }) => ({
        minHeight: theme.spacing(8),
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      margin: 'normal',
      variant: 'filled',
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        alignItems: 'center',
        gap: 8,
      },
    },
  },
  MuiTooltip: {
    defaultProps: {
      slotProps: {
        popper: {
          onPointerDown: (e) => e.stopPropagation(),
          onTouchEnd: (e) => e.stopPropagation(),
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
    },
  },
};
