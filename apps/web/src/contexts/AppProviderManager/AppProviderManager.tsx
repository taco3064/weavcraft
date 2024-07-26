import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';

import AppSettingsProvider from './AppProviderManager.Provider';
import NotistackProvider from '../Notistack';
import { useLanguage, usePalette } from './AppProviderManager.hooks';

import type {
  AppProviderManagerProps,
  MakePerPageLayout,
} from './AppProviderManager.types';

//* Base Configs
const QUERY_CLIENT = new QueryClient();

//* HOC
export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};

//* Main Component
export default function AppProviderManager({
  accessToken,
  children,
  defaultLanguage,
  defaultPalette,
  isTutorialMode,
  refreshToken,
}: AppProviderManagerProps) {
  const { language, languages, setLanguage } = useLanguage(defaultLanguage);

  const { cache, theme, palette, palettes, setPalette } =
    usePalette(defaultPalette);

  const value = useMemo(
    () => ({
      accessToken,
      isTutorialMode,
      language,
      languages,
      palette,
      palettes,
      refreshToken,
      setLanguage,
      setPalette,
    }),
    [
      accessToken,
      isTutorialMode,
      language,
      languages,
      palette,
      palettes,
      refreshToken,
      setLanguage,
      setPalette,
    ]
  );

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <NotistackProvider>
            <AppSettingsProvider value={value}>{children}</AppSettingsProvider>
          </NotistackProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
