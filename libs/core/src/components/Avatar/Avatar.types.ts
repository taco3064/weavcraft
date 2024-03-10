import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

import type { GenerateDataWrapperProps, GenericData } from '../../contexts';

type MuiAvatarProps = Pick<
  ComponentProps<typeof MuiAvatar>,
  'variant' | 'alt' | 'src' | 'srcSet'
>;

export interface AvatarProps extends MuiAvatarProps {
  text?: string;
  width?: string;
  height?: string;
}

export type WrapperProps<D extends GenericData> = GenerateDataWrapperProps<
  D,
  AvatarProps
>;
