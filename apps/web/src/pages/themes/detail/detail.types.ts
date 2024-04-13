import type {
  HierarchyData,
  SuperiorHierarchy,
  ThemePalette,
} from '~web/services';

export interface ThemeDetailPageProps {
  id: string;
  initialData?: ThemePalette;
  initialHierarchy?: HierarchyData<string>;
  initialSuperiors: SuperiorHierarchy[];
}
