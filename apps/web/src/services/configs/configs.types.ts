import Core from '@weavcraft/core';

import type {
  ThemePalette,
  WidgetConfigs as BaseWidgetConfigs,
} from '@weavcraft/common';

export type { ThemePalette };
export type WidgetType = Exclude<keyof typeof Core, 'FaIcon'>;

export type MutationtThemePaletteInput = {
  hierarchyId: string;
  input: ThemePalette;
  isTutorialMode?: boolean;
};

export interface WidgetConfigs extends Omit<BaseWidgetConfigs, 'widget'> {
  widget: WidgetType;
}
