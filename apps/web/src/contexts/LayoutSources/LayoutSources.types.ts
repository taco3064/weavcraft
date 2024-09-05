import type { ReactNode } from 'react';
import type { WidgetConfigs } from '../imports.types';

export type LayoutSourcesContextValue = Record<string, WidgetConfigs>;

export interface LayoutSourcesProviderProps {
  layouts: Record<string, WidgetConfigs>;
  children: ReactNode;
}
