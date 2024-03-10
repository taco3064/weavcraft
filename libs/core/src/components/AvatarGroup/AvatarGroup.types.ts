import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';

import type {
  GenerateStoreWrapperProps,
  GenericData,
  StoreProps,
} from '../../contexts';

type MuiAvatarGroupProps = Pick<
  ComponentProps<typeof MuiAvatarGroup>,
  'spacing' | 'max' | 'total' | 'variant'
>;

export type AvatarGroupProps<D extends GenericData> = GenerateStoreWrapperProps<
  D,
  MuiAvatarGroupProps &
    StoreProps<D> & {
      itemProps?: Omit<AvatarProps<D>, 'data'>;
    }
>;
