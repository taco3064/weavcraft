import NextEdge from './FlowEdge.Next';
import type { FlowEdgeProps } from './FlowEdge.types';

export default function TrueEdge(props: FlowEdgeProps) {
  return <NextEdge {...props} label="N" />;
}
