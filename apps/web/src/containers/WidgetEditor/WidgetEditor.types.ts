import type Core from '@weavcraft/core';
import type { ContainerProps } from '@mui/material/Container';
import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get } from 'type-fest';
import type { ReactNode } from 'react';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses, EditorListProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';

import type {
  PrimitiveValuePropsWithPath,
  WidgetConfigs,
  WidgetType,
} from '~web/services';

//* Config Types
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

//* Primitive Input Item Type
type PrimitiveProps = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

type PrimitiveType = Get<PrimitiveProps, ['type']>;

export type DefaultPrimitiveFieldProps = Pick<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Core.BaseFieldProps<any>,
  'label' | 'required' | 'size' | 'value' | 'variant' | 'onChange'
>;

export type PrimitiveFields = {
  [K in PrimitiveType]: (
    defaultProps: DefaultPrimitiveFieldProps,
    definition: Get<Extract<PrimitiveProps, { type: K }>, ['definition']>
  ) => ReactNode;
};

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

export interface SettingPanelProps<V extends ConfigProps> {
  classes: EditorListClasses & { row?: string };
  config: RenderConfig;
  onChange: ConfigChangeHandler<V>;
}
