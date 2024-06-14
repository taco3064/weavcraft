import type { ReactNode } from 'react';
import type { PropsDefinition, WidgetType } from '~web/services';

export type GetDefinitionFn = (widget: WidgetType) => PropsDefinition;
export type PropsDefinitionContextValue = Record<WidgetType, PropsDefinition>;

export interface PropsDefinitionProviderProps {
  children: ReactNode;
}
