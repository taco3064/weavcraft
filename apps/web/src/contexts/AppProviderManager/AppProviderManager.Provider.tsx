import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

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
    const { data: session, status } = useSession();
    const { cache, theme, ...palette } = usePalette(session?.palette);

    const language = useLanguage(session?.language);

    const [isPending, value] = useContextInit(status, {
      ...language,
      ...palette,
      isTutorialMode,
    });

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
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
