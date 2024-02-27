import MuiAvatarGroup from '@mui/material/AvatarGroup';
import _get from 'lodash/get';
import { useMemo } from 'react';

import Avatar, { type AvatarProps } from '../Avatar';
import type { AvatarGroupProps } from './AvatarGroup.types';
import type { Data } from '../types';

export default function AvatarGroup<T extends Data>({
  avatarProps,
  data,
  propMapping = {},
  ...props
}: AvatarGroupProps<T>) {
  const stringify = JSON.stringify(propMapping);

  const items = useMemo(() => {
    const entries = Object.entries(JSON.parse(stringify));

    return (
      data?.map((item) =>
        entries.reduce<AvatarProps>(
          (result, [key, path]) => ({
            ...result,
            [key]: _get(item, path as string),
          }),
          {}
        )
      ) || []
    );
  }, [data, stringify]);

  return (
    <MuiAvatarGroup {...props}>
      {items.map((itemProps, i) => (
        <Avatar key={i} {...avatarProps} {...itemProps} />
      ))}
    </MuiAvatarGroup>
  );
}
