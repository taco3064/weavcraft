import type { Get } from 'type-fest';

import type {
  ConfigPaths,
  DataSourceValue,
  EditorListProps,
  PrimitivePropDefinitions,
  PropsSettingChangeHandler,
  RenderConfig,
  WidgetConfigs,
} from '../imports.types';

export enum InjectionModeEnum {
  Binding = 'Binding',
  Fixed = 'Fixed',
}

export enum PropItemModeEnum {
  DefaultValue = 'DefaultValue',
  PropMapping = 'PropMapping',
}

export enum DataPropNameEnum {
  Data = 'data',
  Records = 'records',
}

export type DataFieldIndexes = Exclude<DataSourceValue, `[[${string}]]`>;

export type DataSourceOptions = {
  fieldPath: string;
  indexes: DataSourceValue;
};

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PrimitivePropDefinitions, ['primitiveValueProps', string]>
  >;
}

//* Component Props
export interface PropsSettingListProps
  extends Pick<EditorListProps, 'icon' | 'onClose'> {
  config: RenderConfig;
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
  disableBinding?: boolean;
  propPath: string;
  onFieldBinding: (propName: string, value?: DataFieldIndexes) => void;

  definition: NonNullable<
    Get<PrimitivePropDefinitions, ['primitiveValueProps', string]>
  >;
}

export interface SourceSelectProps
  extends Pick<PropsSettingListProps, 'paths' | 'widget'> {
  dataPropName: DataPropNameEnum;
  value?: DataSourceValue;
  onChange: (dataPropName: DataPropNameEnum, value?: DataSourceValue) => void;
}

export interface BindingSelectProps
  extends Pick<
    PropItemProps,
    'config' | 'paths' | 'propPath' | 'widget' | 'onFieldBinding'
  > {
  value?: DataFieldIndexes;
}
