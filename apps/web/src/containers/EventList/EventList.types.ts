import type {
  ComponentConfig,
  EditorListProps,
  GetChildNodesFn,
  GetCorePropsFn,
  HierarchyWidget,
} from '../imports.types';

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
  widget: HierarchyWidget;
  onActive: (e: Pick<EventItem, 'config' | 'eventPath'>) => void;
}
