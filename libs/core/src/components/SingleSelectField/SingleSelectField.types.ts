import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';
import type { BaseSlotProps, GenericData } from '../../types';

export interface SingleSelectFieldProps<
  D extends GenericData,
  I extends BaseSlotProps
> extends BaseSelectFieldProps<'single', D, I>,
    Omit<BaseFieldWithoutInputProps<unknown>, 'value' | 'onChange'> {
  emptyText?: string;
}
