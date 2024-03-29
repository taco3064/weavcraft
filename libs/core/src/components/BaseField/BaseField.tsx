import MuiInputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';
import type { ElementType } from 'react';

import type { BaseFieldProps, MuiInputProps } from './BaseField.types';

export default function BaseField<V, C extends ElementType<any>>({
  InputProps,
  adornment,
  adornmentPosition = 'start',
  value,
  onChange,
  ...props
}: BaseFieldProps<V, C>) {
  return (
    <MuiTextField
      fullWidth
      {...props}
      defaultValue={value || ''}
      onChange={(e) => onChange?.(e.target.value as V, props.name)}
      InputProps={
        {
          ...InputProps,
          ...(adornment && {
            [`${adornmentPosition}Adornment`]: (
              <MuiInputAdornment position={adornmentPosition}>
                {adornment}
              </MuiInputAdornment>
            ),
          }),
        } as MuiInputProps
      }
    />
  );
}
