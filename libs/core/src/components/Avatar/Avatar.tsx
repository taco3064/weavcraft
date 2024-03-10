import MuiAvatar from '@mui/material/Avatar';

import { useUrlValidation } from '../../hooks';
import { withGenerateDataProps } from '../../contexts';
import type { AvatarProps } from './Avatar.types';

export default withGenerateDataProps<AvatarProps>(function Avatar({
  height,
  text,
  width,
  ...props
}) {
  const isUrlValid = useUrlValidation(props.src);

  return (
    <MuiAvatar {...props} sx={{ width, height }} data-testid="Avatar">
      {isUrlValid ? null : text?.charAt(0)}
    </MuiAvatar>
  );
});
