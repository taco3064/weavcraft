import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <NotistackProvider>
              <AppSettingsContext.Provider value={value}>
                {isPending ? null : children}
              </AppSettingsContext.Provider>
            </NotistackProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
);
