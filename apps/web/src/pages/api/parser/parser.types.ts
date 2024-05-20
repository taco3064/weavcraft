import { WidgetPropTypes } from '@weavcraft/common';
import type * as Tsm from 'ts-morph';
import type { Get } from 'type-fest';

import type {
  ElementNodePropsWithPath,
  EventCallbackPropsWithPath,
  PrimitiveValuePropsWithPath,
  PropTypeDefinitions,
  PropsDefinition,
} from '~web/services';

type WidgetPropTypeDefinitions = {
  ElementNode: Get<ElementNodePropsWithPath, ['elementNodeProps', string]>;

  EventCallback: Get<
    EventCallbackPropsWithPath,
    ['eventCallbackProps', string]
  >;
  PrimitiveValue: Get<
    PrimitiveValuePropsWithPath,
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
) => WidgetPropTypeDefinitions[typeof propsType] | false;

export type GetDefinitionFns<T extends WidgetPropTypes = WidgetPropTypes> = {
  [K in T]: ((
    ...[type, options]: GetDefinitionArgs
  ) => WidgetPropTypeDefinitions[K] | false)[];
};

export type GetPropertyFn = (
  propsType: WidgetPropTypes,
  property: Tsm.Symbol,
  prefixPath?: string
) => [string, WidgetPropTypeDefinitions[typeof propsType] | null];

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
