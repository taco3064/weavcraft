import type { AppProps as NextAppProps } from 'next/app';

import type {
  HierarchyData,
  LanguageCode,
  NextPageWithLayout,
  PaletteCode,
  SuperiorHierarchy,
} from './imports.types';

export interface AppProps extends NextAppProps {
  Component: NextPageWithLayout;
  defaultLanguage: LanguageCode;
  defaultPalette?: PaletteCode;
  token?: string;
}

export interface BaseHierarchyProps<P = never> {
  group?: string;
  initialData: HierarchyData<P>[];
  initialSuperiors: SuperiorHierarchy[];
}
