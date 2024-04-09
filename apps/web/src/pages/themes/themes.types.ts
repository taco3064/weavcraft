import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface ThemesGroupProps {
  group?: string;
  initialData: HierarchyData<string>[];
  superiors: SuperiorHierarchy[];
}
