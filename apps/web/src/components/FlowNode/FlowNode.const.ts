import { Position } from '@xyflow/react';
import { TodoEnum } from '@weavcraft/common';
import type Core from '@weavcraft/core';

import type { Background } from './FlowNode.types';

export const NODE_SIZE = { width: 240, height: 60 };

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
