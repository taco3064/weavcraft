import type { HierarchyData, SuperiorHierarchy } from '../hooks.types';

export interface InitializationConfig<T> {
  hash: string;
  id: string;
  config?: T;
  hierarchy?: HierarchyData;
  superiors: SuperiorHierarchy[];
}
