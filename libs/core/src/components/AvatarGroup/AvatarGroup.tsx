import MuiAvatarGroup from '@mui/material/AvatarGroup';

import Avatar from '../Avatar';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import type { AvatarGroupProps } from './AvatarGroup.types';

export default function AvatarGroup<D extends GenericData>(
  props: AvatarGroupProps<D>
) {
  const { itemProps, records, ...groupProps } = useGenerateStoreProps(props);

  return (
    <MuiAvatarGroup {...groupProps} data-testid="AvatarGroup">
      {records?.map((item, i) => (
        <Avatar key={i} {...itemProps} data={item} />
      ))}
    </MuiAvatarGroup>
  );
}
