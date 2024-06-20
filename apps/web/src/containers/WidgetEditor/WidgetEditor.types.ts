import type { ContainerProps } from '@mui/material/Container';
import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get } from 'type-fest';

import type { DataStructureViewProps } from '../DataStructureView';

import type {
  ConfigPaths,
  EditorListProps,
  PortalContainerEl,
  PrimitiveValuePropsWithPath,
  RenderConfig,
  WidgetConfigs,
  WidgetType,
} from '../imports.types';

type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type NodeCreateVariant = 'action' | 'node';

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
  >;
}

type ConfigChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;

export interface ChangeEvents {
  onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => void;
  onConfigChange: ConfigChangeHandler;
  onDeleteNode: (paths: ConfigPaths) => void;
  onStructureChange: NonNullable<DataStructureViewProps['onChange']>;

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
