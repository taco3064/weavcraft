import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { GenericData, PropsWithStore } from '../../contexts';

type MuiAvatarGroupProps = Pick<
  ComponentProps<typeof MuiAvatarGroup>,
  'spacing' | 'max' | 'total' | 'variant'
>;

export type AvatarGroupProps<D extends GenericData> = PropsWithStore<
  D,
  MuiAvatarGroupProps & {
    itemProps?: Omit<AvatarProps<D>, 'data'>;
  }
>;
