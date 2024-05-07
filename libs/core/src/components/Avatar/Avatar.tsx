import MuiAvatar from '@mui/material/Avatar';
import type { JsonObject } from 'type-fest';

import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { AvatarProps } from './Avatar.types';

export default function Avatar<D extends JsonObject>(props: AvatarProps<D>) {
  const [GenerateDataProvider, { height, text, width, ...avatarProps }] =
    useGenerateProps<D, AvatarProps<D>>(props);

  const isUrlValid = useUrlValidation(avatarProps.src);

  return (
    <GenerateDataProvider>
      <MuiAvatar {...avatarProps} sx={{ width, height }} data-testid="Avatar">
        {isUrlValid ? null : text?.charAt(0)}
      </MuiAvatar>
    </GenerateDataProvider>
  );
}
