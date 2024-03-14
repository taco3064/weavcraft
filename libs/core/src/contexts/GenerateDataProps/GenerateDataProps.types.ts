import type { JSXElementConstructor, ReactElement } from 'react';

type NonCallbackProps<P> = {
  [K in Extract<keyof P, string>]: P[K] extends Function ? never : K;
}[Extract<keyof P, string>];

export interface GenericData {
  [key: string]:
    | bigint
    | boolean
    | null
    | number
    | string
    | undefined
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

//* Generate Data Props
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

//* Generate Store Props
export type StoreProps<D extends GenericData = GenericData> = {
  records?: D[];
};

type MappableStoreProps<D extends GenericData, P extends StoreProps<D>> = Pick<
  MappableProps<D, P>,
  'propMapping'
>;

export type PropsWithStore<
  D extends GenericData,
  P,
  K extends keyof (P & StoreProps<D>) = 'records'
> = P &
  StoreProps<D> &
  MappableStoreProps<
    NonNullable<(P & StoreProps<D>)['records']>[number],
    Pick<P & StoreProps<D>, K | 'records'>
  >;

export type SlotProps = Record<string, any> & {
  onClick?: never | ((...args: any[]) => void);
};

export type SlotElement<
  P = SlotProps & Omit<MappableProps<GenericData, SlotProps>, 'data'>
> = ReactElement<P, JSXElementConstructor<P>>;
