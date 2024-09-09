import { createContext } from 'react';
import type { HierarchyDataContextValue } from './HierarchyData.types';

export const HierarchyDataContext = createContext<HierarchyDataContextValue>(
  {}
);
