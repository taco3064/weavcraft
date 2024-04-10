import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type {
  GetHierarchyDataParams,
  GetSuperiorHierarchiesParams,
  HierarchyData,
  SuperiorHierarchy,
} from './hierarchy.types';

export const getSuperiorHierarchies = withConnRefusedCatch(async function ({
  queryKey: [id, isInTutorial],
}: GetSuperiorHierarchiesParams) {
  const { data } = await axios.get<SuperiorHierarchy[]>(
    `/hierarchy/superiors/${id}`,
    { baseURL: isInTutorial ? '/mocks' : '/api' }
  );

  return data;
},
[]);

export const getHierarchyData = withConnRefusedCatch(async function <
  P = never
>({ queryKey: [params, isInTutorial] }: GetHierarchyDataParams) {
  const { data } = await axios.post<HierarchyData<string, P>[]>(
    '/hierarchy/search',
    params,
    { baseURL: isInTutorial ? '/mocks' : '/api' }
  );

  return data;
},
[]);
