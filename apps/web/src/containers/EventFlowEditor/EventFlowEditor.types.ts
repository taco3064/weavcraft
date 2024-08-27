import type { TodoEnum } from '@weavcraft/common';
import type { EventItem } from '../EventList';

import type {
  EditorListProps,
  HierarchyWidget,
  PageLayoutConfigs,
} from '../imports.types';

export enum ViewModeEnum {
  Toolbar,
  Viewport,
}

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

//* Component Props
export interface EventFlowEditorProps extends Pick<EditorListProps, 'onClose'> {
  active: ActiveEvent;
  config: WidgetLayout;
  widget: HierarchyWidget;
  onChange: (e: WidgetLayout) => void;
}

export interface FlowToolbarProps {
  onTodoAdd: (type: TodoEnum) => void;
}
