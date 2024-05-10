import MuiIconButton from '@mui/material/IconButton';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { IconButtonProps } from './IconButton.types';

export default function IconButton<D extends JsonObject>(
  props: IconButtonProps<D>
) {
  const [GeneratePropsProvider, { href, icon, ...iconButtonProps }] =
    useGenerateProps<D, IconButtonProps<D>>(props);

  const isHrefValid = useUrlValidation(href);

  return (
    <GeneratePropsProvider>
      <MuiIconButton
        data-testid="IconButton"
        {...iconButtonProps}
        {...(isHrefValid && { component: 'a', href })}
      >
        {icon && <Icon fontSize="inherit" code={icon} />}
      </MuiIconButton>
    </GeneratePropsProvider>
  );
}
