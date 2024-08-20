import type { Get } from 'type-fest';
import type { ReactNode } from 'react';

import type {
  ComponentDefinition,
  CoreComponent,
  PropDefinition,
} from '../imports.types';

type ElementNodeDefinition = NonNullable<
  Get<PropDefinition.ElementNode, ['elementNodeProps', string]>
>;

type PrimitiveValueDefinition = NonNullable<
  Get<PropDefinition.PrimitiveValue, ['primitiveValueProps', string]>
>;

export type MappingPath = 'propMapping' | `${string}.propMapping`;

export type GetCorePropsFn = (component: CoreComponent) => {
  definition: ComponentDefinition;
  isStoreWidget: boolean;
  mappingPaths: MappingPath[];

  mappableProps: {
    [Path: string]: ElementNodeDefinition | PrimitiveValueDefinition;
  };
};

export type CorePropsDefinitionContextValue = Record<
  CoreComponent,
  ComponentDefinition
>;

export interface CorePropsDefinitionProviderProps {
  children: ReactNode;
}
