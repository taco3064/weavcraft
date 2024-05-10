import type * as TF from 'type-fest';
import type { ReactNode } from 'react';

//* - Provider Props
export interface DataStructureProviderProps<D extends TF.JsonObject> {
  children: ReactNode;
  records?: D[];
  recordsMappingPath?: string;
}

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
