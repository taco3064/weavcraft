import type { ContainerProps } from '@mui/material/Container';
import type { DataStructureViewProps } from '../DataStructureView';

import type {
  ConfigPaths,
  PortalContainerEl,
  PropsSettingChangeHandler,
  RenderConfig,
  WidgetConfigs,
  WidgetType,
} from '../imports.types';

export type NodeCreateVariant = 'action' | 'node';

export interface ChangeEvents {
  onAddChild: (config: RenderConfig, path: string, widget: WidgetType) => void;
  onConfigChange: PropsSettingChangeHandler;
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
