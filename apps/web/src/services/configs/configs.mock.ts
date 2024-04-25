import _set from 'lodash/set';

import { setupTestMock, setupTutorialMock } from '../common';
import type { ThemePalette } from './configs.types';

const setup = {
  '/api': setupTestMock,
  '/mocks': setupTutorialMock,
};

Object.entries(setup).forEach(([baseURL, setupMock]) =>
  setupMock<Record<string, ThemePalette>>('configs', {}, ({ db, mock }) => {
    mock
      .onGet(new RegExp(`^${baseURL}/configs/theme-palette/.+$`))
      .reply((config) => {
        db.read();

        const data = db.data;

        return [200, data[config.url?.split('/').pop() as string]];
      });

    mock.onPost('/configs/theme-palette').reply((config) => {
      const input = JSON.parse(config.data) as ThemePalette;

      db.update((store) => _set(store, input.id, input));
      db.write();

      return [200, input];
    });
  })
);
