import type { Get } from 'type-fest';
import type { SetStateAction } from 'react';

import type { EventItem } from '../EventList';

import type {
  EdgeType,
  LayoutSourcesProviderProps,
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
export type DoneRef = () => void;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type EventConfig = Partial<
  Get<WidgetLayout, ['events', string, string]>
>;

export type NodeAttrs = Record<
  'pos' | 'group' | 'width' | 'height',
  string | undefined
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
        parentId?: string;
        position: { x: number; y: number };
        type: EdgeType;
      };
}

//* Component Props
export interface EventFlowManagerProps
  extends Pick<LayoutSourcesProviderProps, 'layouts'> {
  active: ActiveEvent;
  config: WidgetLayout;
  onClose: (e: WidgetLayout) => void;
}

export interface EditorProps {
  description: string;
  edges: TodoEdge[];
  nodes: TodoNode[];
  title: string;
  onClose: (e: Pick<EditorProps, 'edges' | 'nodes'>) => void;
}
