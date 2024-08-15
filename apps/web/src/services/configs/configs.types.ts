import Core from '@weavcraft/core';

import type {
  PageLayoutConfigs as BasePageLayoutConfigs,
  ThemePalette,
  WidgetConfigs as BaseWidgetConfigs,
} from '@weavcraft/common';

type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type { ThemePalette };
export type CoreComponent = Exclude<keyof typeof Core, Lowercase<string>>;
export type WidgetSpans = WidgetLayout['spans'];
export type PageLayoutConfigs = Pick<BasePageLayoutConfigs, 'layouts'>;

export type MutationtConfigInput<T> = {
  hierarchyId: string;
  input: T;
  isTutorialMode?: boolean;
};

export interface WidgetConfigs
  extends Pick<BaseWidgetConfigs, 'dataStructure' | 'props'> {
  component: CoreComponent;
}
