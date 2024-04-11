/* eslint-disable @typescript-eslint/no-explicit-any */
import _set from 'lodash/set';
import { nanoid } from 'nanoid';

import { getThemePalette } from '../configs';
import { setupTestMock, setupTutorialMock } from '../common';

import type {
  HierarchyData,
  SearchHierarchyParams,
  SuperiorHierarchy,
} from './hierarchy.types';

const setup = {
  '/api': setupTestMock,
  '/mocks': setupTutorialMock,
};

Object.entries(setup).forEach(([baseURL, setupMock]) =>
  setupMock<Record<string, HierarchyData<string, any>>>({}, ({ db, mock }) => {
    mock
      .onGet(new RegExp(`^${baseURL}/hierarchy/superiors/.+$`))
      .reply(async (config) => {
        const result: SuperiorHierarchy[] = [];
        const store = await db.read().then(() => db.data);
        let data = store[config.url?.split('/').pop() as string];

        while (data) {
          const { _id, title, superior } = data;

          result.push({ _id, title });
          data = store[superior as string];
        }

        return [200, result];
      });

    mock.onPost(`${baseURL}/hierarchy/search`).reply(async (config) => {
      const params = JSON.parse(config.data) as SearchHierarchyParams;
      const store = await db.read().then(() => Object.values(db.data));
      const result: HierarchyData<string, any>[] = [];

      for (const data of store) {
        const { category, superior } = data;

        if (
          params.category === category &&
          (params.superior || superior) === superior
        ) {
          result.push({
            ...data,
            ...(params.withPayload &&
              category === 'themes' && {
                payload: await getThemePalette({
                  queryKey: [data._id, baseURL === '/mocks'],
                }),
              }),
          });
        }
      }

      return [200, result];
    });

    mock.onPost(`${baseURL}/hierarchy/create`).reply(async (config) => {
      const input = {
        ...(JSON.parse(config.data) as HierarchyData<string, any>),
        _id: nanoid(),
      };

      await db.update((store) => _set(store, input._id, input));
      await db.write();

      console.log('>>>mock', input);

      return [200, input];
    });
  })
);
