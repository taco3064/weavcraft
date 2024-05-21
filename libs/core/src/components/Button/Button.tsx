import MuiButton from '@mui/material/Button';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { ButtonProps } from './Button.types';

export default function Button<D extends JsonObject>(props: ButtonProps<D>) {
  const [
    GenerateDataProvider,
    { href, icon, iconPosition = 'start', text = 'Button', ...buttonProps },
  ] = useGenerateProps<D, ButtonProps<D>>(props);

  const isHrefValid = useUrlValidation(href);

  return (
    <GenerateDataProvider>
      <MuiButton
        {...buttonProps}
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
    </GenerateDataProvider>
  );
}
