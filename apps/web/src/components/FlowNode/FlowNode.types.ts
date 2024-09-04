import type { Node, NodeProps } from '@xyflow/react';
import type { ReactNode } from 'react';
import type { TodoEnum, Todos } from '@weavcraft/common';

export interface MainStyleParams {
  borderStyle: 'dashed' | 'solid';
  size: Record<'width' | 'height', number>;
  type: TodoEnum;
}

export type Background = 'error' | 'info' | 'secondary' | 'success' | 'warning';
export type TodoNode = Node<Todos>;

//* Component Props
export type FlowNodeProps = NodeProps<
  Node<Exclude<Todos, { type: TodoEnum.Iterate }>>
>;

export type SubFlowProps = NodeProps<
  Node<Extract<Todos, { type: TodoEnum.Iterate }>>
>;

export interface NodeLabelProps
  extends Partial<Pick<MainStyleParams, 'borderStyle' | 'size'>> {
  children?: ReactNode;
  description: string;
  title: string;
  type: TodoEnum;
  onDelete: () => void;
}
