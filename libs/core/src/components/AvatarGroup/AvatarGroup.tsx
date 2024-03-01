import MuiAvatarGroup from '@mui/material/AvatarGroup';

import Avatar from '../Avatar';
import type { AvatarGroupProps } from './AvatarGroup.types';
import type { GenericData } from '../../types';

export default function AvatarGroup<D extends GenericData>({
  itemProps,
  items,
  ...props
}: AvatarGroupProps<D>) {
  return (
    <MuiAvatarGroup {...props} data-testid="AvatarGroup">
      {items?.map((item, i) => (
        <Avatar key={i} {...itemProps} data={item} />
      ))}
    </MuiAvatarGroup>
  );
}
