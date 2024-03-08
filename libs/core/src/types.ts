import type { JSXElementConstructor, ReactElement } from 'react';

type NonCallbackProps<P> = {
  [K in Extract<keyof P, string>]: P[K] extends Function ? never : K;
}[Extract<keyof P, string>];

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

export type GenericData = {
  [key: string]: unknown;
};

export type MappableProps<D extends GenericData, P> = P & {
  data?: D;
  propMapping?: Partial<Record<NonCallbackProps<P>, PropertyPath<D>>>;
};

export type BaseSlotProps = Record<string, any> & {
  onClick?: never | ((...args: any[]) => void);
};

export type SlotElement<
  D extends GenericData,
  P extends BaseSlotProps,
  M = Omit<MappableProps<D, P>, 'data'>
> = ReactElement<M, JSXElementConstructor<M>>;
