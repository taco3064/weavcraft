/* eslint-disable @typescript-eslint/no-namespace */
import type { JsonPrimitive } from 'type-fest';
import type { PropCategory } from '@weavcraft/common';

import type { CoreComponent } from '../configs';

export namespace TypeDefinition {
  enum TypeEnum {
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

  interface BaseType<T extends keyof typeof TypeEnum, D = undefined> {
    path: string;
    aliasName?: string;
    required: boolean;
    type: T;
    definition?: D;
  }

  export type Boolean = BaseType<'boolean'>;
  export type Data = BaseType<'data', { multiple: boolean }>;
  export type Icon = BaseType<'icon'>;
  export type Mapping = BaseType<'mapping', string[]>;
  export type Number = BaseType<'number'>;
  export type OneOf = BaseType<'oneof', Exclude<JsonPrimitive, null>[]>;
  export type String = BaseType<'string', { multiple: boolean }>;

  export type Function = BaseType<
    'function',
    { params: (Types | undefined)[]; return?: Types }
  >;

  export type Node = BaseType<
    'node',
    { multiple: boolean; clickable: boolean }
  >;

  export type Types =
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

export namespace PropDefinition {
  type BaseProp<
    T extends PropCategory,
    P extends { [Path: string]: TypeDefinition.Types }
  > = Partial<Record<`${Uncapitalize<T>}Props`, P>>;

  export type DataBinding = BaseProp<
    'DataBinding',
    Record<'propMapping' | `${string}.propMapping`, TypeDefinition.Mapping> &
      Record<'data' | 'records', TypeDefinition.Data>
  >;

  export type ElementNode = BaseProp<
    'ElementNode',
    { [Path: string]: TypeDefinition.Node }
  >;

  export type EventCallback = BaseProp<
    'EventCallback',
    { [Path: string]: TypeDefinition.Function }
  >;

  export type PrimitiveValue = BaseProp<
    'PrimitiveValue',
    {
      [Path: string]:
        | TypeDefinition.Boolean
        | TypeDefinition.Icon
        | TypeDefinition.Number
        | TypeDefinition.OneOf
        | TypeDefinition.String;
    }
  >;
}

export interface ComponentDefinition
  extends PropDefinition.DataBinding,
    PropDefinition.ElementNode,
    PropDefinition.EventCallback,
    PropDefinition.PrimitiveValue {
  componentName: string;
  group?: string;
}

export type DefinitionIDB = Record<
  'core',
  {
    key: CoreComponent;
    value: ComponentDefinition;
  }
>;
