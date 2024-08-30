import { TodoEnum } from '@weavcraft/common';
import type { ComponentType } from 'react';

import FlowNode from './FlowNode.Default';
import SubFlow from './FlowNode.Sub';
import type { FlowNodeProps, TodoNode } from './FlowNode.types';

export const FlowNodes: Record<TodoEnum, ComponentType<FlowNodeProps>> = {
  [TodoEnum.Decision]: FlowNode,
  [TodoEnum.FetchData]: FlowNode,
  [TodoEnum.Iterate]: SubFlow,
  [TodoEnum.UpdateWidget]: FlowNode,
  [TodoEnum.Variables]: FlowNode,
};

export default FlowNodes;
export { NODE_SIZE, TODO_ICONS } from './FlowNode.const';
export type { FlowNodeProps, TodoNode };
