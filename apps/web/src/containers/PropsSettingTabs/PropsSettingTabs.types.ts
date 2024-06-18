import type { JsonObject } from 'type-fest';
import type { WidgetConfigs, WidgetType } from '~web/services';

import type {
  ConfigChangeHandler,
  ConfigPaths,
  ConfigProps,
  RenderConfig,
} from '~web/hooks';

import type {
  EditorListClasses,
  EditorListProps,
  PrimitiveProps,
  PrimitiveType,
} from '~web/components';

//* Config Types
export type ConfigType = ConfigProps['type'];

//* Data Binding Types
export type DataFields = Record<string, PrimitiveProps>;

export type PropMappingItems = Record<
  string,
  { propPath: string; type: PrimitiveType }[]
>;

//* Component Props Type
interface BaseSettingProps {
  classes: EditorListClasses & { row?: string };
  config: RenderConfig;
  onChange: ConfigChangeHandler;
}

export interface PropsSettingTabsProps
  extends Pick<EditorListProps, 'onClose'> {
  active: ConfigType;
  config?: RenderConfig;
  paths: ConfigPaths;
  widget: WidgetConfigs;
  onActiveChange: (active: ConfigType) => void;
  onChange: ConfigChangeHandler;
}

export interface PrimitiveListProps {
  classes: EditorListClasses & { row?: string };
  config: RenderConfig;
  onChange: ConfigChangeHandler;
}

export interface DataBindingProps extends BaseSettingProps {
  elevation?: number;
  expanded: number | 'data';
  paths: ConfigPaths;
  widget: WidgetConfigs;
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
