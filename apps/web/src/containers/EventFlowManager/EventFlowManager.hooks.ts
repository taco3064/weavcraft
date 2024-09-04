import * as Flow from '@xyflow/react';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { TodoEnum, type Todos } from '@weavcraft/common';
import { digraph, fromDot, toDot } from 'ts-graphviz';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useRef, useState } from 'react';

import { NODE_SIZE, SUB_FLOW_SIZE } from '~web/components';
import { EditorModeEnum } from './EventFlowManager.types';
import { START_WIDTH } from './EventFlowManager.styles';
import type { EdgeType, TodoEdge, TodoNode, TodoValue } from '../imports.types';

import type {
  EditingTodo,
  EditorProps,
  EventFlowManagerProps,
  NodeAttrs,
  SetFlowStateArgs,
} from './EventFlowManager.types';

const START_NODE: TodoNode = {
  id: 'start',
  type: 'start',
  data: {} as Todos,
  position: { x: START_WIDTH / -2, y: 0 },
};

export function useInitialization({
  active,
  config,
  onClose,
}: Pick<EventFlowManagerProps, 'active' | 'config' | 'onClose'>) {
  const options = _get(config, ['events', active.config.id, active.eventPath]);

  return [
    useMemo(() => {
      const todos: [string, Todos][] = Object.entries(options?.todos || {});
      const graph = !options?.dot ? undefined : fromDot(options.dot);

      return {
        edges:
          graph?.edges.map<TodoEdge>((edge) => {
            const type = edge.attributes.get('layer') as EdgeType;

            const [from, to] = edge.targets.map<string>((target) =>
              _get(target, ['id'])
            );

            return {
              id: `${from}-${to}`,
              type: type,
              source: from,
              sourceHandle: type,
              target: to,
            };
          }) || [],

        nodes: todos.reduce<TodoNode[]>(
          (acc, [id, todo]) => {
            const attrs = Object.fromEntries(
              graph?.getNode(id)?.attributes.values || []
            ) as NodeAttrs;

            if (attrs.pos) {
              const [x, y] = attrs.pos.split(',').map(Number);

              acc.push({
                id,
                type: todo.type,
                data: todo,
                width: Number(attrs.width),
                height: Number(attrs.height),
                position: { x, y },
              });
            }

            return acc;
          },
          [START_NODE]
        ),
      };
    }, [options]),

    ({ edges, nodes }: Pick<EditorProps, 'edges' | 'nodes'>) => {
      const graph = digraph('G', (g) => {
        nodes.forEach(({ id, position, width, height }) => {
          const node = g.node(id, { width, height });

          node.attributes.set('pos', `${position.x},${position.y}`);
          node.attributes.set('width', width as number);
          node.attributes.set('height', height as number);
        });

        edges.forEach(({ source, sourceHandle, target }) =>
          g
            .edge([source, target])
            .attributes.set('layer', sourceHandle as EdgeType)
        );
      });

      const todos = nodes.reduce<Record<string, Todos>>((acc, { id, data }) => {
        if (id !== 'start') {
          const todo: Todos = {
            ...(data as Todos),
            nextTodo: edges
              .filter(({ source }) => source === id)
              .reduce<Record<string, string>>(
                (acc, { sourceHandle, target }) => ({
                  ...acc,
                  [sourceHandle as string]: target,
                }),
                {}
              ),
          };

          return _set(acc, [id], todo);
        }

        return acc;
      }, {});

      onClose({
        ...config,
        events: {
          ..._set(config.events || {}, [active.config.id, active.eventPath], {
            dot: toDot(graph),
            todos,
          }),
        },
      });
    },
  ] as const;
}

export function useFlowProps(
  fitViewDuration: number,
  els: Pick<EditorProps, 'edges' | 'nodes'>
) {
  const { fitView } = Flow.useReactFlow();

  const disableFitViewRef = useRef(false);
  const debounceFitView = useMemo(() => _debounce(fitView, 200), [fitView]);

  const [edges, setEdges, onEdgesChange] = Flow.useEdgesState(els.edges);
  const [nodes, setNodes, onNodesChange] = Flow.useNodesState(els.nodes);

  useEffect(() => {
    if (!disableFitViewRef.current) {
      const handleResize = () =>
        debounceFitView({ duration: fitViewDuration, nodes });

      handleResize();
      global.window?.addEventListener('resize', handleResize);

      return () => global.window?.removeEventListener('resize', handleResize);
    }
  }, [debounceFitView, fitViewDuration, nodes]);

  return [
    { edges, nodes },

    (...[type, values]: SetFlowStateArgs): void =>
      type === 'edges' ? setEdges(values) : setNodes(values),

    {
      onEdgesChange,
      onNodeDragStart: () => (disableFitViewRef.current = true),
      onNodeDragStop: () => (disableFitViewRef.current = false),

      onNodesChange: (e: Flow.NodeChange<TodoNode>[]) =>
        onNodesChange(
          e.filter(
            (change) =>
              _get(change, ['id']) !== START_NODE.id ||
              change.type !== 'position'
          )
        ),
      onConnect: ({ source, sourceHandle, target }: Flow.Connection) => {
        if (sourceHandle && source !== target) {
          const edge: TodoEdge = {
            id: `${source}-${target}`,
            type: sourceHandle as EdgeType,
            source,
            sourceHandle,
            target,
          };

          setEdges([...edges.filter((edge) => edge.source !== source), edge]);
        }
      },
    },
  ] as const;
}

