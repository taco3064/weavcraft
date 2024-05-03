import type { JSXElementConstructor, ReactElement } from 'react';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type TypeMapping = {
  bigint: bigint;
  boolean: boolean;
  date: Date;
  number: number;
  string: string;
};

export type PropertyPath<T> = T extends Function | Array<any> | ReactElement
  ? ''
  : (
      T extends object
        ? {
            [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
              PropertyPath<T[K]>
            >}`;
          }[Exclude<keyof T, symbol>]
        : ''
    ) extends infer D
  ? Extract<D, string>
  : never;

export interface GenericData {
  [key: string]:
    | null
    | undefined
    | TypeMapping[keyof TypeMapping]
    | GenericData
    | GenericData[];
}

//* - Utility Prop Types
export type PrefixProps<P, PX extends string> = {
  [K in Extract<keyof P, string> as `${PX}${Capitalize<K>}`]?: P[K];
};

//* - Component Data
export interface MappableProps<D extends GenericData, P = {}> {
  data?: D;
  propMapping?: Partial<Record<PropertyPath<P>, PropertyPath<D> | string>>;
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
export type PropsWithStore<D extends GenericData, P = {}> = P & {
  records?: D[];
};

type MappableStoreProps<D extends GenericData, P extends PropsWithStore<D>> = {
  propMapping?: Partial<
    Record<PropertyPath<P> | 'records', PropertyPath<D> | string>
  >;
};

export type PropsWithMappedStore<
  D extends GenericData,
  P extends PropsWithStore<D>,
  K extends keyof P = 'records'
> = PropsWithStore<D, P> & MappableStoreProps<D, Pick<P, K>>;

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
