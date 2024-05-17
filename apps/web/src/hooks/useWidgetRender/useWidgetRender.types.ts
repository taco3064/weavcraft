import type { ComponentType } from 'react';
import type { WidgetConfigs } from '~web/services';

export type RenderConfig = Partial<Pick<WidgetConfigs, 'widget' | 'props'>>;

export type RenderFn = <P extends object>(
  WidgetEl: ComponentType<P>,
  options: {
    key?: number;
    props: P;
    config: RenderConfig;
  }
) => JSX.Element;
