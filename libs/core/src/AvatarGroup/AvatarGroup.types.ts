import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { Data, OverridePropNames } from '../types';

type OverrideChildPropNames = OverridePropNames<
  AvatarProps,
  'alt' | 'src' | 'srcSet' | 'text'
>;

export interface AvatarGroupProps<T extends Data>
  extends Pick<
    ComponentProps<typeof MuiAvatarGroup>,
    'spacing' | 'max' | 'total' | 'variant'
  > {
  avatarProps?: Omit<AvatarProps, OverrideChildPropNames>;
  data?: T[];
  propMapping?: Partial<Record<OverrideChildPropNames, string>>;
}
