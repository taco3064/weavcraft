import type { ContainerProps } from '@mui/material/Container';
import type { Get } from 'type-fest';

import type {
  ConfigChangeHandler,
  ConfigPaths,
  EditorListProps,
  PortalContainerEl,
  PrimitiveValuePropsWithPath,
  RenderConfig,
  WidgetConfigs,
  WidgetType,
} from '../imports.types';

export type NodeCreateVariant = 'action' | 'node';

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
  >;
}

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

//* Component Props Type
export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface NodeCreateButtonProps {
  config?: RenderConfig;
  path?: string;
  variant: NodeCreateVariant;
  onClick: (widget: WidgetType) => void;
}

export interface PropItemsProps extends Pick<EditorListProps, 'onClose'> {
  config: RenderConfig;
  paths: ConfigPaths;
  widget: WidgetConfigs;
  onChange: ConfigChangeHandler;
}
