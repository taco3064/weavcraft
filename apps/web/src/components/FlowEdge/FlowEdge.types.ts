import type { Edge, EdgeProps } from '@xyflow/react';
import type { Todos } from '@weavcraft/common';
import type { RequiredDeep, KeysOfUnion } from 'type-fest';

export interface MainStyleParams {
  hasLabelText: boolean;
  labelX: number;
  labelY: number;
}

export type EdgeType = KeysOfUnion<RequiredDeep<Todos['nextTodo']>>;
export type TodoEdge = Edge<Record<string, unknown>, EdgeType>;

export interface FlowEdgeProps extends EdgeProps<TodoEdge> {
  data: Record<string, unknown>;
  type: EdgeType;
}
