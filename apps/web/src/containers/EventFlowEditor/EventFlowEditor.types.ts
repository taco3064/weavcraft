import type { EventItem } from '../EventList';

import type {
  EditorListProps,
  HierarchyWidget,
  PageLayoutConfigs,
} from '../imports.types';

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export interface EventFlowEditorProps extends Pick<EditorListProps, 'onClose'> {
  active: ActiveEvent;
  config: WidgetLayout;
  widget: HierarchyWidget;
  onChange: (e: WidgetLayout) => void;
}
