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
  | Record<string, '[[root]]' | '[[extension]]' | number[]>
  | JsonObject
  | JsonObject[]
>;

//* - Primitive Value
type PrimitiveValue = string | number | boolean | undefined;

export type PrimitiveValueProp = BaseWidgetProps<
  'PrimitiveValue',
  PrimitiveValue
>;

//* - Element Node
interface ElementNodeConfig {
  component: string;
  props?: {
    [propPath: string]: DataBindingProp | ElementNodeProp | PrimitiveValueProp;
  };
}

export type ElementNodeProp = BaseWidgetProps<
  'ElementNode',
  ElementNodeConfig | ElementNodeConfig[]
>;

//* - Widget Configs
type DataFields = (string | [string, DataFields])[];

export interface WidgetConfigs extends ElementNodeConfig {
  id: string;
  dataStructure?: DataFields;
}
