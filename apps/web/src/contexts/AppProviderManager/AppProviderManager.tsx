import Cookies from 'js-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import NotistackProvider from '../Notistack';
import ThemeProvider from '~web/themes';
import { PALETTES, type PaletteCode } from '~web/themes';
import { AppSettingsContext } from './AppProviderManager.hooks';

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
}: AppProviderManagerProps) {
  const { i18n } = useTranslation();
  const { locale, locales, pathname, query, asPath, replace } = useRouter();
  const setterRef = useRef<SetterFns>();

  const [palette, setPalette] = useState<PaletteCode>(
    (Cookies.get('palette') || 'WEAVCRAFT') as PaletteCode
  );

  const value = useMemo<AppSettingsContextValue>(
    () => ({
      language: locale as LanguageCode,
      languages: locales as LanguageCode[],
      palette,
      palettes: Object.keys(PALETTES) as PaletteCode[],
      setterRef,
    }),
    [locale, locales, palette]
  );

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
      setPalette: (palette: PaletteCode) => {
        Cookies.set('palette', palette);
        setPalette(palette);
      },
    }),
    [asPath, i18n, pathname, query, replace]
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider palette={palette}>
        <NotistackProvider>
          <AppSettingsContext.Provider value={value}>
            {children}
          </AppSettingsContext.Provider>
        </NotistackProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
