import type { JsonObject } from 'type-fest';

enum WidgetPropType {
  DataBinding,
  ElementNode,
  EventCallback,
  PrimitiveValue,
}

export type WidgetPropTypes = keyof typeof WidgetPropType;

interface BaseWidgetProps<T extends WidgetPropTypes, V> {
  type: T;
  value: V;
}

//* - Data Binding
export type DataBindingProp = BaseWidgetProps<
  'DataBinding',
  Record<string, string> | JsonObject | JsonObject[]
>;

//* - Primitive Value
type PrimitiveValue = string | number | boolean | undefined;

export type PrimitiveValueProp = BaseWidgetProps<
  'PrimitiveValue',
  PrimitiveValue
>;

//* - Element Node
interface ElementNodeConfig {
  widget: string;
  props?: {
    [propPath: string]: DataBindingProp | ElementNodeProp | PrimitiveValueProp;
  };
}

export type ElementNodeProp = BaseWidgetProps<
  'ElementNode',
  ElementNodeConfig | ElementNodeConfig[]
>;

//* - Widget Configs
export interface WidgetConfigs extends ElementNodeConfig {
  id: string;
}