export function useTodoEdit(setFlowState: (...args: SetFlowStateArgs) => void) {
  const { screenToFlowPosition } = Flow.useReactFlow();
  const [editing, setEditing] = useState<EditingTodo>();

  return [
    { mode: editing?.mode, editing },
    {
      onEdtingClose: (isForceClose = false) =>
        setEditing((prev) => (!isForceClose && prev?.todo ? prev : undefined)),

      onEditingChange: (todo: TodoValue) =>
        setEditing({ ...editing, todo } as EditingTodo),

      onTypeSelect: (label: string) =>
        setEditing({
          ...editing,
          mode: EditorModeEnum.CreateTodo,
          todo: {
            type: label.replace(/^pages:lbl-todo-types\./, '') as TodoEnum,
          },
        } as EditingTodo),

      onNodeCreate: (
        e: MouseEvent | TouchEvent,
        { fromHandle, fromNode, toNode }: Flow.FinalConnectionState
      ) => {
        if (
          toNode ||
          !fromHandle ||
          !fromNode ||
          fromHandle.type === 'target' ||
          _get(fromNode, ['data', 'nextTodo', fromHandle.id as string])
        ) {
          return;
        }

        const { x, y } = screenToFlowPosition({
          x: _get(e, ['clientX']) as number,
          y: _get(e, ['clientY']) as number,
        });

        setEditing({
          mode: EditorModeEnum.TypeSelection,
          payload: {
            source: fromNode.id,
            type: fromHandle.id as EdgeType,
            position: { x, y },
          },
        });
      },
      onNodeEdit: (_e: unknown, { id, data }: TodoNode) => {
        if (id !== START_NODE.id) {
          setEditing({
            mode: EditorModeEnum.EditTodo,
            payload: id,
            todo: JSON.parse(JSON.stringify(data)),
          });
        }
      },
      onTodoCreate: () => {
        setEditing(undefined);

        if (
          !editing?.todo ||
          !editing?.payload ||
          typeof editing.payload === 'string'
        ) {
          return;
        }

        const id = nanoid(6);
        const { payload, todo } = editing;
        const { position, source } = payload;

        const { width, height } =
          todo.type === TodoEnum.Iterate ? SUB_FLOW_SIZE : NODE_SIZE;

        const newNodes: TodoNode[] = [
          {
            id,
            type: todo.type,
            data: todo,
            width,
            height,
            position: {
              y: position.y,
              x: position.x - width / 2 - 2,
            },
          },
        ];

        if (todo.type === TodoEnum.Iterate) {
          newNodes.push({
            ...START_NODE,
            id: `${START_NODE.id}-${id}`,
            parentId: id,
            extent: 'parent',
            position: {
              x: (SUB_FLOW_SIZE.width - START_WIDTH) / 2,
              y: NODE_SIZE.height,
            },
          });
        }

        setFlowState('nodes', (nodes: TodoNode[]) => [...nodes, ...newNodes]);

        setFlowState('edges', (edges: TodoEdge[]) => [
          ...edges,
          {
            id: `${payload.source}-${id}`,
            type: payload.type,
            source: source,
            sourceHandle: payload.type,
            target: id,
          },
        ]);
      },
      onTodoUpdate: () => {
        setEditing(undefined);

        if (
          !editing?.todo ||
          !editing?.payload ||
          typeof editing.payload !== 'string'
        ) {
          return;
        }

        const { payload, todo } = editing;

        setFlowState('nodes', (nodes: TodoNode[]) =>
          nodes.map((node) =>
            node.id === payload ? { ...node, data: todo } : node
          )
        );
      },
    },
  ] as const;
}

export function useValidation({
  edges,
  nodes,
  onClose,
}: Pick<EditorProps, 'edges' | 'nodes' | 'onClose'>) {
  const connectedIds = getConnectedIds(edges, START_NODE.id);

  return [
    nodes.length - connectedIds.size,

    () =>
      onClose({
        edges: edges.filter(
          ({ source, target }) =>
            connectedIds.has(source) && connectedIds.has(target)
        ),
        nodes: nodes.filter(({ id }) => connectedIds.has(id)),
      }),
  ] as const;
}

function getConnectedIds(
  edges: TodoEdge[],
  source: string,
  exisiting = new Set<string>([source])
): Set<string> {
  return edges.reduce((acc, edge) => {
    if (edge.source === source && !acc.has(edge.target)) {
      acc.add(edge.target);

      return new Set([...acc, ...getConnectedIds(edges, edge.target, acc)]);
    }

    return acc;
  }, exisiting);
}
