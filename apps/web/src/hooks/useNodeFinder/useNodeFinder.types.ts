import type { ConfigPaths, RenderConfig } from '../useWidgetRender';
import type { GetCorePropsFn, WidgetConfigs } from '../imports.types';

export interface GetterOptions {
  getCoreProps: GetCorePropsFn;
  getNode: (widget: WidgetConfigs, paths: ConfigPaths) => RenderConfig;
}

export interface ParentStoreNode {
  node: RenderConfig;
  paths: ConfigPaths;
}
