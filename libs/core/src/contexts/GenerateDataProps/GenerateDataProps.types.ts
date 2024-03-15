import type { JSXElementConstructor, ReactElement } from 'react';

type NonCallbackProps<P> = {
  [K in Extract<keyof P, string>]: P[K] extends Function ? never : K;
}[Extract<keyof P, string>];

type TypeMapping = {
  bigint: bigint;
  boolean: boolean;
  date: Date;
  number: number;
  string: string;
};

export interface GenericData {
  [key: string]:
    | null
    | undefined
    | TypeMapping[keyof TypeMapping]
    | GenericData
    | GenericData[];
}

export type PropertyPath<
  D extends GenericData,
  K extends keyof D = keyof D
> = K extends string
  ? D[K] extends Record<string, any> | undefined
    ? D[K] extends undefined
      ? `${K}`
      : `${K}.${PropertyPath<NonNullable<D[K]>>}` | `${K}`
    : `${K}`
  : never;

//* - Component Data
export interface MappableProps<D extends GenericData, P = {}> {
  data?: D;
  propMapping?: Partial<
    Record<
      NonCallbackProps<P>,
      D extends GenericData ? PropertyPath<D> : string
    >
  >;
}

export type PropsWithMappedData<
  D extends GenericData,
  P,
  K extends keyof P = keyof P
> = P & MappableProps<D, Pick<P, K>>;

//* - Component Slot
export type SlotProps = Record<string, any> & {
  onClick?: never | ((...args: any[]) => void);
};

export type SlotElement<
  P = SlotProps & Omit<MappableProps<GenericData, SlotProps>, 'data'>
> = ReactElement<P, JSXElementConstructor<P>>;

//* - Store Records
export type StoreProps<D extends GenericData> = {
  records?: D[];
};

type MappableStoreProps<D extends GenericData, P extends StoreProps<D>> = {
  propMapping?: Partial<Record<NonCallbackProps<P> | 'records', string>>;
};

export type PropsWithStore<D extends GenericData, P = {}> = P &
  StoreProps<Extract<D, GenericData>>;

export type PropsWithMappedStore<
  D extends GenericData,
  P = {},
  K extends keyof (P & StoreProps<D>) = 'records'
> = PropsWithStore<D, P> & MappableStoreProps<D, Pick<P & StoreProps<D>, K>>;

//* - Custom Hooks
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
