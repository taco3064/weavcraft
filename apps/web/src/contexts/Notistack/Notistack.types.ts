import * as Notistack from 'notistack';
import { ComponentProps } from 'react';

export type MaterialDesignContentProps = ComponentProps<
  typeof Notistack.MaterialDesignContent
>;

export type NotistackProviderProps = Omit<
  Notistack.SnackbarProviderProps,
  'anchorOrigin' | 'classes' | 'iconVariant' | 'Components'
>;
