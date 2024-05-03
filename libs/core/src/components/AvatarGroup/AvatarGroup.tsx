import MuiAvatarGroup from '@mui/material/AvatarGroup';

import Avatar from '../Avatar';
import { withStoreProps, type GenericData } from '../../contexts';
import type { AvatarGroupProps } from './AvatarGroup.types';

export default (<D extends GenericData>() =>
  withStoreProps<D, AvatarGroupProps<D>>(function AvatarGroup({
    itemProps,
    records,
    ...props
  }) {
    return (
      <MuiAvatarGroup {...props} data-testid="AvatarGroup">
        {records?.map((item, i) => (
          <Avatar key={i} {...itemProps} data={item} />
        ))}
      </MuiAvatarGroup>
    );
  }))();
