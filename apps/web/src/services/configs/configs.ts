import axios from 'axios';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

import type {
  MutationtConfigInput,
  PageLayoutConfigs,
  ThemePalette,
  WidgetConfigs,
} from './configs.types';

export const getThemePalette = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  ThemePalette
>(async function ({ queryKey: [hierarchyId, isTutorialMode] }) {
  const { data } = await axios.get(`/configs/themes/${hierarchyId}`, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const getWidgetConfigs = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  WidgetConfigs
>(async function ({ queryKey: [hierarchyId, isTutorialMode] }) {
  const { data } = await axios.get(`/configs/widgets/${hierarchyId}`, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const getPageLayouts = withConnRefusedCatch<
  QueryFunctionParams<[string]>,
  PageLayoutConfigs
>(async function ({ queryKey: [hierarchyId, isTutorialMode] }) {
  const { data } = await axios.get(`/configs/pages/${hierarchyId}`, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const upsertThemePalette = withConnRefusedCatch<
  MutationtConfigInput<ThemePalette>,
  ThemePalette
>(async function ({ hierarchyId, input, isTutorialMode }) {
  const { data } = await axios.post(`/configs/themes/${hierarchyId}`, input, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const upsertWidgetConfig = withConnRefusedCatch<
  MutationtConfigInput<WidgetConfigs>,
  WidgetConfigs
>(async function ({ hierarchyId, input, isTutorialMode }) {
  const { data } = await axios.post(`/configs/widgets/${hierarchyId}`, input, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});

export const upsertPageLayouts = withConnRefusedCatch<
  MutationtConfigInput<PageLayoutConfigs>,
  PageLayoutConfigs
>(async function ({ hierarchyId, input, isTutorialMode }) {
  const { data } = await axios.post(`/configs/pages/${hierarchyId}`, input, {
    baseURL: isTutorialMode ? '/mocks' : '/service',
  });

  return data;
});
