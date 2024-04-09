import axios from 'axios';

import type {
  GetHierarchyDataParams,
  GetSuperiorHierarchiesParams,
  HierarchyData,
  SuperiorHierarchy,
} from './hierarchy.types';

export async function getHierarchyData<P = never>({
  queryKey: [params, isInTutorial],
}: GetHierarchyDataParams) {
  const { data } = await axios.post<HierarchyData<string, P>[]>(
    '/hierarchy/search',
    params,
    { baseURL: isInTutorial ? '/mocks' : '/api' }
  );

  return data;
}

export async function getSuperiorHierarchies({
  queryKey: [id, isInTutorial],
}: GetSuperiorHierarchiesParams) {
  const { data } = await axios.get<SuperiorHierarchy[]>(
    `/hierarchy/superiors/${id}`,
    { baseURL: isInTutorial ? '/mocks' : '/api' }
  );

  return data;
}
