import type { EventItem } from '../EventList';
import type { TodoEnum } from '@weavcraft/common';

import type {
  EditorListProps,
  HierarchyWidget,
  PageLayoutConfigs,
  TodoEdge,
  TodoNode,
} from '../imports.types';

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export interface FlowElements {
  edges: TodoEdge[];
  nodes: TodoNode[];
}

//* Component Props
export interface EventFlowEditorProps extends Pick<EditorListProps, 'onClose'> {
  active: ActiveEvent;
  config: WidgetLayout;
  widget: HierarchyWidget;
  onChange: (e: WidgetLayout) => void;
}

export interface FlowToolbarProps {
  fitViewDuration: number;
  onTodoAdd: (type: TodoEnum) => void;
}
