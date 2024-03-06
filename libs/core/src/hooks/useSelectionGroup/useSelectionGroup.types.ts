import type { GenericData, MappableProps, PropertyPath } from '../../types';

type PropertyType<
  D extends GenericData,
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

type GroupValue<
  D extends GenericData,
  P extends MappableProps<D, { value?: any }>,
  V = PropertyType<
    D,
    Extract<NonNullable<P['propMapping']>['value'], PropertyPath<D>>
  >
> = NonNullable<V>;

export interface GroupProps<
  T extends 'single' | 'multiple',
  D extends GenericData,
  P extends MappableProps<D, { value?: any }>,
  V = GroupValue<D, P>
> {
  name?: string;
  optionProps?: Omit<P, 'data'>;
  options?: D[];
  value?: T extends 'multiple' ? V[] : V;
  onChange?: (data?: T extends 'multiple' ? V[] : V, name?: string) => void;
}
