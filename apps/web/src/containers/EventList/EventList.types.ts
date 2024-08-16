import type { SetRequired } from 'type-fest';

import type {
  ConfigPaths,
  EditorListProps,
  HierarchyData,
  PageLayoutConfigs,
  WidgetConfigs,
} from '../imports.types';

export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type WidgetHierarchy = SetRequired<
  HierarchyData<WidgetConfigs>,
  'payload'
>;

export interface EventListProps extends Pick<EditorListProps, 'onClose'> {
  config: WidgetLayout;
  widget: WidgetHierarchy;
  onActive: (e: ConfigPaths) => void;
}
