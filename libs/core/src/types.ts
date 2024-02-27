/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from 'react';

export type Data = {
  [key: string]: any;
};

export type ActionElement = ReactElement<{ onClick?: never | (() => void) }>;

export type OverridableNames<
  P,
  N extends Extract<keyof P, string> = Extract<keyof P, string>
> = Extract<keyof P, N>;

export interface PropMapping<T extends string> {
  propMapping?: Partial<Record<T, string>>;
}
