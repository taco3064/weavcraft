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

    mock
      .onGet(new RegExp(`^${baseURL}/hierarchy/.+$`))
      .reply(async (config) => {
        const store = await db.read().then(() => db.data);
        const data = store[config.url?.split('/').pop() as string];

        return [200, data];
      });

    mock.onPost(`${baseURL}/hierarchy/search`).reply(async (config) => {
      const store = await db.read().then(() => Object.values(db.data));
      const result: HierarchyData<string, any>[] = [];

      const { keyword, ...params } = JSON.parse(
        config.data
      ) as SearchHierarchyParams;

      for (const data of store) {
        const { category, superior, title, description } = data;

        if (
          params.category === category &&
          ((!keyword && (params.superior || superior) === superior) ||
            (keyword && `${title} ${description}`.includes(keyword)))
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
        ...(JSON.parse(config.data) as HierarchyData<undefined>),
        _id: nanoid(),
      };

      await db.update((store) => _set(store, input._id, input));
      await db.write();

      return [200, input];
    });

    mock.onPost(`${baseURL}/hierarchy/update`).reply(async (config) => {
      const input = JSON.parse(config.data) as HierarchyData<string>;

      await db.update((store) => _set(store, input._id, input));
      await db.write();

      return [200, input];
    });

    mock
      .onDelete(new RegExp(`^${baseURL}/hierarchy/delete/.+$`))
      .reply(async (config) => {
        const id = config.url?.split('/').pop() as string;

        await db.update((store) => {
          delete store[id];
        });

        await db.write();

        return [200];
      });
  })
);
