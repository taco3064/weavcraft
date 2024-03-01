import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

import { usePropsTransformation } from '../../hooks';
import type { CheckboxProps } from './Checkbox.types';
import type { GenericData } from '../../types';

export default function Checkbox<D extends GenericData>(
  props: CheckboxProps<D>
) {
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
    <MuiCheckbox
      {...checkboxProps}
      {...{ disabled, required }}
      defaultChecked={checked}
      data-testid="Checkbox"
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
