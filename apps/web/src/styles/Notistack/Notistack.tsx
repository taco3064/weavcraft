import * as Notistack from 'notistack';
import cx from 'clsx';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import { Display } from '@weavcraft/core';
import type * as Types from './Notistack.types';

const origin: Notistack.SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const MuiSnackbarContent = withStyles(
  forwardRef<never, Types.MuiSnackbarContentProps>(function MuiSnackbarContent(
    { classes, className, ...props },
    ref
  ) {
    return (
      <Notistack.MaterialDesignContent
        {...props}
        ref={ref}
        className={cx(classes?.root, className)}
      />
    );
  }),
  (theme, { variant }) => {
    const background =
      variant === 'default'
        ? theme.palette.background.paper
        : theme.palette[variant].dark;

    return {
      root: {
        background,
        borderRadius: theme.spacing(2),
        fontSize: theme.typography.subtitle1.fontSize,
        whiteSpace: 'pre-line',
        color:
          variant === 'default'
            ? theme.palette.text.primary
            : theme.palette[variant].contrastText,
      },
    };
  },
  { name: 'MuiSnackbarContent' }
);

export const MuiSnackbarProvider = withStyles(
  forwardRef<never, Types.MuiSnackbarProviderProps>(
    function MuiSnackbarProvider(
      { classes: { icon: iconClassName, ...classes } = {}, ...props },
      ref
    ) {
      return (
        <Notistack.SnackbarProvider
          {...props}
          ref={ref}
          anchorOrigin={origin}
          classes={classes}
          iconVariant={{
            info: (
              <Display.Icon code="faCircleInfo" className={iconClassName} />
            ),
            success: (
              <Display.Icon code="faCircleCheck" className={iconClassName} />
            ),
            warning: (
              <Display.Icon
                code="faTriangleExclamation"
                className={iconClassName}
              />
            ),
            error: (
              <Display.Icon
                code="faCircleExclamation"
                className={iconClassName}
              />
            ),
          }}
          Components={{
            default: MuiSnackbarContent,
            info: MuiSnackbarContent,
            success: MuiSnackbarContent,
            warning: MuiSnackbarContent,
            error: MuiSnackbarContent,
          }}
        />
      );
    }
  ),
  (theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  }),
  { name: 'MuiSnackbarProvider' }
);
