import type { EditorListProps, HierarchyWidget } from '../imports.types';
import type { EventItem, WidgetLayout } from '../EventList';

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;

export interface EventFlowEditorProps extends Pick<EditorListProps, 'onClose'> {
  active: ActiveEvent;
  config: WidgetLayout;
  widget: HierarchyWidget;
  onChange: (e: WidgetLayout) => void;
}
