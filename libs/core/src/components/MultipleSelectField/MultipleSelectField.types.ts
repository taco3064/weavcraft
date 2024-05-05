import type { JsonObject, Paths } from 'type-fest';

import type { BaseFieldWithoutInputProps } from '../BaseField';
import type { BaseSelectFieldProps } from '../../hooks';

export type MultipleSelectFieldProps<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
> = BaseSelectFieldProps<'multiple', D, Path> &
  Omit<
    BaseFieldWithoutInputProps<unknown>,
    'adornmentPosition' | 'value' | 'onChange'
  >;
