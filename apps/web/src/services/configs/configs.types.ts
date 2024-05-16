import type { ThemePalette, WidgetConfigs } from '@weavcraft/common';

export type { ThemePalette, WidgetConfigs };

export type MutationtThemePaletteInput = {
  hierarchyId: string;
  input: ThemePalette;
  isTutorialMode?: boolean;
};
