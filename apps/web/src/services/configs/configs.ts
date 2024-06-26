import axios from 'axios';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

import type {
  MutationtConfigInput,
  ThemePalette,
  WidgetConfigs,
} from './configs.types';

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
  queryKey: [hierarchyId, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const { data } = await axios.get<WidgetConfigs>(
    `/configs/widgets/${hierarchyId}`,
    {
      baseURL: isTutorialMode ? '/mocks' : '/service',
    }
  );

  return data;
});

export const upsertThemePalette = withConnRefusedCatch(async function ({
  hierarchyId,
  input,
  isTutorialMode,
}: MutationtConfigInput<ThemePalette>) {
  const { data } = await axios.post<ThemePalette>(
    `/configs/themes/${hierarchyId}`,
    input,
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data;
});

export const upsertWidgetConfig = withConnRefusedCatch(async function ({
  hierarchyId,
  input,
  isTutorialMode,
}: MutationtConfigInput<WidgetConfigs>) {
  const { data } = await axios.post<WidgetConfigs>(
    `/configs/widgets/${hierarchyId}`,
    input,
    { baseURL: isTutorialMode ? '/mocks' : '/service' }
  );

  return data;
});
