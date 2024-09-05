import { Position } from '@xyflow/react';
import { TodoEnum, Todos } from '@weavcraft/common';
import type Core from '@weavcraft/core';

import type { Background, TodoNode } from './FlowNode.types';

export const NODE_SIZE = { width: 240, height: 78 };

export const START_NODE: TodoNode = {
  ...NODE_SIZE,
  id: 'start',
  type: 'start',
  data: {} as Todos,
  position: { x: NODE_SIZE.width / -2, y: 0 },
};

export const SUB_FLOW_SIZE = {
  width: NODE_SIZE.width * 2,
  height: NODE_SIZE.height * 5,
};

export const NODE_BACKGROUND: Record<TodoEnum, Background> = {
  [TodoEnum.Decision]: 'warning',
  [TodoEnum.FetchData]: 'success',
  [TodoEnum.Iterate]: 'info',
  [TodoEnum.UpdateWidget]: 'error',
  [TodoEnum.Variables]: 'secondary',
};

export const TODO_ICONS: Record<TodoEnum, Core.IconCode> = {
  [TodoEnum.Variables]: 'faTags',
  [TodoEnum.Decision]: 'faArrowsSplitUpAndLeft',
  [TodoEnum.Iterate]: 'faArrowsRotate',
  [TodoEnum.FetchData]: 'faRightLeft',
  [TodoEnum.UpdateWidget]: 'faPenToSquare',
};

export const TODO_SOURCE: Partial<Record<TodoEnum, Record<string, Position>>> =
  {
    [TodoEnum.Decision]: {
      true: Position.Right,
      false: Position.Left,
    },
  };
