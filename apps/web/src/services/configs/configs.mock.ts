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
  })
);
