import type * as WeavcraftTypes from '@weavcraft/types';
import type { QueryFunctionContext } from '@tanstack/react-query';

export type SearchHierarchyParams = WeavcraftTypes.SearchHierarchyParams;

export type HierarchyData<U extends string | undefined, P = never> = Omit<
  WeavcraftTypes.HierarchyData<U, P>,
  'userid'
>;

export type GetHierarchyDataParams = Pick<
  QueryFunctionContext<readonly [SearchHierarchyParams]>,
  'queryKey'
>;
