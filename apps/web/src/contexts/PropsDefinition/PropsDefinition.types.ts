import type { ReactNode } from 'react';
import type { PropsDefinition } from '~web/services';

export type PropsDefinitionContextValue = PropsDefinition[];

export interface PropsDefinitionProviderProps {
  children: ReactNode;
}
