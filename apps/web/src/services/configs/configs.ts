import axios from 'axios';
import { withConnRefusedCatch } from '../common';

import type { GetThemePaletteParams, ThemePalette } from './configs.types';

export const getThemePalette = withConnRefusedCatch(async function ({
  queryKey: [id, isInTutorial],
}: GetThemePaletteParams) {
  const { data } = await axios.get<ThemePalette>(
    `/configs/theme-palette/${id}`,
    { baseURL: isInTutorial ? '/mocks' : '/api' }
  );

  return data;
});
