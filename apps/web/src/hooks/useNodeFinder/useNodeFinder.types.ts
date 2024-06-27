import type { ConfigPaths, ComponentConfig } from '../useWidgetRender';
import type { WidgetConfigs } from '../imports.types';

export type GetNodeFn = (
  widget: WidgetConfigs,
  paths: ConfigPaths
) => ComponentConfig;

export type GetParentNodeFn = (
  widget: WidgetConfigs,
  paths: ConfigPaths,
  filter?: GetterOptions['filter']
) => ComponentConfig | null;

export type GetChildNodesFn = (node: ComponentConfig) => ComponentConfig[];

export interface GetterOptions {
  filter?: (node: ComponentConfig) => boolean;
  getNode: GetNodeFn;
}

export interface ParentNode {
  node: ComponentConfig;
  paths: ConfigPaths;
}

export type NodeFinderHookReturn = {
  getNode: GetNodeFn;
  getParentNode: GetParentNodeFn;
  getParentStoreNode: GetParentNodeFn;
  getChildNodes: GetChildNodesFn;
};
