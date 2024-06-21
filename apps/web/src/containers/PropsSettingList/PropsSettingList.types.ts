import type { Get } from 'type-fest';

import type {
  ConfigPaths,
  EditorListProps,
  PrimitiveValuePropsWithPath,
  PropsSettingChangeHandler,
  RenderConfig,
  WidgetConfigs,
} from '../imports.types';

export enum InjectionMode {
  Binding = 'Binding',
  Fixed = 'Fixed',
}

export enum PropItemMode {
  DefaultValue = 'DefaultValue',
  PropMapping = 'PropMapping',
}

export interface PropItem {
  fieldPath?: string;
  mappable: boolean;
  path: string;
  definition: NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
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
  extends Pick<PropsSettingListProps, 'config' | 'onChange'> {
  classes: Record<'icon' | 'row', string>;
  disableBinding?: boolean;
  propPath: string;

  definition: NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
  >;
}

export interface BindingSelectProps {
  test?: string;
}
