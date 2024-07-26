import Core from '@weavcraft/core';

import type {
  PageLayoutConfigs,
  ThemePalette,
  WidgetConfigs as BaseWidgetConfigs,
} from '@weavcraft/common';

type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type { PageLayoutConfigs, ThemePalette };
export type CoreComponent = Exclude<keyof typeof Core, Lowercase<string>>;
export type WidgetSize = WidgetLayout['size'];

export type MutationtConfigInput<T> = {
  hierarchyId: string;
  input: T;
  isTutorialMode?: boolean;
};

export interface WidgetConfigs
  extends Pick<BaseWidgetConfigs, 'dataStructure' | 'props'> {
  component: CoreComponent;
}
