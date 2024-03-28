import Slide from '@mui/material/Slide';
import { ReactElement, forwardRef } from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';

//* Dialog Transition
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

Transition.displayName = 'Transition';

//* Default Component Styles
export const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflow: 'hidden auto',
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
      color: 'text.primary',
      fontWeight: 'bolder',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        height: theme.spacing(8),
        padding: theme.spacing(1.5, 3),
      }),
    },
  },
  MuiFilledInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
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
      root: {
        '&:disabled': {
          pointerEvents: 'none !important',
          textDecoration: 'none !important',
        },
      },
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
      fullWidth: true,
      margin: 'none',
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
