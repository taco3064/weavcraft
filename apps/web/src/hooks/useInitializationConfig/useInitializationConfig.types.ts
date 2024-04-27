import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface InitializationConfig<T> {
  hash: string;
  id: string;
  config?: T;
  hierarchy?: HierarchyData;
  superiors: SuperiorHierarchy[];
}
