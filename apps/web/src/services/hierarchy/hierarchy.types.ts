import type * as WeavcraftTypes from '@weavcraft/types';

export type SearchHierarchyParams = WeavcraftTypes.SearchHierarchyParams;
export type SuperiorHierarchy = Pick<HierarchyData<string>, '_id' | 'title'>;

export type HierarchyData<U extends string | undefined, P = never> = Omit<
  WeavcraftTypes.HierarchyData<U, P>,
  'userid'
>;

export type MutationtHierarchyInput = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: HierarchyData<string | undefined, any>;
  isTutorialMode?: boolean;
};
