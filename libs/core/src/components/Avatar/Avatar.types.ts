import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

type MuiAvatarProps = Pick<
  ComponentProps<typeof MuiAvatar>,
  'variant' | 'alt' | 'src' | 'srcSet'
>;

export interface AvatarProps extends MuiAvatarProps {
  text?: string;
  width?: string;
  height?: string;
}

export type MappablePropNames = keyof Omit<AvatarProps, 'width' | 'height'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  AvatarProps,
  MappablePropNames
>;
