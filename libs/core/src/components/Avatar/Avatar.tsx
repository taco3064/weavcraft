import MuiAvatar from '@mui/material/Avatar';

import { usePropsTransformation, useUrlValidation } from '../../hooks';
import type { AvatarProps } from './Avatar.types';
import type { GenericData } from '../../types';

export default function Avatar<D extends GenericData>(props: AvatarProps<D>) {
  const { height, text, width, ...avatarProps } = usePropsTransformation(props);
  const isUrlValid = useUrlValidation(avatarProps.src);

  return (
    <MuiAvatar {...avatarProps} sx={{ width, height }} data-testid="Avatar">
      {isUrlValid ? null : text?.charAt(0)}
    </MuiAvatar>
  );
}
