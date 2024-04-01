import type * as WeavcraftTypes from '@weavcraft/types';

export type HierarchyData<U extends string | undefined> = Omit<
  WeavcraftTypes.HierarchyData<U>,
  'userid'
>;
