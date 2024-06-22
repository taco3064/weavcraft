import type { ConfigPaths, RenderConfig } from '../useWidgetRender';
import type { GetDefinitionFn, WidgetConfigs } from '../imports.types';

export interface GetterOptions {
  getCoreProps: GetDefinitionFn;
  getNode: (widget: WidgetConfigs, paths: ConfigPaths) => RenderConfig;
}

export interface ParentStoreNode {
  node: RenderConfig;
  paths: ConfigPaths;
}
