import type * as WeavcraftTypes from '@weavcraft/types';
import type { QueryFunctionContext } from '@tanstack/react-query';

export type SearchHierarchyParams = WeavcraftTypes.SearchHierarchyParams;

export type HierarchyData<U extends string | undefined, P = never> = Omit<
  WeavcraftTypes.HierarchyData<U, P>,
  'userid'
>;

export type SuperiorHierarchy = Pick<HierarchyData<string>, '_id' | 'title'>;

export type GetHierarchyDataParams = Pick<
  QueryFunctionContext<readonly [SearchHierarchyParams, boolean]>,
  'queryKey'
>;

export type GetSuperiorHierarchiesParams = Pick<
  QueryFunctionContext<readonly [string, boolean]>,
  'queryKey'
>;
