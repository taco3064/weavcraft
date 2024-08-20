import type { Get } from 'type-fest';

import type {
  ComponentConfig,
  ConfigPaths,
  DataFieldIndexes,
  DataPropEnum,
  DataSource,
  EditorListProps,
  PropDefinition,
  PropsSettingChangeHandler,
  WidgetConfigs,
} from '../imports.types';

//* Enums
export enum SettingModeEnum {
  DefaultValue = 'DefaultValue',
  PropMapping = 'PropMapping',
}

export enum SourceModeEnum {
  Binding = 'Binding',
  Fixed = 'Fixed',
}

//* Variables
export interface DataSourceOptions<T extends string | string[] = string> {
  fieldPath: T;
  indexes?: DataFieldIndexes;
}

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PropDefinition.PrimitiveValue, ['primitiveValueProps', string]>
  >;
}

//* Component Props
export interface PropsSettingListProps
  extends Pick<EditorListProps, 'icon' | 'onClose'> {
  config: ComponentConfig;
  paths: ConfigPaths;
  widget: WidgetConfigs;
  onChange: PropsSettingChangeHandler;
}

export interface PropItemProps
  extends Pick<
    PropsSettingListProps,
    'config' | 'paths' | 'widget' | 'onChange'
  > {
  classes: Record<'icon' | 'row', string>;
  propPath: string;
  sourceMode?: SourceModeEnum;
  onFieldBinding: (propName: string, value?: DataFieldIndexes) => void;

  definition: NonNullable<
    Get<PropDefinition.PrimitiveValue, ['primitiveValueProps', string]>
  >;
}

export interface SourceSelectProps
  extends Pick<PropsSettingListProps, 'paths' | 'widget'> {
  dataPropName: DataPropEnum;
  value?: DataSource;
  onChange: (dataPropName: DataPropEnum, value?: DataSource) => void;
}

export interface BindingSelectProps
  extends Pick<
    PropItemProps,
    'config' | 'paths' | 'propPath' | 'widget' | 'onFieldBinding'
  > {
  value?: DataFieldIndexes;
}
