import type { ComponentType } from 'react';

import FalseEdge from './FlowEdge.False';
import NextEdge from './FlowEdge.Next';
import TrueEdge from './FlowEdge.True';
import type { EdgeType, FlowEdgeProps, TodoEdge } from './FlowEdge.types';

export const FlowEdges: Record<EdgeType, ComponentType<FlowEdgeProps>> = {
  false: FalseEdge,
  next: NextEdge,
  true: TrueEdge,
};

export default FlowEdges;
export type { EdgeType, FlowEdgeProps, TodoEdge };
