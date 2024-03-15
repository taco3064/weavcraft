import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';
import type { GenericData } from '../../contexts';

export interface SingleSelectFieldProps<D extends GenericData = {}>
  extends BaseSelectFieldProps<'single', D>,
    Omit<
      BaseFieldWithoutInputProps<unknown>,
      'adornmentPosition' | 'value' | 'onChange'
    > {
  emptyText?: string;
}
