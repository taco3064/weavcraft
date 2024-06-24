import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get } from 'type-fest';

import type {
  ConfigPaths,
  EditorListProps,
  PrimitivePropDefinitions,
  RenderConfig,
  WidgetConfigs,
} from '../imports.types';

//* Enums
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

//* Variables
type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type DataSource = '[[root]]' | '[[extension]]' | number[];
export type DataFieldIndexes = Exclude<DataSource, `[[${string}]]`>;

export type DataSourceOptions = {
  fieldPath: string;
  indexes: DataSource;
};

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PrimitivePropDefinitions, ['primitiveValueProps', string]>
  >;
}

export type PropsSettingChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;

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
  value?: DataSource;
  onChange: (dataPropName: DataPropNameEnum, value?: DataSource) => void;
}

export interface BindingSelectProps
  extends Pick<
    PropItemProps,
    'config' | 'paths' | 'propPath' | 'widget' | 'onFieldBinding'
  > {
  value?: DataFieldIndexes;
}
