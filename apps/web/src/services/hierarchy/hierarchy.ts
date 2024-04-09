import axios from 'axios';

import type {
  GetHierarchyDataParams,
  GetSuperiorHierarchiesParams,
  HierarchyData,
  SuperiorHierarchy,
} from './hierarchy.types';

export async function getHierarchyData<P = never>({
  queryKey: [params],
}: GetHierarchyDataParams) {
  const { data } = await axios.post<HierarchyData<string, P>[]>(
    '/api/hierarchy/search',
    params
  );

  return data;
}

export async function getSuperiorHierarchies({
  queryKey: [id],
}: GetSuperiorHierarchiesParams) {
  const { data } = await axios.get<SuperiorHierarchy[]>(
    `/api/hierarchy/superiors/${id}`
  );

  return data;
}
