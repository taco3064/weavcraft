import MockAdapter from 'axios-mock-adapter';
import type { LowSync } from 'lowdb';
import type { JsonPrimitive } from 'type-fest';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

//* - Common Service Types
export type MockSetupOptions = {
  mock: MockAdapter;
  getDb: <D>(name: string) => LowSync<Record<string, D>>;
};

export type QueryFunctionParams<T extends QueryKey = []> = Pick<
  QueryFunctionContext<T | [...T, boolean]>,
  'queryKey'
>;

export type ResponseData<T> = {
  success: boolean;
  status: number;
  data: T;
};

//* - Props Type Schema
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PropTypeDefinitions {
  enum PropTypeEnum {
    boolean,
    data,
    function,
    icon,
    mapping,
    node,
    number,
    object,
    oneof,
    string,
  }

  interface BasePropType<T extends keyof typeof PropTypeEnum, D = undefined> {
    path: string;
    aliasName?: string;
    required: boolean;
    type: T;
    definition?: D;
  }

  export type Boolean = BasePropType<'boolean'>;
  export type Data = BasePropType<'data', { multiple: boolean }>;
  export type Icon = BasePropType<'icon'>;
  export type Mapping = BasePropType<'mapping', string[]>;
  export type Number = BasePropType<'number'>;
  export type OneOf = BasePropType<'oneof', Exclude<JsonPrimitive, null>[]>;
  export type String = BasePropType<'string', { multiple: boolean }>;

  export type Function = BasePropType<
    'function',
    { params: (PropTypes | undefined)[]; return?: PropTypes }
  >;

  export type Node = BasePropType<
    'node',
    { multiple: boolean; clickable: boolean }
  >;

  export type PropTypes =
    | Boolean
    | Data
    | Function
    | Icon
    | Mapping
    | Node
    | Number
    | OneOf
    | String;
}
