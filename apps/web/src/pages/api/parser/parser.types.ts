import { WidgetPropTypes } from '@weavcraft/common';
import type * as Tsm from 'ts-morph';
import type { Get } from 'type-fest';

import type {
  DataBindingPropDefinition,
  ElementNodePropDefinitions,
  EventCallbackPropDefinitions,
  PrimitivePropDefinitions,
  PropTypeDefinitions,
  PropsDefinition,
} from '~web/services';

type WidgetPropDefinitions = {
  ElementNode: Get<ElementNodePropDefinitions, ['elementNodeProps', string]>;

  DataBinding: Get<
    DataBindingPropDefinition,
    [
      'dataBindingProps',
      'data' | 'records' | 'propMapping' | `${string}.propMapping`
    ]
  >;
  EventCallback: Get<
    EventCallbackPropDefinitions,
    ['eventCallbackProps', string]
  >;
  PrimitiveValue: Get<
    PrimitivePropDefinitions,
    ['primitiveValueProps', string]
  >;
};

type GetDefinitionArgs = [
  Tsm.Type,
  Pick<PropTypeDefinitions.PropTypes, 'path' | 'aliasName' | 'required'>
];

export type GetPropsDefinitionsReturn = Pick<
  PropsDefinition,
  'elementNodeProps' | 'eventCallbackProps' | 'primitiveValueProps'
>;

export type GetDefinitionFn = (
  propsType: WidgetPropTypes,
  ...[type, options]: GetDefinitionArgs
) => WidgetPropDefinitions[typeof propsType] | false;

export type GetDefinitionFns<T extends WidgetPropTypes = WidgetPropTypes> = {
  [K in T]: ((
    ...[type, options]: GetDefinitionArgs
  ) => WidgetPropDefinitions[K] | false)[];
};

export type GetPropertyWithAllTypesFn = (
  property: Tsm.Symbol,
  prefixPath?: string
) => {
  propsType: WidgetPropTypes;
  propPath: string;
  definition: PropTypeDefinitions.PropTypes;
}[];

export type CoreParser = {
  source: Tsm.SourceFile;
  propSymbols: Tsm.Symbol[];

  getCoreGroup: (component: string) => string | undefined;
  getPropSymbol: (component: string) => Tsm.Symbol | undefined;
  getPropsDefinitions: (symbol?: Tsm.Symbol) => GetPropsDefinitionsReturn;
};
