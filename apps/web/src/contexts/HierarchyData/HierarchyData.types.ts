import type { ReactNode } from 'react';
import type { HierarchyData } from '../imports.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HierarchyDataContextValue = Record<string, HierarchyData<any>>;

export interface HierarchyDataProviderProps {
  data: HierarchyDataContextValue;
  children: ReactNode;
}
