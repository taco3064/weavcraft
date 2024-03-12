import MuiButton from '@mui/material/Button';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { ButtonProps, MappablePropNames } from './Button.types';

export default withGenerateDataProps<ButtonProps, MappablePropNames>(
  function Button({ icon, iconPosition = 'start', text, ...props }) {
    return (
      <MuiButton
        {...props}
        {...(icon && {
          [`${iconPosition}Icon`]: <Icon code={icon} />,
        })}
        data-testid="Button"
      >
        {text}
      </MuiButton>
    );
  }
);
