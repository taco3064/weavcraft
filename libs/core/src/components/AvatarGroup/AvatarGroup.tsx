import MuiAvatarGroup from '@mui/material/AvatarGroup';
import type { JsonObject } from 'type-fest';

import Avatar from '../Avatar';
import { withDataStructure } from '../../contexts';
import type { AvatarGroupProps } from './AvatarGroup.types';

export default withDataStructure(function AvatarGroup<D extends JsonObject>({
  itemProps,
  records,
  ...props
}: AvatarGroupProps<D>) {
  return (
    <MuiAvatarGroup {...props}>
      {records?.map((item, i) => (
        <Avatar key={i} {...itemProps} data={item} />
      ))}
    </MuiAvatarGroup>
  );
});
