import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type { QueryFunctionParams } from '../common';
import type { ThemePalette } from './configs.types';

export const getThemePalette = withConnRefusedCatch(async function ({
  queryKey: [id, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const { data } = await axios.get<ThemePalette>(
    `/configs/theme-palette/${id}`,
    { baseURL: isTutorialMode ? '/mocks' : '/api' }
  );

  return data;
});
