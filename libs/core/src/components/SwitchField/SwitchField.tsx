import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';
import { forwardRef } from 'react';

import BaseField from '../BaseField';
import type { SwitchFieldProps, SwitchInputProps } from './SwitchField.types';

const SwitchInput = forwardRef<HTMLInputElement, SwitchInputProps>(
  ({ color, size, ...props }, ref) => (
    <MuiFormControlLabel
      {...props}
      inputRef={ref}
      labelPlacement="start"
      style={{ display: 'flex' }}
      data-testid="SwitchInput"
      control={
        <MuiSwitch
          {...{ color, size }}
          data-testid="SwitchControl"
          sx={{ marginLeft: 'auto' }}
        />
      }
    />
  )
);

export default function SwitchField({
  label,
  placeholder,
  onChange,
  ...props
}: SwitchFieldProps) {
  return (
    <BaseField
      {...props}
      adornmentPosition="start"
      label={placeholder ? label : undefined}
      data-testid="SwitchField"
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: SwitchInput,
        inputProps: {
          label: placeholder || label || <>&nbsp;</>,
          color: props.color,
          size: props.size,
          onChange: (_e, checked) => onChange?.(checked, props.name),
        },
      }}
    />
  );
}
