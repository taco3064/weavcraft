import { createContext, useContext } from 'react';

import type { PropsDefinitionContextValue } from './PropsDefinition.types';

export const PropsDefinitionContext =
  createContext<PropsDefinitionContextValue>([]);

export function usePropsDefinition() {
  const definitions = useContext(PropsDefinitionContext);

  return {
    definitions,

    getDefinition: (widgetId?: string) =>
      !widgetId
        ? null
        : definitions.find(({ componentName }) => componentName === widgetId),
  };
}
