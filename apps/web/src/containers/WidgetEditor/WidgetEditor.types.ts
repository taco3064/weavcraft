import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { PortalContainerEl } from '~web/contexts';
import type { WidgetConfigs, WidgetType } from '~web/services';

export const ControllerProps = Symbol('ControllerProps');
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;

type StructureEvent = {
  target: RenderConfig;
  paths: ConfigPaths;
};

export type GetPathsFn = (
  nodePath: string,
  index: number,
  paths?: ConfigPaths
) => ConfigPaths;

export type StructureItemsRenderFn = (options: {
  isMultiple: boolean;
  nodePath: string;
  widgets: RenderConfig[];
  getPaths: GetPathsFn;
}) => ReactNode;

export interface ChangeEvents {
  onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => void;
  onDeleteNode: (paths: ConfigPaths) => void;

  onAddLastChild: (
    config: RenderConfig,
    path: string,
    widget: WidgetType
  ) => void;
}

//* Component Prop Types
export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface AppendNodeProps {
  path?: string;
  variant: 'action' | 'node';
  widgetId?: WidgetType;
  onAppend: (widget: WidgetType) => void;
}

export type StructureActionProps<P extends string = 'paths'> = Record<
  P,
  ConfigPaths
> & {
  config: RenderConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface StructureItemProps extends StructureActionProps {
  onActive: (e: ConfigPaths) => void;
}

export interface StructureProps
  extends StructureActionProps<'active'>,
    Pick<StructureItemProps, 'onActive'> {
  action: React.ReactNode;
}
