import { makeStyles } from 'tss-react/mui';

import type { MaterialDesignContentProps } from './Notistack.types';

export const useContentStyles = makeStyles<
  Pick<MaterialDesignContentProps, 'variant'>
>({ name: 'MaterialDesignContent' })((theme, { variant }) => {
  const background =
    variant === 'default'
      ? theme.palette.background.paper
      : theme.palette[variant][theme.palette.mode];

  const color =
    variant === 'default'
      ? theme.palette.text.primary
      : theme.palette[variant].contrastText;

  return {
    root: {
      color,
      background,
      borderRadius: theme.spacing(2),
      fontSize: theme.typography.subtitle1.fontSize,
      whiteSpace: 'pre-line',
    },
  };
});

export const useProviderStyles = makeStyles({ name: 'SnackbarProvider' })(
  (theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  })
);
