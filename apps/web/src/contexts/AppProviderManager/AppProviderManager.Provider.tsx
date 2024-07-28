import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import NotistackProvider from '../Notistack';
import { withQueryClientProvider } from './AppProviderManager.hocs';
import type { AppProviderManagerProps } from './AppProviderManager.types';

import {
  AppSettingsContext,
  useContextInit,
  useLanguage,
  usePalette,
} from './AppProviderManager.hooks';

export default withQueryClientProvider<AppProviderManagerProps>(
  function AppProviderManager({
    children,
    defaultLanguage,
    defaultPalette,
    ...props
  }) {
    const language = useLanguage(defaultLanguage);
    const { cache, theme, ...palette } = usePalette(defaultPalette);

    const [tokens, value] = useContextInit({
      ...language,
      ...palette,
      ...props,
    });

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <NotistackProvider>
            <AppSettingsContext.Provider value={value}>
              {tokens ? null : children}
            </AppSettingsContext.Provider>
          </NotistackProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
);
