import type * as WeavcraftTypes from '@weavcraft/types';

export type SearchHierarchyParams = WeavcraftTypes.SearchHierarchyParams;

export type HierarchyData<U extends string | undefined> = Omit<
  WeavcraftTypes.HierarchyData<U>,
  'userid'
>;
