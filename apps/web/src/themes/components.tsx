import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import type { ThemeOptions } from '@mui/material/styles';

import type { TransitionProps } from './types';

//* Dialog Transition
const Transition = forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

Transition.displayName = 'Transition';

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
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: `${theme.spacing(2)} !important`,

        '&::before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          borderRadius: `${theme.spacing(2)} !important`,

          '& + :not(.Mui-expanded)': {
            borderTopLeftRadius: theme.spacing(2),
            borderTopRightRadius: theme.spacing(2),
          },
        },
        '&:not(.Mui-expanded)': {
          '&:has(+ :not(.Mui-expanded))': {
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& + :not(.Mui-expanded)': {
            borderTopLeftRadius: '0 !important',
            borderTopRightRadius: '0 !important',
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
          filter: 'brightness(1.2)',
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
            margin: '0 !important',
            height: theme.spacing(6),
          },
        }),
      },
    ],
  },
  MuiDialog: {
    defaultProps: {
      TransitionComponent: Transition,
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
          filter: 'brightness(1.2)',
        },
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
          filter: 'brightness(1.2)',
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
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: theme.spacing(1),
      }),
    },
  },
  MuiMenu: {
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
