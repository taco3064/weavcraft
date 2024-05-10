import type { ConditionalExcept, JsonObject } from 'type-fest';
import type { MappableProps } from '../usePropsGetter';

export type PrefixProps<P, PX extends string> = {
  [K in Extract<keyof P, string> as `${PX}${Capitalize<K>}`]?: P[K];
};

export type PropsWithData<D extends JsonObject, P = {}> = P & {
  data?: D;
};

export type BaseProps<
  D extends JsonObject,
  K extends string = string
> = PropsWithData<D, MappableProps<D, K>>;

export type PropsWithMappedData<
  D extends JsonObject,
  P,
  K extends keyof P = keyof P
> = PropsWithData<
  D,
  P &
    MappableProps<
      D,
      Extract<keyof ConditionalExcept<Required<Pick<P, K>>, Function>, string>
    >
>;
