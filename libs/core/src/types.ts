/* eslint-disable @typescript-eslint/no-explicit-any */

export type Data = {
  [key: string]: any;
};

export type OverridePropNames<P, N extends keyof P = keyof P> = Extract<
  keyof P,
  N
>;
