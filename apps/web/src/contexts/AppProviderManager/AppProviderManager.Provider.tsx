import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';

import NotistackProvider from '../Notistack';
import type { AppProviderManagerProps } from './AppProviderManager.types';

import {
  AppSettingsContext,
  useLanguage,
  usePalette,
} from './AppProviderManager.hooks';

//* Base Configs
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
