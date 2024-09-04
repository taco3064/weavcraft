import type { ReactNode } from 'react';
import type { WidgetConfigs } from '../imports.types';

export type TodoVariableSourcesContextValue = Record<string, WidgetConfigs>;

export interface TodoVariableSourcesProviderProps {
  widgets: WidgetConfigs[];
  children: ReactNode;
}
