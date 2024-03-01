import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../types';

type MuiAvatarProps = Pick<
  ComponentProps<typeof MuiAvatar>,
  'variant' | 'alt' | 'src' | 'srcSet'
>;

interface BaseAvatarProps extends MuiAvatarProps {
  text?: string;
  width?: string;
  height?: string;
}

export type AvatarProps<D extends GenericData> = MappableProps<
  D,
  BaseAvatarProps
>;
