import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';

import { withGenerateDataProps, useComponentData } from '../../contexts';

import type {
  MappablePropNames,
  SelectionProps,
  SelectionVariant,
} from './Selection.types';

export default withGenerateDataProps<
  SelectionProps<SelectionVariant>,
  MappablePropNames
>(function Selection({
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
  const data = useComponentData();

  const control = (
    <Control
      {...props}
      {...{ disabled, required }}
      defaultChecked={checked}
      data-testid="Selection"
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
