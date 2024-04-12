import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { useImperativeHandle, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import NotistackProvider from '../Notistack';
import { PALETTES, type PaletteCode } from '~web/themes';
import { AppSettingsContext, usePalette } from './AppProviderManager.hooks';

import type {
  AppProviderManagerProps,
  AppSettingsContextValue,
  LanguageCode,
  SetterFns,
} from './AppProviderManager.types';

//* Base Configs
const client = new QueryClient();

//* Provider Component
export default function AppProviderManager({
  children,
  isTutorialMode,
}: AppProviderManagerProps) {
  const setterRef = useRef<SetterFns>();

  const { i18n } = useTranslation();
  const { locale, locales, pathname, query, asPath, replace } = useRouter();
  const [{ cache, palette, theme }, setPalette] = usePalette();

  const context = useMemo<AppSettingsContextValue>(
    () => ({
      isTutorialMode,
      language: locale as LanguageCode,
      languages: locales as LanguageCode[],
      palette,
      palettes: Object.keys(PALETTES) as PaletteCode[],
      setterRef,
    }),
    [isTutorialMode, locale, locales, palette]
  );

  //* Sync Setter Functions
  useImperativeHandle(
    setterRef,
    () => ({
      setLanguage: async (language: LanguageCode) => {
        await replace({ pathname, query }, asPath, {
          shallow: true,
          locale: language,
        });

        i18n.changeLanguage(language);
      },
      setPalette,
    }),
    [asPath, i18n, pathname, query, replace, setPalette]
  );

  return (
    <QueryClientProvider client={client}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <NotistackProvider>
            <AppSettingsContext.Provider value={context}>
              {children}
            </AppSettingsContext.Provider>
          </NotistackProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
