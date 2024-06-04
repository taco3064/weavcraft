/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, type ReactNode } from 'react';
import type { ContainerProps } from '@mui/material/Container';
import type { Get } from 'type-fest';
import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses, EditorListProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';

import type {
  PrimitiveValuePropsWithPath,
  WidgetConfigs,
  WidgetType,
} from '~web/services';

type ConfigProps = DataBindingProp | PrimitiveValueProp;

export const ControllerProps = Symbol('ControllerProps');
export type ChildrenArray = ReturnType<typeof Children.toArray>;
export type ConfigType = ConfigProps['type'];

type PrimitiveProps = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

export interface NodePaths {
  nodePaths: string[];
  onWidgetChildrenGenerate: WidgetChildrenGenerateFn;
  onPathsGenerate: PathsGenerateFn;
}

interface StructureEvent {
  target: RenderConfig;
  paths: ConfigPaths;
}

type WidgetChildrenGenerateFn = (config: RenderConfig) => RenderConfig[];

type PathsGenerateFn = (
  nodePath: string,
  index: number,
  paths?: ConfigPaths
) => ConfigPaths;

type ConfigChangeHandler<V extends ConfigProps = ConfigProps> = (
  config: RenderConfig,
  propPath: string,
  propValue?: V
) => void;

/** @deprecated */
export type NodeItemsRenderFn = (options: {
  classes: EditorListClasses;
  isMultiple: boolean;
  nodePath: string;
  widgets: RenderConfig[];
  getChildWidgets: WidgetChildrenGenerateFn;
  getPaths: PathsGenerateFn;
}) => ReactNode;

export interface ChangeEvents {
  onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => void;
  onConfigChange: ConfigChangeHandler;
  onDeleteNode: (paths: ConfigPaths) => void;

  onAddLastChild: (
    config: RenderConfig,
    path: string,
    widget: WidgetType
  ) => void;
}

//* Style Params Types
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;

//* Component Prop Types
type EditorListCloseHandlerProps = Pick<EditorListProps, 'onClose'>;

export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface NodeCreateButtonProps {
  path?: string;
  variant: 'action' | 'node';
  widgetId?: WidgetType;
  onClick: (widget: WidgetType) => void;
}

export type NodeActionProps<P extends string = 'paths'> = Record<
  P,
  ConfigPaths
> & {
  config: RenderConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface NodeListProps
  extends EditorListCloseHandlerProps,
    NodeActionProps<'active'> {
  onActive: (e: ConfigPaths) => void;
}

export interface SettingTabsProps
  extends EditorListCloseHandlerProps,
    Pick<NodeActionProps, 'paths'> {
  config?: RenderConfig;
  onChange: ConfigChangeHandler;
}

export interface NodeItemProps
  extends Pick<NodeListProps, 'active' | 'onActive' | 'onDelete' | 'onEdit'> {
  classes: EditorListClasses;
  isMultiple: boolean;
  path: string;
  widgets: RenderConfig[];
  onPathsGenerate: PathsGenerateFn;
  onWidgetChildrenGenerate: WidgetChildrenGenerateFn;
}

export interface PrimitiveItemProps {
  classes: EditorListClasses;
  config?: RenderConfig;
  path: string;
  proptypes: PrimitiveProps;
  value?: any;
  onChange: ConfigChangeHandler<PrimitiveValueProp>;
}
