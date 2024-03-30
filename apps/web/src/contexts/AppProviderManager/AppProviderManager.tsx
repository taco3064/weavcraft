import Cookies from 'js-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useImperativeHandle, useMemo, useRef, useState } from 'react';

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
      setLanguage: (language: LanguageCode) =>
        replace({ pathname, query }, asPath, {
          shallow: true,
          locale: language,
        }),
      setPalette: (palette: PaletteCode) => {
        Cookies.set('palette', palette);
        setPalette(palette);
      },
    }),
    [asPath, pathname, query, replace]
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
