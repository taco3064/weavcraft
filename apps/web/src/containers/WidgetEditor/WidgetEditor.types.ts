import type { ContainerProps } from '@mui/material/Container';

import type { PortalContainerEl } from '~web/contexts';
import type { WidgetConfigs, WidgetType } from '~web/services';

import type {
  ConfigChangeHandler,
  ConfigPaths,
  RenderConfig,
} from '~web/hooks';

export type NodeCreateVariant = 'action' | 'node';

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
