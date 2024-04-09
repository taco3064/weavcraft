import type { HierarchyData, SuperiorHierarchy } from '~web/services';

export interface ThemesPageProps {
  group?: string;
  initialData: HierarchyData<string>[];
  isInTutorial: boolean;
  superiors: SuperiorHierarchy[];
}
