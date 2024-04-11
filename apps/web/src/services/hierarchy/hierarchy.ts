import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type { QueryFunctionParams } from '../common';

import type {
  HierarchyData,
  MutationtHierarchyInput,
  SearchHierarchyParams,
  SuperiorHierarchy,
} from './hierarchy.types';

export const getSuperiorHierarchies = withConnRefusedCatch(async function ({
  queryKey: [id, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const { data } = await axios.get<SuperiorHierarchy[]>(
    `/hierarchy/superiors/${id}`,
    { baseURL: isTutorialMode ? '/mocks' : '/api' }
  );

  return data.reverse();
},
[]);

export const getHierarchyData = withConnRefusedCatch(async function <
  P = never
>({
  queryKey: [params, isTutorialMode],
}: QueryFunctionParams<[SearchHierarchyParams]>) {
  const { data } = await axios.post<HierarchyData<string, P>[]>(
    '/hierarchy/search',
    params,
    { baseURL: isTutorialMode ? '/mocks' : '/api' }
  );

  return data;
},
[]);

export const createHierarchyData = withConnRefusedCatch(
  async ({ input, isTutorialMode }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData<string>>(
      '/hierarchy/create',
      input,
      { baseURL: isTutorialMode ? '/mocks' : '/api' }
    );

    return data;
  }
);

export const updateHierarchyData = withConnRefusedCatch(
  async ({ input, isTutorialMode }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData<string>>(
      '/hierarchy/update',
      input,
      { baseURL: isTutorialMode ? '/mocks' : '/api' }
    );

    return data;
  }
);

export const deleteHierarchyData = withConnRefusedCatch(
  ({ input, isTutorialMode }: MutationtHierarchyInput) =>
    axios.delete<void>(`/hierarchy/delete/${input._id}`, {
      baseURL: isTutorialMode ? '/mocks' : '/api',
    })
);
