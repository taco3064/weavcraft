import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface ThemesPageProps {
  group?: string;
  initialData: HierarchyData<string>[];
  superiors: SuperiorHierarchy[];
}
