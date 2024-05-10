export {
  default,
  default as AppProviderManager,
} from './AppProviderManager.Provider';

export { makePerPageLayout } from './AppProviderManager.hocs';

export {
  useAppSettings,
  usePalettePreview,
  useTutorialMode,
} from './AppProviderManager.hooks';

export type {
  AppProps,
  LanguageCode,
  PaletteCode,
} from './AppProviderManager.types';
