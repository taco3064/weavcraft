import MuiAvatarGroup from '@mui/material/AvatarGroup';

import Avatar from '../Avatar';
import { makeStoreProps, type GenericData } from '../../contexts';
import type { AvatarGroupProps } from './AvatarGroup.types';

const withStoreProps = makeStoreProps<AvatarGroupProps>();

export default withStoreProps(function AvatarGroup<D extends GenericData>({
  itemProps,
  records,
  ...props
}: AvatarGroupProps<D>) {
  return (
    <MuiAvatarGroup {...props} data-testid="AvatarGroup">
      {records?.map((item, i) => (
        <Avatar key={i} {...itemProps} data={item} />
      ))}
    </MuiAvatarGroup>
  );
});
