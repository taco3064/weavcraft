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
      body: {
        fontFamily: 'Verdana',
        overflow: 'hidden auto',
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        // borderRadius: theme.spacing(2),

        '&.Mui-expanded': {
          borderRadius: `${theme.spacing(2)} !important`,
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
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        userSelect: 'none',
      },
      containedInherit: ({ theme }) => ({
        background: theme.palette.common.white,
        color: theme.palette.getContrastText(theme.palette.common.white),
      }),
    },
  },
  MuiDialog: {
    defaultProps: {
      TransitionComponent: Transition,
    },
    styleOverrides: {
      paper: {
        borderRadius: 16,
      },
      paperFullScreen: {
        borderRadius: 0,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1.5, 3),
      }),
    },
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
        borderBottom: `1px solid ${theme.palette.divider}`,
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
  MuiImageListItem: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
  MuiImageListItemBar: {
    styleOverrides: {
      positionTop: {
        borderRadius: '16px 16px 0 0',
      },
      positionBottom: {
        borderRadius: '0 0 16px 16px',
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
