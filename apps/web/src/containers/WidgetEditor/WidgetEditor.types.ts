import { Children, type ReactNode } from 'react';
import type { ContainerProps } from '@mui/material/Container';
import type { Get } from 'type-fest';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses, EditorListProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';

import type {
  PrimitiveValuePropsWithPath,
  WidgetConfigs,
  WidgetType,
} from '~web/services';

export const ControllerProps = Symbol('ControllerProps');
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;
export type ChildrenArray = ReturnType<typeof Children.toArray>;

type PrimitiveProps = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

type StructureEvent = {
  target: RenderConfig;
  paths: ConfigPaths;
};

export type GetPathsFn = (
  nodePath: string,
  index: number,
  paths?: ConfigPaths
) => ConfigPaths;

export type NodeItemsRenderFn = (options: {
  classes: EditorListClasses;
  isMultiple: boolean;
  nodePath: string;
  widgets: RenderConfig[];
  getPaths: GetPathsFn;
}) => ReactNode;

export type PrimitiveItemsRenderFn = (options: {
  classes: EditorListClasses;
  proptypes: PrimitiveProps;
  primitivePath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}) => ReactNode;

export interface ChangeEvents {
  onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => void;
  onDeleteNode: (paths: ConfigPaths) => void;

  onAddLastChild: (
    config: RenderConfig,
    path: string,
    widget: WidgetType
  ) => void;

  onPrimitiveChange: (
    config: RenderConfig,
    propPath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
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

export type NodeActionProps<P extends string = 'paths'> = Record<
  P,
  ConfigPaths
> & {
  config: RenderConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface ElementNodeProps
  extends NodeActionProps<'active'>,
    Pick<EditorListProps, 'onClose'> {
  onActive: (e: ConfigPaths) => void;
}

export interface PrimitiveValueProps
  extends Pick<NodeActionProps, 'paths'>,
    Pick<EditorListProps, 'onClose'> {
  config?: RenderConfig;
  onChange: Get<ChangeEvents, 'onPrimitiveChange'>;
}
