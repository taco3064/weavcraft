import type { JsonObject } from 'type-fest';
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
    Pick<
      MappableProps<
        {},
        Extract<'records' | (K extends 'records' ? never : K), string>
      >,
      'propMapping'
    >
>;
