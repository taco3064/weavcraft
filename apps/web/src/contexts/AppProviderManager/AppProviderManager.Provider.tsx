import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import NotistackProvider from '../Notistack';
import { withBaseProvider } from './AppProviderManager.hocs';
import type { AppProviderManagerProps } from './AppProviderManager.types';

import {
  AppSettingsContext,
  useContextInit,
  useLanguage,
  usePalette,
} from './AppProviderManager.hooks';

export default withBaseProvider<AppProviderManagerProps>(
  function AppProviderManager({ children, isTutorialMode }) {
    const language = useLanguage();
    const palette = usePalette();

    const [isPending, value] = useContextInit({
      ...language,
      ...palette,
      isTutorialMode,
    });

    return (
      <CacheProvider value={palette.cache}>
        <ThemeProvider theme={palette.theme}>
          <CssBaseline />

          <NotistackProvider>
            <AppSettingsContext.Provider value={value}>
              {isPending ? null : children}
            </AppSettingsContext.Provider>
          </NotistackProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
);
