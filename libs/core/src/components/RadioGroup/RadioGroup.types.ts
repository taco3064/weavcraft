import type { JsonObject, Paths } from 'type-fest';

import type { SelectionGroupProps } from '../../hooks';
import type { SelectionProps } from '../Selection';

export type BaseRadioProps<D extends JsonObject> = Omit<
  SelectionProps<D, 'radio'>,
  'checked'
>;

export interface RadioGroupProps<
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
> extends SelectionGroupProps<'single', D, Path, BaseRadioProps<D>> {
  title?: string;
}
