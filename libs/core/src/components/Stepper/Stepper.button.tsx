import MuiButton from '@mui/material/Button';

import Icon from '../Icon';
import IconButton from '../IconButton';
import type { ButtonParams } from './Stepper.types';

export default function StepperButton({
  icon,
  text,
  type,
  ...props
}: ButtonParams) {
  const color = type === 'submit' ? 'primary' : 'inherit';

  return !text ? (
    <IconButton {...props} {...{ color, icon, type }} />
  ) : (
    <MuiButton
      variant="contained"
      {...props}
      {...{
        color,
        [icon === 'faAngleLeft' ? 'startIcon' : 'endIcon']: (
          <Icon code={icon} />
        ),
      }}
    >
      {text}
    </MuiButton>
  );
}
