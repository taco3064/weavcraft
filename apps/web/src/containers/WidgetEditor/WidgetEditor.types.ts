import type { ContainerProps } from '@mui/material/Container';

import type { ConfigChangeHandler } from '../PropsSettingTabs';
import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { PortalContainerEl } from '~web/contexts';

import type { WidgetConfigs, WidgetType } from '~web/services';

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
  path?: string;
  variant: NodeCreateVariant;
  widgetId?: WidgetType;
  onClick: (widget: WidgetType) => void;
}
