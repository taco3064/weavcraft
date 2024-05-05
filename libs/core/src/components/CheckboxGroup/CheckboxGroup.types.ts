import type { JsonObject, Paths } from 'type-fest';

import type { SelectionGroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

export type BaseCheckboxProps<D extends JsonObject> = Omit<
  SelectionProps<D, 'checkbox'>,
  'checked'
>;

export interface CheckboxGroupProps<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
> extends SelectionGroupProps<'multiple', D, Path, BaseCheckboxProps<D>> {
  title?: string;
}
