import MuiIconButton from '@mui/material/IconButton';

import Icon from '../Icon';
import { useUrlValidation } from '../../hooks';
import { withGenerateDataProps } from '../../contexts';
import type { IconButtonProps, MappablePropNames } from './IconButton.types';

export default withGenerateDataProps<IconButtonProps, MappablePropNames>(
  function IconButton({ href, icon, ...props }) {
    const isHrefValid = useUrlValidation(href);

    return (
      <MuiIconButton
        data-testid="IconButton"
        {...props}
        {...(isHrefValid && { component: 'a', href })}
      >
        {icon && <Icon fontSize="inherit" code={icon} />}
      </MuiIconButton>
    );
  }
);
