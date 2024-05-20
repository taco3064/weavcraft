import type { ComponentType } from 'react';
import type { WidgetConfigs } from '~web/services';

export type RenderConfig = Pick<WidgetConfigs, 'widget' | 'props'>;

export type GenerateOptions = {
  key?: number;
  paths?: (string | number)[];
};

export type RenderFn = <P extends object>(
  WidgetEl: ComponentType<P>,
  options: {
    key?: number;
    props: P;
    config: RenderConfig;
    paths: (string | number)[];
  }
) => JSX.Element;