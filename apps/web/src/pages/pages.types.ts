import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface BaseHierarchyProps<P = never> {
  group?: string;
  initialData: HierarchyData<P>[];
  initialSuperiors: SuperiorHierarchy[];
}
