import MuiButton from '@mui/material/Button';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { ButtonProps, MappablePropNames } from './Button.types';

export default withGenerateDataProps<ButtonProps, MappablePropNames>(
  function Button({ href, icon, iconPosition = 'start', text, ...props }) {
    return (
      <MuiButton
        {...props}
        {...(href && {
          LinkComponent: 'a',
          href,
        })}
        {...(icon && {
          [`${iconPosition}Icon`]: <Icon fontSize="inherit" code={icon} />,
        })}
        data-testid="Button"
      >
        {text}
      </MuiButton>
    );
  }
);