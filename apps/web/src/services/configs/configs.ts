import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type { QueryFunctionParams } from '../common';
import type { MutationtThemePaletteInput, ThemePalette } from './configs.types';

export const getThemePalette = withConnRefusedCatch(async function ({
  queryKey: [id, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const { data } = await axios.get<ThemePalette>(
    `/configs/theme-palette/${id}`,
    { baseURL: isTutorialMode ? '/mocks' : '/api' }
  );

  return data;
});

export const upsertThemePalette = withConnRefusedCatch(async function ({
  input,
  isTutorialMode,
}: MutationtThemePaletteInput) {
  const { data } = await axios.post<ThemePalette>(
    '/configs/theme-palette',
    input,
    {
      baseURL: isTutorialMode ? '/mocks' : '/api',
    }
  );

  return data;
});
