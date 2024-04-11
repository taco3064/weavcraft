import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type {
  GetHierarchyDataParams,
  GetSuperiorHierarchiesParams,
  HierarchyData,
  MutationtHierarchyInput,
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

export const createHierarchyData = withConnRefusedCatch(
  async ({ input, isInTutorial }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData<string>>(
      '/hierarchy/create',
      input,
      { baseURL: isInTutorial ? '/mocks' : '/api' }
    );

    return data;
  }
);

export const updateHierarchyData = withConnRefusedCatch(
  async ({ input, isInTutorial }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData<string>>(
      '/hierarchy/update',
      input,
      { baseURL: isInTutorial ? '/mocks' : '/api' }
    );

    return data;
  }
);

export const deleteHierarchyData = withConnRefusedCatch(
  ({ input, isInTutorial }: MutationtHierarchyInput) =>
    axios.delete<void>(`/hierarchy/delete/${input._id}`, {
      baseURL: isInTutorial ? '/mocks' : '/api',
    })
);
