import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import { useMemo } from 'react';
import type { JsonObject } from 'type-fest';

import { withGenerateData, useGenerateData } from '../../contexts';

import type {
  MappablePropNames,
  SelectionProps,
  SelectionVariant,
  WrappedProps,
} from './Selection.types';

function BaseSelection<D extends JsonObject>({
  label,
  labelPlacement,
  checked,
  disabled,
  required,
  variant = 'checkbox',
  onChange,
  ...props
}: SelectionProps<D>) {
  const Control = variant === 'radio' ? MuiRadio : MuiCheckbox;
  const { data } = useGenerateData<D>();

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
}

export default function Selection<
  D extends JsonObject,
  V extends SelectionVariant
>(props: WrappedProps<D, V>) {
  const WrappedSelection = useMemo(
    () =>
      withGenerateData<SelectionProps<D, V>, MappablePropNames>(BaseSelection),
    []
  );

  return <WrappedSelection {...props} />;
}
