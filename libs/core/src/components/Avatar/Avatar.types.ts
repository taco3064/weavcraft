import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiAvatarProps = Pick<
  ComponentProps<typeof MuiAvatar>,
  'variant' | 'alt' | 'src' | 'srcSet'
>;

export type AvatarProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiAvatarProps & {
    text?: string;
    width?: string;
    height?: string;
  },
  keyof MuiAvatarProps | 'text'
>;
