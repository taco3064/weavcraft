import type { ConfigPaths, ComponentConfig } from '../useWidgetRender';
import type { GetCorePropsFn, WidgetConfigs } from '../imports.types';

export interface GetterOptions {
  getCoreProps: GetCorePropsFn;
  getNode: (widget: WidgetConfigs, paths: ConfigPaths) => ComponentConfig;
}

export interface ParentStoreNode {
  node: ComponentConfig;
  paths: ConfigPaths;
}
