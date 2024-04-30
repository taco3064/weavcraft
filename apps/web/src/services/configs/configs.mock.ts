import _set from 'lodash/set';
import { nanoid } from 'nanoid';

import { setupTestMock, setupTutorialMock } from '../common';
import type { HierarchyData } from '../hierarchy/hierarchy.types';
import type { ThemePalette } from './configs.types';

const setup = {
  '/service': setupTestMock,
  '/mocks': setupTutorialMock,
};

Object.entries(setup).forEach(([baseURL, setupMock]) => {
  setupMock('themes', {}, ({ mock, getDb }) => {
    mock.onGet(new RegExp(`^${baseURL}/configs/themes/.+$`)).reply((config) => {
      const hierarchyId = config.url?.split('/').pop() as string;
      const hierarchyDb = getDb<HierarchyData>('hierarchy');
      const themesDb = getDb<ThemePalette>('themes');

      hierarchyDb.read();
      themesDb.read();

      return [
        200,
        themesDb.data[hierarchyDb.data[hierarchyId]?.payloadId as string],
      ];
    });

    mock
      .onPost(new RegExp(`^${baseURL}/configs/themes/.+$`))
      .reply((config) => {
        const hierarchyId = config.url?.split('/').pop() as string;
        const input = JSON.parse(config.data) as ThemePalette;
        const hierarchyDb = getDb<HierarchyData>('hierarchy');
        const themesDb = getDb<ThemePalette>('themes');

        hierarchyDb.update((hierarchyStore) => {
          const payloadId = hierarchyStore[hierarchyId]?.payloadId || nanoid();

          _set(hierarchyStore, [hierarchyId, 'payloadId'], payloadId);

          themesDb.update((themesStore) => {
            _set(themesStore, payloadId, { ...input, id: payloadId });
          });
        });

        themesDb.write();
        hierarchyDb.write();

        return [200, input];
      });
  });
});
