import type { HierarchyData, SuperiorHierarchy } from '../imports.types';

export interface InitializationConfig<T> {
  hash: string;
  id: string;
  config?: T;
  hierarchy?: HierarchyData;
  superiors: SuperiorHierarchy[];
}
