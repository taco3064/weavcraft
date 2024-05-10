import type { ThemePalette } from '@weavcraft/common';

export type { ThemePalette };

export type MutationtThemePaletteInput = {
  hierarchyId: string;
  input: ThemePalette;
  isTutorialMode?: boolean;
};
