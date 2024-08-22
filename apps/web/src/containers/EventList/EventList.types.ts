import type {
  ComponentConfig,
  EditorListProps,
  GetChildNodesFn,
  GetCorePropsFn,
  HierarchyWidget,
  PageLayoutConfigs,
} from '../imports.types';

export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type EventGetterOptions = {
  getChildNodes: GetChildNodesFn;
  getCoreProps: GetCorePropsFn;
};

export interface EventItem {
  config: ComponentConfig;
  nodePath: string;
  eventPath: string;
}

//* Component Props
export interface EventListProps extends Pick<EditorListProps, 'onClose'> {
  config: WidgetLayout;
  widget: HierarchyWidget;
  onActive: (e: Pick<EventItem, 'config' | 'eventPath'>) => void;
}
