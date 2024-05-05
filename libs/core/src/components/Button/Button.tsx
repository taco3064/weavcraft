import MuiButton from '@mui/material/Button';

import Icon from '../Icon';
import { useUrlValidation } from '../../hooks';
import { withGenerateData } from '../../contexts';
import type { ButtonProps, MappablePropNames } from './Button.types';

export default withGenerateData<ButtonProps, MappablePropNames>(
  function Button({ href, icon, iconPosition = 'start', text, ...props }) {
    const isHrefValid = useUrlValidation(href);

    return (
      <MuiButton
        {...props}
        {...(isHrefValid && {
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
