import type { ReactNode } from 'react';
import type { PropsDefinition, PropTypeDefinitions } from '~web/services';

export type PropType = PropTypeDefinitions.PropTypes['type'];
export type PropsDefinitionContextValue = PropsDefinition[];

export interface PropsDefinitionProviderProps {
  children: ReactNode;
}
