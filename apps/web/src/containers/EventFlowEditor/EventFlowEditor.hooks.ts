import _get from 'lodash/get';
import { useMemo } from 'react';
import type { Node } from '@xyflow/react';
import type { Todos } from '@weavcraft/common';

import type { ActiveEvent, WidgetLayout } from './EventFlowEditor.types';

export function useFlowNodes(config: WidgetLayout, active: ActiveEvent) {
  const todos: Record<string, Todos> = _get(config, [
    'events',
    active.config.id,
    active.eventPath,
  ]);

  return useMemo(
    () =>
      Object.entries(todos || {}).map<Node<Todos>>(([id, todo]) => ({
        id,
        description: todo.description || id,
        type: todo.type,
        data: todo,
        position: { x: 0, y: 0 },
      })),
    [todos]
  );
}
