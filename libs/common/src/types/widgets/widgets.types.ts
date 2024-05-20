enum WidgetPropType {
  ElementNode,
  EventCallback,
  PrimitiveValue,
}

export type WidgetPropTypes = keyof typeof WidgetPropType;

interface BaseWidgetProps<T extends WidgetPropTypes, V> {
  type: T;
  value: V;
}

//* - Primitive Value
type PrimitiveObject = { [x: string]: PrimitiveValue };
type PrimitiveValue = string | number | boolean | undefined | PrimitiveObject;

export type PrimitiveValueProp = BaseWidgetProps<
  'PrimitiveValue',
  PrimitiveValue
>;

//* - Element Node
interface ElementNodeConfig {
  widget: string;
  props?: {
    [propPath: string]: PrimitiveValueProp | ElementNodeProp;
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
