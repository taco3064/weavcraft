import type { Node, NodeProps } from '@xyflow/react';
import type { TodoEnum, Todos } from '@weavcraft/common';

export interface MainStyleParams {
  type: TodoEnum;
}

export type Background = 'error' | 'info' | 'secondary' | 'success' | 'warning';
export type TodoNode = Node<Todos>;

export type FlowNodeProps = NodeProps<
  Node<Exclude<Todos, { type: TodoEnum.Iterate }>>
>;

export type SubFlowProps = NodeProps<
  Node<Extract<Todos, { type: TodoEnum.Iterate }>>
>;
