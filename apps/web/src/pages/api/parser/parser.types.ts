import { PropCategory } from '@weavcraft/common';
import type * as Tsm from 'ts-morph';
import type { Get } from 'type-fest';

import type {
  ComponentDefinition,
  PropDefinition,
  TypeDefinition,
} from '../../imports.types';

type WidgetPropDefinitions = {
  ElementNode: Get<PropDefinition.ElementNode, ['elementNodeProps', string]>;

  DataBinding: Get<
    PropDefinition.DataBinding,
    [
      'dataBindingProps',
      'data' | 'records' | 'propMapping' | `${string}.propMapping`
    ]
  >;
  EventCallback: Get<
    PropDefinition.EventCallback,
    ['eventCallbackProps', string]
  >;
  PrimitiveValue: Get<
    PropDefinition.PrimitiveValue,
    ['primitiveValueProps', string]
  >;
};

type GetDefinitionArgs = [
  Tsm.Type,
  Pick<TypeDefinition.Types, 'path' | 'aliasName' | 'required'>
];

export type GetPropsDefinitionsReturn = Pick<
  ComponentDefinition,
  'elementNodeProps' | 'eventCallbackProps' | 'primitiveValueProps'
>;

export type GetPropsDefinitionFn = (
  propCategory: PropCategory,
  ...[type, options]: GetDefinitionArgs
) => WidgetPropDefinitions[typeof propCategory] | false;

export type GetDefinitionFns<T extends PropCategory = PropCategory> = {
  [K in T]: ((
    ...[type, options]: GetDefinitionArgs
  ) => WidgetPropDefinitions[K] | false)[];
};

export type GetPropertyWithAllTypesFn = (
  property: Tsm.Symbol,
  prefixPath?: string
) => {
  propCategory: PropCategory;
  propPath: string;
  definition: TypeDefinition.Types;
}[];

export type CoreParser = {
  source: Tsm.SourceFile;
  propSymbols: Tsm.Symbol[];

  getCoreGroup: (component: string) => string | undefined;
  getPropSymbol: (component: string) => Tsm.Symbol | undefined;
  getPropsDefinitions: (symbol?: Tsm.Symbol) => GetPropsDefinitionsReturn;
};
