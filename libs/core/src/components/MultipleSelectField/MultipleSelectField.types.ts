import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';
import type { GenericData } from '../../contexts';

export type MultipleSelectFieldProps<D extends GenericData = {}> =
  BaseSelectFieldProps<'multiple', D> &
    Omit<
      BaseFieldWithoutInputProps<unknown>,
      'adornmentPosition' | 'value' | 'onChange'
    >;
