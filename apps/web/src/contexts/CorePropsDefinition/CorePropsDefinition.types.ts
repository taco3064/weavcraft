import type { Get } from 'type-fest';
import type { ReactNode } from 'react';

import type {
  ElementNodePropDefinitions,
  PrimitivePropDefinitions,
  PropsDefinition,
  WidgetType,
} from '../imports.types';

type ElementNodeDefinition = NonNullable<
  Get<ElementNodePropDefinitions, ['elementNodeProps', string]>
>;

type PrimitiveValueDefinition = NonNullable<
  Get<PrimitivePropDefinitions, ['primitiveValueProps', string]>
>;

export type MappingPath = 'propMapping' | `${string}.propMapping`;

export type GetCorePropsFn = (widget: WidgetType) => {
  definition: PropsDefinition;
  isStoreWidget: boolean;
  mappingPaths: MappingPath[];

  mappableProps: {
    [Path: string]: ElementNodeDefinition | PrimitiveValueDefinition;
  };
};

export type CorePropsDefinitionContextValue = Record<
  WidgetType,
  PropsDefinition
>;

export interface CorePropsDefinitionProviderProps {
  children: ReactNode;
}
