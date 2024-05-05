import type * as TF from 'type-fest';
import type { JSXElementConstructor, ReactElement } from 'react';

//* - Utility Prop Types
export type PrefixProps<P, PX extends string> = {
  [K in Extract<keyof P, string> as `${PX}${Capitalize<K>}`]?: P[K];
};

//* - Component Data
export interface MappableProps<D extends TF.JsonObject, P = {}> {
  data?: D;
  propMapping?: Partial<
    Record<
      keyof TF.ConditionalExcept<Required<P>, Function>,
      TF.Paths<D> extends infer Paths
        ? TF.IsNever<Paths> extends true
          ? string
          : Paths
        : string
    >
  >;
}

export type PropsWithMappedData<
  D extends TF.JsonObject,
  P,
  K extends keyof P = keyof P
> = P & MappableProps<D, Pick<P, K>>;

//* - Component Slot
export type SlotProps = Record<string, any> & {
  onClick?: never | ((...args: any[]) => void);
};

export type SlotElement<
  P = SlotProps & Omit<MappableProps<TF.JsonObject, SlotProps>, 'data'>
> = ReactElement<P, JSXElementConstructor<P>>;

//* - Store Records
export type PropsWithStore<D extends TF.JsonObject, P = {}> = P & {
  records?: D[];
};

export type PropsWithMappedStore<
  D extends TF.JsonObject,
  P = {},
  K extends keyof P | never = never
> = PropsWithStore<D, P> & {
  propMapping?: Partial<
    Record<
      'records' | (K extends never ? never : TF.Paths<Pick<P, K>>),
      TF.Paths<D> | string
    >
  >;
};

//* - Custom Hooks
type TypeMapping = {
  boolean: boolean;
  number: number;
  string: string;
};

type ValueType<
  T extends keyof TypeMapping,
  A extends 'arrayOf' | undefined = undefined
> = `${T}${A extends 'arrayOf' ? '[]' : ''}`;

export type ValueTypeMapping = { [K in keyof TypeMapping]?: ValueType<K> };
export type DataValue = ValueType<keyof TypeMapping, 'arrayOf' | undefined>;

export type DataStructureContextValue = {
  uid: symbol;
  paths: string[];
};

export interface DataStructure {
  [k: symbol]: Record<string, DataValue | DataStructure>;
}
