import type { HierarchyData } from '~web/services';

export interface ThemesGroupProps {
  group?: string;
  initialData: HierarchyData<string>[];
}
