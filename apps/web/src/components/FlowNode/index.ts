import { TodoEnum } from '@weavcraft/common';
import type { ComponentType } from 'react';

import FlowNode from './FlowNode.Node';
import SubFlow from './FlowNode.Sub';
import type { FlowNodeProps, SubFlowProps, TodoNode } from './FlowNode.types';

export const FlowNodes: Record<
  TodoEnum,
  ComponentType<FlowNodeProps> | ComponentType<SubFlowProps>
> = {
  [TodoEnum.Decision]: FlowNode,
  [TodoEnum.FetchData]: FlowNode,
  [TodoEnum.Iterate]: SubFlow,
  [TodoEnum.UpdateWidget]: FlowNode,
  [TodoEnum.Variables]: FlowNode,
};

export default FlowNodes;
export type { FlowNodeProps, SubFlowProps, TodoNode };

export {
  NODE_SIZE,
  SUB_FLOW_SIZE,
  START_NODE,
  TODO_ICONS,
} from './FlowNode.const';
