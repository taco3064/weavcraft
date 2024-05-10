import type { ConditionalExcept, JsonObject } from 'type-fest';
import type { MappableProps } from '../usePropsGetter';

export type PropsWithStore<D extends JsonObject, P = {}> = P & {
  records?: D[];
};

export type BaseProps<
  D extends JsonObject,
  K extends string = string
> = PropsWithStore<D, MappableProps<D, `${K | 'records'}`>>;

export type PropsWithMappedStore<
  D extends JsonObject,
  P = {},
  K extends 'records' | keyof P = 'records'
> = PropsWithStore<
  D,
  P &
    MappableProps<
      {},
      Extract<
        | 'records'
        | (K extends 'records'
            ? never
            : keyof ConditionalExcept<Required<P>, Function>),
        string
      >
    >
>;
