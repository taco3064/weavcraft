import _set from 'lodash/set';
import { nanoid } from 'nanoid';

import { Mock, getMockData } from '../common';
import type { HierarchyData } from '../hierarchy/hierarchy.types';
import type { ThemePalette, WidgetConfigs } from './configs.types';

const setup = {
  '/service': Mock.setupTesting,
  '/mocks': Mock.setupTutorial,
};

Object.entries(setup).forEach(([baseURL, setupMock]) => {
  setupMock('themes', {}, ({ mock, getDb }) => {
    mock.onGet(new RegExp(`^${baseURL}/configs/themes/.+$`)).reply((config) => {
      const hierarchyId = config.url?.split('/').pop() as string;
      const hierarchyDb = getDb<HierarchyData>('hierarchy');
      const themesDb = getDb<ThemePalette>('themes');

      hierarchyDb.read();
      themesDb.read();

      return getMockData(
        themesDb.data[hierarchyDb.data[hierarchyId]?.payloadId as string]
      );
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

        return getMockData(input);
      });
  });

  setupMock('widgets', {}, ({ mock, getDb }) => {
    mock
      .onGet(new RegExp(`^${baseURL}/configs/widgets/.+$`))
      .reply((config) => {
        const hierarchyId = config.url?.split('/').pop() as string;
        const hierarchyDb = getDb<HierarchyData>('hierarchy');
        const widgetsDb = getDb<WidgetConfigs>('widgets');

        hierarchyDb.read();
        widgetsDb.read();

        return getMockData(
          widgetsDb.data[hierarchyDb.data[hierarchyId]?.payloadId as string]
        );
      });

    mock
      .onPost(new RegExp(`^${baseURL}/configs/widgets/.+$`))
      .reply((config) => {
        const hierarchyId = config.url?.split('/').pop() as string;
        const input = JSON.parse(config.data) as WidgetConfigs;
        const hierarchyDb = getDb<HierarchyData>('hierarchy');
        const widgetsDb = getDb<WidgetConfigs>('widgets');

        hierarchyDb.update((hierarchyStore) => {
          const payloadId = hierarchyStore[hierarchyId]?.payloadId || nanoid();

          _set(hierarchyStore, [hierarchyId, 'payloadId'], payloadId);

          widgetsDb.update((widgetStore) => {
            _set(widgetStore, payloadId, { ...input, id: payloadId });
          });
        });

        widgetsDb.write();
        hierarchyDb.write();

        return getMockData(input);
      });
  });
});
