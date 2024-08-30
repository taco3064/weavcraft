import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import dagre from '@dagrejs/dagre';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Connection } from '@xyflow/react';
import type { Todos } from '@weavcraft/common';

import { NODE_SIZE } from '~web/components';

import type {
  EventFlowEditorProps,
  FlowElements,
} from './EventFlowEditor.types';

import type {
  EdgeType,
  QueryFunctionParams,
  TodoEdge,
  TodoNode,
  TodoValue,
} from '../imports.types';

export function useEventTodos({
  active,
  config,
  onChange,
}: Pick<EventFlowEditorProps, 'active' | 'config' | 'onChange'>) {
  const paths = ['events', active.config.id, active.eventPath];
  const todos: Record<string, Todos> = _get(config, paths);

  return {
    todos,

    onConnect: ({ source, sourceHandle, target }: Connection) => {
      const { [source]: srcTodo } = todos;

      if (
        srcTodo &&
        source !== target &&
        !isCircularConnection(target, source, todos)
      ) {
        onChange({
          ..._set(config, paths, {
            ...todos,
            [source]: {
              ...srcTodo,
              nextTodo: {
                ...srcTodo.nextTodo,
                [sourceHandle as string]: target,
              },
            },
          }),
        });
      }
    },
    onEdgesDelete: (edges: TodoEdge[]) => {
      edges.forEach(({ source, sourceHandle }) =>
        _unset(todos, [source, 'nextTodo', sourceHandle as string])
      );

      onChange({ ..._set(config, paths, { ...todos }) });
    },
    onNodesDelete: (nodes: TodoNode[]) => {
      nodes.forEach(({ id }) => _unset(todos, [id]));
      onChange({ ..._set(config, paths, { ...todos }) });
    },
    onTodoCreate: (todo: TodoValue) =>
      onChange({
        ..._set(config, paths, { ...todos, [nanoid(6)]: todo }),
      }),
  };
}

export function useFlowLayout(todos: Record<string, Todos>) {
  const elements = useMemo(
    () =>
      Object.entries(todos || {}).reduce<FlowElements>(
        ({ edges, nodes }, [id, todo]) => {
          nodes.push({
            id,
            type: todo.type,
            data: todo,
            position: { x: 0, y: 0 },
          });

          Object.entries(todo.nextTodo || {}).forEach(
            ([sourceHandle, target]) => {
              if (!target || !todos[target]) {
                return;
              }

              edges.push({
                id: `${id}-${target}`,
                type: sourceHandle as EdgeType,
                source: id,
                sourceHandle,
                target,
              });
            }
          );

          return { edges, nodes };
        },
        { edges: [], nodes: [] }
      ),
    [todos]
  );

  const { data } = useQuery({
    queryKey: [elements],
    queryFn: getLayoutedElements,
  });

  return {
    nodes: data?.nodes || [],
    edges: data?.edges || [],
  };
}

function isCircularConnection(
  next: string,
  start: string,
  todos: Record<string, Todos>
): boolean {
  const { [next]: todo } = todos;

  return (
    start === next ||
    Object.values(todo?.nextTodo || {}).some((next) =>
      isCircularConnection(next, start, todos)
    )
  );
}

//* Auto Layout Algorithm
async function getLayoutedElements({
  queryKey: [{ edges, nodes }],
}: QueryFunctionParams<[FlowElements]>): Promise<FlowElements> {
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 160 });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => graph.setNode(node.id, { ...NODE_SIZE }));
  edges.forEach(({ source, target }) => graph.setEdge(source, target));

  dagre.layout(graph);

  return {
    edges,
    nodes: nodes.map((node) => {
      const { x, y } = graph.node(node.id);

      return {
        ...node,
        position: { x, y },
      };
    }),
  };
}
