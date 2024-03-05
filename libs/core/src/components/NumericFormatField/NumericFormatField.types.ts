import { PatternFormat } from 'react-number-format';
import type { ComponentProps, ElementType } from 'react';

import type { BaseFieldProps } from '../BaseField';

type BasePropNames = 'allowEmptyFormatting' | 'format' | 'patternChar';

export type NumericFormatInputProps = Pick<
  ComponentProps<typeof PatternFormat>,
  BasePropNames | 'onValueChange'
>;

export type NumericFormatFieldProps = Partial<
  Pick<NumericFormatInputProps, BasePropNames>
> &
  BaseFieldProps<number, ElementType<NumericFormatInputProps>>;
