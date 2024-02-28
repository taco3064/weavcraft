import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { Data, OverridableNames, PropMapping } from '../types';

export type OverridablePropNames = 'alt' | 'src' | 'srcSet' | 'text';

type OverrideChildPropNames = OverridableNames<
  AvatarProps,
  OverridablePropNames
>;

export interface AvatarGroupProps<T extends Data>
  extends PropMapping<OverrideChildPropNames>,
    Pick<
      ComponentProps<typeof MuiAvatarGroup>,
      'spacing' | 'max' | 'total' | 'variant'
    > {
  avatarProps?: Omit<AvatarProps, OverrideChildPropNames>;
  data?: T[];
}
