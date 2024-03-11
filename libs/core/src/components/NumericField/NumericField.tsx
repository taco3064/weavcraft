import { NumericFormat } from 'react-number-format';
import { forwardRef } from 'react';

import BaseField from '../BaseField';

import type {
  NumericFieldProps,
  NumericInputProps,
} from './NumericField.types';

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (props, ref) => (
    <NumericFormat {...props} getInputRef={ref} data-testid="NumericInput" />
  )
);

export default function NumericField({
  allowNegative = false,
  decimalScale = 0,
  fixedDecimalScale = false,
  max,
  min,
  value,
  onChange,
  ...props
}: NumericFieldProps) {
  const getNumeric = (value?: number) => {
    const isValidNumber = (target?: number) =>
      typeof target === 'number' &&
      !Number.isNaN(target) &&
      Number.isFinite(target);

    return [
      { limit: max, fn: Math.min },
      { limit: min, fn: Math.max },
    ].reduce(
      (acc, { limit, fn }) =>
        acc == null || limit == null || !isValidNumber(limit)
          ? acc
          : fn(acc, limit),
      isValidNumber(value) ? value : undefined
    );
  };

  return (
    <BaseField
      {...props}
      data-testid="NumericField"
      value={getNumeric(value)}
      InputProps={{
        inputComponent: NumericInput,
        inputProps: {
          allowNegative,
          decimalScale,
          fixedDecimalScale,
          onValueChange: ({ floatValue }) =>
            onChange?.(getNumeric(floatValue), props.name),
        },
      }}
    />
  );
}
