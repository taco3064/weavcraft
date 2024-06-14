import { createContext, useCallback, useContext } from 'react';

import type {
  GetDefinitionFn,
  PropsDefinitionContextValue,
} from './PropsDefinition.types';

export const PropsDefinitionContext =
  createContext<PropsDefinitionContextValue | null>(null);

export function usePropsDefinitionGetter() {
  const definitions = useContext(
    PropsDefinitionContext
  ) as PropsDefinitionContextValue;

  return useCallback<GetDefinitionFn>(
    (widget) => definitions?.[widget],
    [definitions]
  );
}
