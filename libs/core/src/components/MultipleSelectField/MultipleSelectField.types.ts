import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';
import type { BaseSlotProps, GenericData } from '../../types';

export type MultipleSelectFieldProps<
  D extends GenericData,
  I extends BaseSlotProps
> = BaseSelectFieldProps<'multiple', D, I> &
  Omit<
    BaseFieldWithoutInputProps<unknown>,
    'adornmentPosition' | 'value' | 'onChange'
  >;
