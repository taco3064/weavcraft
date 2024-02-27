import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

export interface AvatarProps
  extends Pick<
    ComponentProps<typeof MuiAvatar>,
    'variant' | 'alt' | 'src' | 'srcSet' | 'children'
  > {
  text?: string;
  width?: string;
  height?: string;
}
