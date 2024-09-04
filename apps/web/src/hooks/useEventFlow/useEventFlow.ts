import _get from 'lodash/get';
import _omit from 'lodash/omit';
import { useReactFlow, type Node } from '@xyflow/react';
import type { Todos } from '@weavcraft/common';

export function useNextTodoUpdate(nodeId: string) {
  const { getNodes, updateNodeData } = useReactFlow();

  return () => {
    const nodes = getNodes() as Node<Todos>[];

    nodes.forEach(({ id, data }) => {
      const { nextTodo = {} } = data;

      const nextKeys = Object.keys(nextTodo).filter(
        (key) => _get(nextTodo, [key]) === nodeId
      );

      if (nextKeys.length) {
        updateNodeData(id, { nextTodo: _omit(nextTodo, nextKeys) });
      }
    });
  };
}
