import axios from 'axios';

import type { GetHierarchyDataParams, HierarchyData } from './hierarchy.types';

export async function getHierarchyData<P = never>({
  queryKey: [params],
}: GetHierarchyDataParams) {
  const { data } = await axios.post<HierarchyData<string, P>[]>(
    '/api/hierarchy/search',
    params
  );

  return data;
}
