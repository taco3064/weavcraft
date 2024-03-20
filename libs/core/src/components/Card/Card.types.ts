import MuiContainer from '@mui/material/Container';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { Property } from 'csstype';

import type { GenericData, PropsWithMappedData } from '../../contexts';

type MuiContainerProps = Pick<ComponentProps<typeof MuiContainer>, 'maxWidth'>;

export interface CardProps extends MuiContainerProps {
  //* Header
  avatar?: ReactElement;
  description?: string;
  headerAction?: ReactElement;
  title?: string;

  //* Media
  mediaSrc?: string;
  mediaType?: 'audio' | 'img' | 'video';
  mediaHeight?: Property.Height;
  mediaWidth?: Property.Width;
  mediaPosition?: 'top' | 'bottom' | 'left' | 'right';

  children?: ReactNode; //* Content
  footerAction?: ReactNode; //* Footer
}

export type MappablePropNames = keyof Pick<
  CardProps,
  'children' | 'description' | 'title'
>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  CardProps,
  MappablePropNames
>;
