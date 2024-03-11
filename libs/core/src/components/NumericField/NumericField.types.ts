import { NumericFormat } from 'react-number-format';
import type { ComponentProps, ElementType } from 'react';

import type { BaseFieldProps } from '../BaseField';

type BasePropNames = 'allowNegative' | 'decimalScale' | 'fixedDecimalScale';

export type NumericInputProps = Pick<
  ComponentProps<typeof NumericFormat>,
  BasePropNames | 'onValueChange'
>;

export interface NumericFieldProps
  extends Pick<NumericInputProps, BasePropNames>,
    BaseFieldProps<number, ElementType<NumericInputProps>> {
  max?: number;
  min?: number;
}
