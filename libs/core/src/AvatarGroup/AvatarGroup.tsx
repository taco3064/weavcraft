import MuiAvatarGroup from '@mui/material/AvatarGroup';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { useMemo } from 'react';

import Avatar, { type AvatarProps } from '../Avatar';
import type { AvatarGroupProps } from './AvatarGroup.types';
import type { Data } from '../types';

export default function AvatarGroup<T extends Data>({
  avatarProps,
  data,
  dataProps = {},
  ...props
}: AvatarGroupProps<T>) {
  const stringify = JSON.stringify(dataProps);

  const items = useMemo<AvatarProps[]>(() => {
    const keys = Object.entries(JSON.parse(stringify));

    return (
      data?.map((item) =>
        keys.reduce<AvatarProps>(
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
      {items.map((itemProps, index) => (
        <Avatar key={index} {...avatarProps} {...itemProps} />
      ))}
    </MuiAvatarGroup>
  );
}
