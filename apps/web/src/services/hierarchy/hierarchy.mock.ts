/* eslint-disable @typescript-eslint/no-explicit-any */
import _set from 'lodash/set';
import { nanoid } from 'nanoid';

import { Mock, getMockData } from '../common';
import { getThemePalette } from '../configs/configs';

import type {
  HierarchyData,
  SearchHierarchyParams,
  SuperiorHierarchy,
} from './hierarchy.types';

const setup = {
  '/service': Mock.setupTesting,
  '/mocks': Mock.setupTutorial,
};

Object.entries(setup).forEach(([baseURL, setupMock]) =>
  setupMock('hierarchy', {}, ({ mock, getDb }) => {
    mock
      .onGet(new RegExp(`^${baseURL}/hierarchy/superiors/.+$`))
      .reply((config) => {
        const hierarchyDb = getDb<HierarchyData>('hierarchy');
        const result: SuperiorHierarchy[] = [];

        hierarchyDb.read();

        (function get(superior: string) {
          const data = hierarchyDb.data[superior];

          if (data) {
            const { id, title, superior } = data;

            result.push({ id, title });
            get(superior as string);
          }
        })(config.url?.split('/').pop() as string);

        return getMockData(result);
      });

    mock.onGet(new RegExp(`^${baseURL}/hierarchy/.+$`)).reply((config) => {
      const hierarchyDb = getDb<HierarchyData>('hierarchy');
      const id = config.url?.split('/').pop() as string;

      hierarchyDb.read();

      return getMockData(hierarchyDb.data[id]);
    });

    mock.onPost(`${baseURL}/hierarchy/search`).reply(async (config) => {
      const hierarchyDb = getDb<HierarchyData>('hierarchy');

      hierarchyDb.read();

      const store = Object.values(hierarchyDb.data);
      const result: HierarchyData<any>[] = [];

      const { keyword, ...params } = JSON.parse(
        config.data
      ) as SearchHierarchyParams;

      for (const data of store) {
        const { category, superior, title, description } = data;

        if (
          params.category === category &&
          ((!keyword &&
            ((!params.superior && !superior) ||
              (params.superior && params.superior === superior))) ||
            (keyword && `${title} ${description}`.includes(keyword)))
        ) {
          result.push({
            ...data,
            ...(params.withPayload &&
              category === 'themes' && {
                payload: await getThemePalette({
                  queryKey: [data.id, baseURL === '/mocks'],
                }),
              }),
          });
        }
      }

      return getMockData(result);
    });

    mock.onPost(`${baseURL}/hierarchy/create`).reply((config) => {
      const hierarchyDb = getDb<HierarchyData>('hierarchy');

      const input: HierarchyData = {
        ...(JSON.parse(config.data) as HierarchyData),
        id: nanoid(),
      };

      hierarchyDb.update((store) => _set(store, input.id, input));
      hierarchyDb.write();

      return getMockData(input);
    });

    mock.onPost(`${baseURL}/hierarchy/update`).reply((config) => {
      const hierarchyDb = getDb<HierarchyData>('hierarchy');
      const input = JSON.parse(config.data) as HierarchyData;

      hierarchyDb.update((store) => _set(store, input.id, input));
      hierarchyDb.write();

      return getMockData(input);
    });

    mock
      .onDelete(new RegExp(`^${baseURL}/hierarchy/delete/.+$`))
      .reply((config) => {
        const hierarchyDb = getDb<HierarchyData>('hierarchy');
        const id = config.url?.split('/').pop() as string;

        hierarchyDb.update((store) => {
          const list = Object.values(store);

          (function remove(targetId: string) {
            delete store[targetId];

            list.forEach(({ id, superior }) => {
              if (superior === targetId) {
                remove(id);
              }
            });
          })(id);
        });

        hierarchyDb.write();

        return getMockData(undefined);
      });
  })
);
