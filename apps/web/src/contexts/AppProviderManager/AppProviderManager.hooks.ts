import { createContext, createRef, useContext } from 'react';

import { PALETTES, type PaletteCode } from '~web/themes';
import type {
  AppSettingsContextValue,
  SetterFns,
} from './AppProviderManager.types';

//* Custom Hooks
export const AppSettingsContext = createContext<AppSettingsContextValue>({
  language: __WEBPACK_DEFINE__.I18N.defaultLocale,
  palette: 'WEAVCRAFT',
  languages: __WEBPACK_DEFINE__.I18N.locales,
  palettes: Object.keys(PALETTES) as PaletteCode[],
  setterRef: createRef<SetterFns>(),
});

export function useAppSettings() {
  const { language, languages, palette, palettes, setterRef } =
    useContext(AppSettingsContext);

  return {
    language,
    languages,
    palette,
    palettes,
    setLanguage: setterRef.current?.setLanguage,
    setPalette: setterRef.current?.setPalette,
  };
}
