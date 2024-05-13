import axios from 'axios';

import { withConnRefusedCatch, type QueryFunctionParams } from '../common';
import type { MutationtThemePaletteInput, ThemePalette } from './configs.types';

export const getThemePalette = withConnRefusedCatch(async function ({
  queryKey: [hierarchyId, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const { data } = await axios.get<ThemePalette>(
    `/configs/themes/${hierarchyId}`,
    {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    }
  );

  return data;
});

export const getWidgetConfigs = withConnRefusedCatch(async function ({
  queryKey: [id, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  return {};
});

export const upsertThemePalette = withConnRefusedCatch(async function ({
  hierarchyId,
  input,
  isTutorialMode,
}: MutationtThemePaletteInput) {
  const { data } = await axios.post<ThemePalette>(
    `/configs/themes/${hierarchyId}`,
    input,
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data;
});
