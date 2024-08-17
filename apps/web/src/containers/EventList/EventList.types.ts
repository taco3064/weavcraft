import type { SetRequired } from 'type-fest';

import type {
  ConfigPaths,
  CoreComponent,
  EditorListProps,
  GetChildNodesFn,
  GetCorePropsFn,
  HierarchyData,
  PageLayoutConfigs,
  WidgetConfigs,
} from '../imports.types';

export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type WidgetHierarchy = SetRequired<
  HierarchyData<WidgetConfigs>,
  'payload'
>;

export type EventGetterOptions = {
  getChildNodes: GetChildNodesFn;
  getCoreProps: GetCorePropsFn;
};

export interface EventItem {
  component: CoreComponent;
  nodePath: string;
  nodePaths: ConfigPaths;
  eventPath: string;
}

//* Component Props
export interface EventListProps extends Pick<EditorListProps, 'onClose'> {
  config: WidgetLayout;
  widget: WidgetHierarchy;
  onActive: (e: ConfigPaths) => void;
}
