import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';

import { withGenerateDataProps, useGenerateData } from '../../contexts';

import type {
  MappablePropNames,
  SelectionControlProps,
  Variant,
} from './SelectionControl.types';

export default withGenerateDataProps<
  SelectionControlProps<Variant>,
  MappablePropNames
>(function SelectionControl({
  label,
  labelPlacement,
  checked,
  disabled,
  required,
  variant = 'checkbox',
  onChange,
  ...props
}) {
  const Control = variant === 'radio' ? MuiRadio : MuiCheckbox;
  const data = useGenerateData();

  const control = (
    <Control
      {...props}
      {...{ disabled, required }}
      defaultChecked={checked}
      data-testid="SelectionControl"
      onChange={(_e, checked) => onChange?.(checked, data)}
    />
  );

  return !label ? (
    control
  ) : (
    <MuiFormControlLabel
      {...{ label, labelPlacement, disabled, required, control }}
      data-testid="FormControlLabel"
    />
  );
});
