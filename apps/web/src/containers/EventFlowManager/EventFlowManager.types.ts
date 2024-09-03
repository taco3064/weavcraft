import type { Get } from 'type-fest';
import type { SetStateAction } from 'react';

import type { EventItem } from '../EventList';

import type {
  EdgeType,
  HierarchyWidget,
  PageLayoutConfigs,
  TodoEdge,
  TodoNode,
  TodoValue,
} from '../imports.types';

export enum EditorModeEnum {
  CreateTodo = 'CreateTodo',
  EditTodo = 'EditTodo',
  TypeSelection = 'TypeSelection',
}

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type EventConfig = Partial<
  Get<WidgetLayout, ['events', string, string]>
>;

export type SetFlowStateArgs =
  | ['edges', SetStateAction<TodoEdge[]>]
  | ['nodes', SetStateAction<TodoNode[]>];

export interface EditingTodo {
  mode?: EditorModeEnum;
  todo?: TodoValue;

  payload:
    | string
    | {
        source: string;
        position: { x: number; y: number };
        type: EdgeType;
      };
}

//* Component Props
export interface EventFlowManagerProps {
  active: ActiveEvent;
  config: WidgetLayout;
  widget: HierarchyWidget;
  onClose: (e: WidgetLayout) => void;
}

export interface EditorProps {
  description: string;
  edges: TodoEdge[];
  nodes: TodoNode[];
  title: string;
  onClose: (e: Pick<EditorProps, 'edges' | 'nodes'>) => void;
}
