import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import _set from 'lodash/set';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

import NotistackProvider from '../Notistack';
import type { AppProviderManagerProps } from './AppProviderManager.types';

import {
  AppSettingsContext,
  useLanguage,
  usePalette,
} from './AppProviderManager.hooks';

//* Base Configs
let REQ_OVERRIDE_ID: number;
const QUERY_CLIENT = new QueryClient();

//* Provider Component
export default function AppProviderManager({
  children,
  defaultLanguage,
  defaultPalette,
  isTutorialMode,
  token,
}: AppProviderManagerProps) {
  const language = useLanguage(defaultLanguage);
  const { cache, theme, ...palette } = usePalette(defaultPalette);

  useEffect(() => {
    if (token) {
      REQ_OVERRIDE_ID = axios.interceptors.request.use((config) =>
        _set(config, ['headers', 'Authorization'], token)
      );

      return () => axios.interceptors.request.eject(REQ_OVERRIDE_ID);
    }
  }, [token]);

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <NotistackProvider>
            <AppSettingsContext.Provider
              value={{
                ...language,
                ...palette,
                isTutorialMode,
                token,
              }}
            >
              {children}
            </AppSettingsContext.Provider>
          </NotistackProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
