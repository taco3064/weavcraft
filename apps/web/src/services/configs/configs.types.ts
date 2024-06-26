import Core from '@weavcraft/core';

import type {
  ThemePalette,
  WidgetConfigs as BaseWidgetConfigs,
} from '@weavcraft/common';

export type { ThemePalette };
export type CoreComponent = Exclude<keyof typeof Core, Lowercase<string>>;

export type MutationtConfigInput<T> = {
  hierarchyId: string;
  input: T;
  isTutorialMode?: boolean;
};

export interface WidgetConfigs
  extends Pick<BaseWidgetConfigs, 'dataStructure' | 'props'> {
  component: CoreComponent;
}
