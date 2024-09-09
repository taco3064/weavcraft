import { HierarchyDataContext } from './HierarchyData.hooks';
import type { HierarchyDataProviderProps } from './HierarchyData.types';

export default function HierarchyDataProvider({
  children,
  data,
}: HierarchyDataProviderProps) {
  return (
    <HierarchyDataContext.Provider value={data}>
      {children}
    </HierarchyDataContext.Provider>
  );
}
