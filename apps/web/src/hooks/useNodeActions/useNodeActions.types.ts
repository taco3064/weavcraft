import type { ConfigPaths, ComponentConfig } from '../useWidgetRender';
import type { CoreComponent, WidgetConfigs } from '../imports.types';

type NodeCreateVariant = 'action' | 'node';
export type GetChildNodesFn = (node: ComponentConfig) => ComponentConfig[];

export type GetNodeFn = (
  widget: WidgetConfigs,
  paths: ConfigPaths
) => ComponentConfig;

export type GetParentNodeFn = (
  widget: WidgetConfigs,
  paths: ConfigPaths,
  filter?: GetterOptions['filter']
) => ComponentConfig | null;

export interface CreateNodeEvents {
  onAddChild: (
    config: ComponentConfig,
    path: string,
    component: CoreComponent
  ) => void;

  onAddLastChild: (
    config: ComponentConfig,
    path: string,
    component: CoreComponent
  ) => void;
}

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

export interface CreateNodeButtonProps {
  config?: ComponentConfig;
  path?: string;
  variant: NodeCreateVariant;
  onCreate: (component: CoreComponent) => void;
}
