import type { Get, JsonObject, Merge, Paths } from 'type-fest';

import type {
  MappableProps,
  PropsWithStore,
  SlotElement,
} from '../../contexts';

export type SelectionVariant = 'single' | 'multiple';

type SelectionValue<
  V extends SelectionVariant,
  D,
  Path extends string
> = V extends 'multiple' ? Get<D, Path>[] : Get<D, Path>;

//* - Prop Types
export interface BaseListItemProps {
  primary?: string;
  secondary?: string;
  disabled?: boolean;
}

export type OptionProps<D extends JsonObject, P, Path extends string> = Merge<
  {
    value?: SelectionValue<'single', D, Path>;
  },
  Omit<P, 'value'>
>;

export interface SelectionGroupProps<
  V extends SelectionVariant,
  D extends JsonObject,
  Path extends Extract<Paths<D>, string> = Extract<Paths<D>, string>,
  P = {}
> extends PropsWithStore<D> {
  name?: string;
  value?: SelectionValue<V, D, Path>;
  onChange?: (value?: SelectionValue<V, D, Path>, name?: string) => void;

  optionProps?: P & Omit<MappableProps<D, OptionProps<D, P, Path>>, 'data'>;
}

export interface BaseSelectFieldProps<
  V extends SelectionVariant,
  D extends JsonObject,
  Path extends Extract<Paths<D>, string>
> extends SelectionGroupProps<V, D, Path, BaseListItemProps> {
  optionIndicator?: SlotElement;
}
