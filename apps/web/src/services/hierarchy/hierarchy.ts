import axios from 'axios';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

import type {
  HierarchyData,
  MutationtHierarchyInput,
  SearchHierarchyParams,
  SuperiorHierarchy,
} from './hierarchy.types';

export const getSuperiorHierarchies = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  SuperiorHierarchy[]
>(
  async function ({ queryKey: [id, isTutorialMode] }) {
    const { data } = await axios.get(`/hierarchy/superiors/${id}`, {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    });

    return data;
  },
  (data) => data.reverse()
);

export const getHierarchyDataById = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  HierarchyData
>(async ({ queryKey: [id, isTutorialMode] }) => {
  const { data } = await axios.get(`/hierarchy/${id}`, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const getHierarchies = withConnRefusedCatch<
  QueryFunctionParams<[string, boolean, string[]]>,
  HierarchyData[]
>(async function ({
  queryKey: [category, withPayload, payloadIds, isTutorialMode],
}) {
  const { data } = await axios.post(
    `/hierarchy/getByPayloadIds`,
    { category, payloadIds, withPayload },
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data;
});

export const searchHierarchies = withConnRefusedCatch<
  QueryFunctionParams<[SearchHierarchyParams]>,
  HierarchyData[]
>(async function ({ queryKey: [params, isTutorialMode] }) {
  const { data } = await axios.post('/hierarchy/search', params, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
}, []);

export const createHierarchyData = withConnRefusedCatch<
  MutationtHierarchyInput,
  HierarchyData
>(async ({ input, isTutorialMode }) => {
  const { data } = await axios.post('/hierarchy/create', input, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const updateHierarchyData = withConnRefusedCatch<
  MutationtHierarchyInput,
  HierarchyData
>(async ({ input, isTutorialMode }) => {
  const { data } = await axios.post('/hierarchy/update', input, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const deleteHierarchyData =
  withConnRefusedCatch<MutationtHierarchyInput>(({ input, isTutorialMode }) =>
    axios.delete(`/hierarchy/delete/${input.id}`, {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    })
  );
