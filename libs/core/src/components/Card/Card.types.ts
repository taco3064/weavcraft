import MuiContainer from '@mui/material/Container';
import type { ComponentProps, FormEvent, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import type { PropsWithMappedData } from '../../contexts';

type MuiContainerProps = Pick<ComponentProps<typeof MuiContainer>, 'maxWidth'>;

/**
 * ? Card Component Props Notes
 * * - `component` and `onSubmit` are used in the `Form` component
 */
export interface CardProps extends MuiContainerProps {
  //* Header
  avatar?: ReactElement;
  description?: string;
  headerAction?: ReactElement;
  title?: string;

  //* Footer
  footerAction?: ReactNode;
  footerJustify?: Property.JustifyContent;

  //* Media
  mediaSrc?: string;
  mediaType?: 'audio' | 'img' | 'video';
  mediaHeight?: Property.Height;
  mediaWidth?: Property.Width;
  mediaPosition?: 'top' | 'bottom' | 'left' | 'right';

  component?: 'form';
  children?: ReactNode; //* Content

  //* This prop is only used in <Form />
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export type MappablePropNames = keyof Pick<
  CardProps,
  'children' | 'description' | 'title'
>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<CardProps, 'component' | 'onSubmit'>,
  MappablePropNames
>;
