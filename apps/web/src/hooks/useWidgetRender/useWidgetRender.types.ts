import type { ComponentType } from 'react';
import type { WidgetConfigs } from '../imports.types';

export type ConfigPaths = (string | number)[];
export type DataFields = NonNullable<WidgetConfigs['dataStructure']>;
export type ComponentConfig = Pick<WidgetConfigs, 'component' | 'props'>;

export type GenerateOptions = {
  key?: number;
  paths?: ConfigPaths;
};

export type RenderFn = <P extends object>(
  WidgetEl: ComponentType<P>,
  options: {
    key?: number;
    props: P;
    config: ComponentConfig;
    paths: ConfigPaths;
  }
) => JSX.Element;
