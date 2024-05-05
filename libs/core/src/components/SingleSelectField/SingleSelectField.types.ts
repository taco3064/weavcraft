import type { JsonObject, Paths } from 'type-fest';

import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';

export interface SingleSelectFieldProps<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
> extends BaseSelectFieldProps<'single', D, Path>,
    Omit<
      BaseFieldWithoutInputProps<unknown>,
      'adornmentPosition' | 'value' | 'onChange'
    > {
  emptyText?: string;
}
