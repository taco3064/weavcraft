import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

import type { AvatarProps } from '../Avatar';
import type { GenericData } from '../../types';

type MuiAvatarGroupProps = Pick<
  ComponentProps<typeof MuiAvatarGroup>,
  'spacing' | 'max' | 'total' | 'variant'
>;

export interface AvatarGroupProps<D extends GenericData>
  extends MuiAvatarGroupProps {
  itemProps?: Omit<AvatarProps<D>, 'data'>;
  items?: D[];
}
