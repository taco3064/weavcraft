import { PatternFormat } from 'react-number-format';
import { forwardRef } from 'react';

import BaseField from '../BaseField';

import type {
  NumericFormatFieldProps,
  NumericFormatInputProps,
} from './NumericFormatField.types';

const NumericFormatInput = forwardRef<
  HTMLInputElement,
  NumericFormatInputProps
>((props, ref) => (
  <PatternFormat
    {...props}
    getInputRef={ref}
    data-testid="NumericFormatInput"
  />
));

export default function NumericFormatField({
  allowEmptyFormatting,
  format = '####',
  patternChar,
  onChange,
  ...props
}: NumericFormatFieldProps) {
  return (
    <BaseField
      {...props}
      data-testid="NumericFormatField"
      InputProps={{
        inputComponent: NumericFormatInput,
        inputProps: {
          allowEmptyFormatting,
          format,
          patternChar,
          onValueChange: ({ floatValue }) => onChange?.(floatValue, props.name),
        },
      }}
    />
  );
}
