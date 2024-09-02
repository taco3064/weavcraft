import type * as Flow from '@xyflow/react';
import type { Get, StringKeyOf } from 'type-fest';

import type { EventItem } from '../EventList';

import type {
  EdgeType,
  EditorListProps,
  HierarchyWidget,
  PageLayoutConfigs,
  TodoEdge,
  TodoNode,
} from '../imports.types';

export type ActiveEvent = Pick<EventItem, 'config' | 'eventPath'>;
export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export type EventConfig = Partial<
  Get<WidgetLayout, ['events', string, string]>
>;

export interface TodoSource {
  id: string;
  position: { x: number; y: number };
  type: EdgeType;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FlowElements {
  export type SetterArgs =
    | ['edges', TodoEdge[]]
    | ['nodes', (StartNode | TodoNode)[]];
  export type StartNode = Flow.Node<Record<string, never>>;

  export type BaseProps = Flow.ReactFlowProps<StartNode | TodoNode, TodoEdge>;

  export type ChangeEventArgs =
    | ['edges', Flow.EdgeChange<TodoEdge>[]]
    | ['nodes', Flow.NodeChange<StartNode | TodoNode>[]];

  export type Value = {
    edges: TodoEdge[];
    nodes: (StartNode | TodoNode)[];
  };
}

//* Component Props
export interface EventFlowEditorProps
  extends Pick<ImplementationProps, 'widget'> {
  active: ActiveEvent;
  config: WidgetLayout;
  onClose: (e: WidgetLayout) => void;
}

export interface ImplementationProps
  extends FlowElements.Value,
    Pick<EditorListProps, 'onClose'>,
    Pick<
      FlowElements.BaseProps,
      Exclude<
        Extract<StringKeyOf<FlowElements.BaseProps>, `on${Capitalize<string>}`>,
        'onConnectEnd' | 'onNodeDragStart' | 'onNodeDragStop'
      >
    > {
  fitViewHash?: string;
  title: string;
  widget: HierarchyWidget;
  onCreateNode: (source: TodoSource) => void;
}
