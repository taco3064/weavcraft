import type { HierarchyData as CommonHierarchyData } from '@weavcraft/common';

export {
  EnumHierarchyType,
  type SearchHierarchyParams,
} from '@weavcraft/common';

export type SuperiorHierarchy = Pick<CommonHierarchyData, 'id' | 'title'>;
export type HierarchyData<P = never> = CommonHierarchyData<P>;

export type MutationtHierarchyInput = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: HierarchyData<any>;
  isTutorialMode?: boolean;
};
