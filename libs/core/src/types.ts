import type { JSXElementConstructor, ReactElement } from 'react';

type NonCallbackProps<P> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in Extract<keyof P, string>]: P[K] extends Function ? never : K;
}[Extract<keyof P, string>];

export type GenericData = {
  [key: string]: unknown;
};

export type MappableProps<D extends GenericData, P> = P & {
  data?: D;
  propMapping?: Partial<Record<NonCallbackProps<P>, string>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseActionProps = Record<string, any> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: never | ((...args: any[]) => void);
};

export type ActionElement<
  D extends GenericData,
  P extends BaseActionProps,
  M = Omit<MappableProps<D, P>, 'data'>
> = ReactElement<M, JSXElementConstructor<M>>;
