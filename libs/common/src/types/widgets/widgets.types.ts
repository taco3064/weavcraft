enum PropType {
  value,
  callback,
  node,
}

interface BaseProps<T extends keyof typeof PropType, V> {
  type: T;
  value: V;
}

export type ValueProp = BaseProps<
  'value',
  string | number | boolean | undefined
>;

type NodeConfig = undefined | string | BaseWidgetConfigs;

export type NodeProp = BaseProps<'node', NodeConfig | NodeConfig[]>;

interface BaseWidgetConfigs {
  widget: string;
  props: {
    [propPath: string]: ValueProp | NodeProp;
  };
}

export interface WidgetConfigs extends BaseWidgetConfigs {
  id: string;
}
