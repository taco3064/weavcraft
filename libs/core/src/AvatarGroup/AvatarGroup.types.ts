import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { Data, OverridableNames, PropMapping } from '../types';

type OverrideChildPropNames = OverridableNames<
  AvatarProps,
  'alt' | 'src' | 'srcSet' | 'text'
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
