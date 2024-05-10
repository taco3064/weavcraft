import axios from 'axios';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

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
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data.reverse();
},
[]);

export const getHierarchyDataById = withConnRefusedCatch(
  async ({ queryKey: [id, isTutorialMode] }: QueryFunctionParams<[string]>) => {
    const { data } = await axios.get<HierarchyData>(`/hierarchy/${id}`, {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    });

    return data;
  }
);

export const getHierarchyData = withConnRefusedCatch(async function <
  P = never
>({
  queryKey: [params, isTutorialMode],
}: QueryFunctionParams<[SearchHierarchyParams]>) {
  const { data } = await axios.post<HierarchyData<P>[]>(
    '/hierarchy/search',
    params,
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data;
},
[]);

export const createHierarchyData = withConnRefusedCatch(
  async ({ input, isTutorialMode }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData>(
      '/hierarchy/create',
      input,
      { baseURL: isTutorialMode ? '/mocks' : '/service' }
    );

    return data;
  }
);

export const updateHierarchyData = withConnRefusedCatch(
  async ({ input, isTutorialMode }: MutationtHierarchyInput) => {
    const { data } = await axios.post<HierarchyData>(
      '/hierarchy/update',
      input,
      { baseURL: isTutorialMode ? '/mocks' : '/service' }
    );

    return data;
  }
);

export const deleteHierarchyData = withConnRefusedCatch(
  ({ input, isTutorialMode }: MutationtHierarchyInput) =>
    axios.delete<void>(`/hierarchy/delete/${input.id}`, {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    })
);
