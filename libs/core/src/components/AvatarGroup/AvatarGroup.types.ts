import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { AvatarProps } from '../Avatar';
import type { PropsWithMappedStore } from '../../contexts';

type MuiAvatarGroupProps = Pick<
  ComponentProps<typeof MuiAvatarGroup>,
  'spacing' | 'max' | 'total' | 'variant'
>;

export type AvatarGroupProps<D extends JsonObject> = PropsWithMappedStore<
  D,
  MuiAvatarGroupProps & {
    itemProps?: Omit<AvatarProps<D>, 'data'>;
  }
>;
