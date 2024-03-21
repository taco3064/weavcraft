import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';

import {
  withGenerateDataProps,
  useComponentData,
  type GenericData,
} from '../../contexts';

import type {
  MappablePropNames,
  SelectionProps,
  SelectionVariant,
} from './Selection.types';

export default withGenerateDataProps<
  SelectionProps<SelectionVariant, any>,
  MappablePropNames
>(function Selection<D extends GenericData>({
  label,
  labelPlacement,
  checked,
  disabled,
  required,
  variant = 'checkbox',
  onChange,
  ...props
}: SelectionProps<SelectionVariant, D>) {
  const Control = variant === 'radio' ? MuiRadio : MuiCheckbox;
  const data = useComponentData<D>();

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
