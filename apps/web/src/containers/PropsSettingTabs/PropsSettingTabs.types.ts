import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { JsonObject } from 'type-fest';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { WidgetType } from '~web/services';

import type {
  EditorListClasses,
  EditorListProps,
  PrimitiveProps,
  PrimitiveType,
} from '~web/components';

//* Config Types
type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type ConfigType = ConfigProps['type'];

export type ConfigChangeHandler<V extends ConfigProps = ConfigProps> = (
  config: RenderConfig,
  propPath: string,
  propValue?: V
) => void;

//* Data Binding Types
export type DataFields = Record<string, PrimitiveProps>;

export type PropMappingItems = Record<
  string,
  { propPath: string; type: PrimitiveType }[]
>;

//* Fixed Data Types
export type SourcePaths = {
  binding: 'propMapping' | `${string}.propMapping`;
  data: 'records' | 'data';
};

//* Component Props Type
export interface PropsSettingTabsProps
  extends Pick<EditorListProps, 'onClose'> {
  config?: RenderConfig;
  paths: ConfigPaths;
  onChange: ConfigChangeHandler;
}

export interface PropsSettingProps<V extends ConfigProps = ConfigProps> {
  classes: EditorListClasses & { row?: string };
  config: RenderConfig;
  onChange: ConfigChangeHandler<V>;
}

export interface DataBindingProps extends PropsSettingProps {
  elevation?: number;
  expanded: number | 'data';
  onExpand: (panel: number | 'data') => void;
}

export interface DataCreateModalProps {
  basePropPath: string;
  bindingFields: Record<string, string>;
  data?: JsonObject;
  open: boolean;
  widget: WidgetType;
  onChange: (data: JsonObject) => void;
  onClose: () => void;
}
