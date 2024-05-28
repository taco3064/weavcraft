import { createContext, useCallback, useContext } from 'react';

import type { PropsDefinition, WidgetType } from '~web/services';
import type { PropsDefinitionContextValue } from './PropsDefinition.types';

export const PropsDefinitionContext =
  createContext<PropsDefinitionContextValue>([]);

export function usePropsDefinition() {
  const definitions = useContext(PropsDefinitionContext);

  return {
    definitions,

    getDefinition: useCallback(
      (widgetId: WidgetType) =>
        definitions.find(
          ({ componentName }) => componentName === widgetId
        ) as PropsDefinition,
      [definitions]
    ),
  };
}
