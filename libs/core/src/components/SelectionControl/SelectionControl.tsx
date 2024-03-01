import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';

import { usePropsTransformation } from '../../hooks';
import type { SelectionControlProps, Variant } from './SelectionControl.types';
import type { GenericData } from '../../types';

export default function SelectionControl<
  D extends GenericData,
  V extends Variant = 'checkbox'
>({ variant, ...props }: SelectionControlProps<V, D>) {
  const Control = variant === 'radio' ? MuiRadio : MuiCheckbox;

  const {
    label,
    labelPlacement,
    checked,
    disabled,
    required,
    onChange,
    ...checkboxProps
  } = usePropsTransformation(props);

  const control = (
    <Control
      {...checkboxProps}
      {...{ disabled, required }}
      defaultChecked={checked}
      data-testid="SelectionControl"
      onChange={(_e, checked) => onChange?.(checked, props.data)}
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
}
