/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ContainerProps } from '@mui/material/Container';
import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses, EditorListProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';

import type { WidgetConfigs, WidgetType } from '~web/services';

type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type ConfigType = ConfigProps['type'];

type ConfigChangeHandler<V extends ConfigProps = ConfigProps> = (
  config: RenderConfig,
  propPath: string,
  propValue?: V
) => void;

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

export interface SettingTabsProps extends Pick<EditorListProps, 'onClose'> {
  config?: RenderConfig;
  paths: ConfigPaths;
  onChange: ConfigChangeHandler;
}

export interface PrimitiveItemsProps {
  classes: EditorListClasses;
  config: RenderConfig;
  onChange: ConfigChangeHandler<PrimitiveValueProp>;
}

export interface DataBindingProps {
  classes: EditorListClasses;
}
