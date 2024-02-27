import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { Data } from '../types';

type OverrideChildPropNames = 'alt' | 'src' | 'srcSet' | 'text';

export interface AvatarGroupProps<T extends Data>
  extends Pick<
    ComponentProps<typeof MuiAvatarGroup>,
    'spacing' | 'max' | 'total' | 'variant'
  > {
  avatarProps?: Omit<AvatarProps, OverrideChildPropNames>;
  data?: T[];
  dataProps?: Partial<Record<OverrideChildPropNames, string>>;
}
