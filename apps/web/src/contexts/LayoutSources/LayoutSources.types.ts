import type { ReactNode } from 'react';
import type { HierarchyData, WidgetConfigs } from '../imports.types';

export type LayoutSourcesContextValue = Record<
  string,
  HierarchyData<WidgetConfigs>
>;

export interface LayoutSourcesProviderProps {
  layouts: LayoutSourcesContextValue;
  children: ReactNode;
}
