import type {
  HierarchyData,
  SuperiorHierarchy,
  ThemePalette,
} from '~web/services';

export interface ThemeDetailPageProps {
  hash: string;
  id: string;
  initialData?: ThemePalette;
  initialHierarchy?: HierarchyData<string>;
  initialSuperiors: SuperiorHierarchy[];
}
