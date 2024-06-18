import type { Get } from 'type-fest';
import type { ReactNode } from 'react';

import type {
  ElementNodePropsWithPath,
  PrimitiveValuePropsWithPath,
  PropsDefinition,
  WidgetType,
} from '~web/services';

type ElementNodeDefinition = NonNullable<
  Get<ElementNodePropsWithPath, ['elementNodeProps', string]>
>;
type PrimitiveValueDefinition = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

export type MappingPath = 'propMapping' | `${string}.propMapping`;

export type GetDefinitionFn = (widget: WidgetType) => {
  childrenBasePath?: string;
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
