import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface BaseHierarchyProps {
  group?: string;
  initialData: HierarchyData[];
  initialSuperiors: SuperiorHierarchy[];
}
