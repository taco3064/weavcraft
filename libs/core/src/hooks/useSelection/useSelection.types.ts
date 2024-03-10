import type {
  GenericData,
  MappableProps,
  PropertyPath,
  SlotElement,
  StoreProps,
} from '../../contexts';

type PropertyType<
  D extends {},
  P extends PropertyPath<D> = PropertyPath<D>
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof D
    ? Rest extends PropertyPath<NonNullable<D[K]>>
      ? PropertyType<NonNullable<D[K]>, Rest>
      : never
    : never
  : P extends keyof D
  ? D[P]
  : never;

export type ControlProps<D extends GenericData> = {
  value?: any;
} & MappableProps<D, { value?: any }>;

export type ControlValue<
  T extends 'single' | 'multiple',
  P extends ControlProps<GenericData>,
  V = NonNullable<
    PropertyType<
      NonNullable<P['data']>,
      Extract<
        NonNullable<P['propMapping']>['value'],
        PropertyPath<NonNullable<P['data']>>
      >
    >
  >
> = T extends 'multiple' ? V[] : V;

//* Prop Types
export interface GroupProps<
  T extends 'single' | 'multiple',
  P extends ControlProps<GenericData>
> extends StoreProps<NonNullable<P['data']>> {
  name?: string;
  optionProps?: Omit<P, 'data'>;
  value?: ControlValue<T, P>;
  onChange?: (value?: ControlValue<T, P>, name?: string) => void;
}

export interface BaseListItemProps {
  primary?: string;
  secondary?: string;
  disabled?: boolean;
}

interface BaseOptionProps extends BaseListItemProps {
  value?: any;
}

export interface BaseSelectFieldProps<
  T extends 'single' | 'multiple',
  D extends GenericData
> extends GroupProps<T, BaseOptionProps & MappableProps<D, BaseOptionProps>> {
  optionIndicator?: SlotElement;
}
