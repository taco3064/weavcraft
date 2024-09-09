import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';

import NotistackProvider from '../Notistack';
import { withBaseProvider } from './AppSettings.hocs';
import type { AppSettingsProviderProps } from './AppSettings.types';

import {
  AppSettingsContext,
  useContextInit,
  useLanguage,
  usePalette,
} from './AppSettings.hooks';

export default withBaseProvider<AppSettingsProviderProps>(
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
