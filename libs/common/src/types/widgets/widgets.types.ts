import type { JsonObject } from 'type-fest';

enum PropCategoryEnum {
  DataBinding,
  ElementNode,
  EventCallback,
  PrimitiveValue,
}

export type PropCategory = keyof typeof PropCategoryEnum;

interface BaseWidgetProps<T extends PropCategory, V> {
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
  id: string;
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
  dataStructure?: DataFields;
}
