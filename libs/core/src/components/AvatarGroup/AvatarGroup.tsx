import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { JsonObject } from 'type-fest';

import Avatar from '../Avatar';
import { useStoreProps } from '../../hooks';
import type { AvatarGroupProps } from './AvatarGroup.types';

export default function AvatarGroup<D extends JsonObject>(
  props: AvatarGroupProps<D>
) {
  const { itemProps, records, ...avatarGroupProps } = useStoreProps(props);

  return (
    <MuiAvatarGroup {...avatarGroupProps}>
      {records?.map((item, i) => (
        <Avatar key={i} {...itemProps} data={item} />
      ))}
    </MuiAvatarGroup>
  );
}
