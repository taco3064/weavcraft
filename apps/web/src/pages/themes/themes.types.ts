import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface ThemesPageProps {
  group?: string;
  initialData: HierarchyData<string>[];
  isTutorialMode: boolean;
  superiors: SuperiorHierarchy[];
}
