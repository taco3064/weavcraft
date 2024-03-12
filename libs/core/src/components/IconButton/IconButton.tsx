import MuiIconButton from '@mui/material/IconButton';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { IconButtonProps, MappablePropNames } from './IconButton.types';

export default withGenerateDataProps<IconButtonProps, MappablePropNames>(
  function IconButton({ href, icon, ...props }) {
    return (
      <MuiIconButton
        {...props}
        {...(href && {
          component: 'a',
          href,
        })}
        data-testid="IconButton"
      >
        {icon && <Icon fontSize="inherit" code={icon} />}
      </MuiIconButton>
    );
  }
);
