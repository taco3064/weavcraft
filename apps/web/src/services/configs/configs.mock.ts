import { setupTestMock, setupTutorialMock } from '../common';
import type { ThemePalette } from './configs.types';

const setup = {
  '/api': setupTestMock,
  '/mocks': setupTutorialMock,
};

Object.entries(setup).forEach(([baseURL, setupMock]) =>
  setupMock<Record<string, ThemePalette>>({}, ({ db, mock }) => {
    mock
      .onGet(new RegExp(`^${baseURL}/configs/theme-palette/.+$`))
      .reply(async (config) => {
        const data = await db.read().then(() => db.data);

        return [200, data[config.url?.split('/').pop() as string]];
      });
  })
);
