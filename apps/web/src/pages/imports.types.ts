import type { AppProps as NextAppProps } from 'next/app';

import type { HierarchyData, SuperiorHierarchy } from '~web/services';
import type { LanguageCode, NextPageWithLayout } from '~web/contexts';
import type { PaletteCode } from '~web/themes';

export type * from '~web/components';
export type * from '~web/containers';
export type * from '~web/contexts';
export type * from '~web/hooks';
export type * from '~web/services';
export type * from '~web/themes';

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
