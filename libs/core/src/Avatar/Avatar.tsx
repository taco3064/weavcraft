import MuiAvatar from '@mui/material/Avatar';
import { useMemo } from 'react';

import type { AvatarProps } from './Avatar.types';

export default function Avatar({ text, width, height, ...props }: AvatarProps) {
  const isValidUrl = useMemo(() => {
    try {
      return Boolean(new URL(props.src || ''));
    } catch (e) {
      return false;
    }
  }, [props.src]);

  return (
    <MuiAvatar {...props} sx={{ width, height }} data-testid="avatar">
      {isValidUrl ? null : text?.charAt(0)}
    </MuiAvatar>
  );
}
