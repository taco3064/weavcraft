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
  setupMock<Record<string, HierarchyData<string, any>>>(
    'hierarchy',
    {},
    ({ db, mock }) => {
      mock
        .onGet(new RegExp(`^${baseURL}/hierarchy/superiors/.+$`))
        .reply((config) => {
          db.read();

          const result: SuperiorHierarchy[] = [];
          const store = db.data;
          let data = store[config.url?.split('/').pop() as string];

          while (data) {
            const { _id, title, superior } = data;

            result.push({ _id, title });
            data = store[superior as string];
          }

          return [200, result];
        });

      mock.onGet(new RegExp(`^${baseURL}/hierarchy/.+$`)).reply((config) => {
        db.read();

        const store = db.data;
        const data = store[config.url?.split('/').pop() as string];

        return [200, data];
      });

      mock.onPost(`${baseURL}/hierarchy/search`).reply(async (config) => {
        db.read();

        const store = Object.values(db.data);
        const result: HierarchyData<string, any>[] = [];

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
                    queryKey: [data._id, baseURL === '/mocks'],
                  }),
                }),
            });
          }
        }

        return [200, result];
      });

      mock.onPost(`${baseURL}/hierarchy/create`).reply((config) => {
        const input = {
          ...(JSON.parse(config.data) as HierarchyData<undefined>),
          _id: nanoid(),
        };

        db.update((store) => _set(store, input._id, input));
        db.write();

        return [200, input];
      });

      mock.onPost(`${baseURL}/hierarchy/update`).reply((config) => {
        const input = JSON.parse(config.data) as HierarchyData<string>;

        db.update((store) => _set(store, input._id, input));
        db.write();

        return [200, input];
      });

      mock
        .onDelete(new RegExp(`^${baseURL}/hierarchy/delete/.+$`))
        .reply((config) => {
          const id = config.url?.split('/').pop() as string;

          db.update((store) => {
            const list = Object.values(store);

            (function remove(id: string) {
              delete store[id];

              list.forEach(({ _id, superior }) => {
                if (superior === id) {
                  remove(_id);
                }
              });
            })(id);
          });

          db.write();

          return [200];
        });
    }
  )
);
