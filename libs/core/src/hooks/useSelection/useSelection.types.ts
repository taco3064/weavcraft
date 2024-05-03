import type {
  GenericData,
  MappableProps,
  PropertyPath,
  PropsWithStore,
  SlotElement,
} from '../../contexts';

type PropertyType<
  T,
  P extends PropertyPath<T> = PropertyPath<T>
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PropertyType<T[K], Extract<Rest, PropertyPath<T[K]>>>
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type SelectionVariant = 'single' | 'multiple';

type SelectionValue<
  V extends SelectionVariant,
  D,
  ValuePath extends PropertyPath<D> = PropertyPath<D>
> = V extends 'multiple'
  ? PropertyType<D, ValuePath>[]
  : PropertyType<D, ValuePath>;

//* - Prop Types
export interface BaseListItemProps {
  primary?: string;
  secondary?: string;
  disabled?: boolean;
}

export interface SelectionGroupProps<
  V extends SelectionVariant,
  D extends GenericData,
  OptionProps extends object = {},
  ValuePath extends PropertyPath<D> = PropertyPath<D>
> extends PropsWithStore<D> {
  name?: string;
  value?: SelectionValue<V, D, ValuePath>;
  onChange?: (value?: SelectionValue<V, D, ValuePath>, name?: string) => void;

  optionProps?: OptionProps & {
    value?: SelectionValue<'single', D, ValuePath>;
    propMapping?: NonNullable<MappableProps<D, OptionProps>['propMapping']> & {
      value?: ValuePath;
    };
  };
}

export interface BaseSelectFieldProps<
  V extends SelectionVariant,
  D extends GenericData
> extends SelectionGroupProps<V, D, BaseListItemProps> {
  optionIndicator?: SlotElement;
}
