import * as Flow from '@xyflow/react';
import _cloneDeep from 'lodash/cloneDeep';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import { fromDot } from 'ts-graphviz';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { TodoEnum, Todos } from '@weavcraft/common';

import type { EdgeType, TodoEdge, TodoNode, TodoValue } from '../imports.types';

import type {
  EventConfig,
  FlowElements,
  TodoSource,
} from './EventFlowEditor.types';

const START_NODE: FlowElements.StartNode = {
  id: 'start',
  type: 'start',
  data: {},
  position: { x: 0, y: 0 },
};

export function useAutoFitView(
  fitViewDuration: number,
  nodes: (FlowElements.StartNode | TodoNode)[]
) {
  const { fitView } = Flow.useReactFlow();
  const disableFitViewRef = useRef(false);
  const debounceFitView = useMemo(() => _debounce(fitView, 200), [fitView]);

  useEffect(() => {
    console.log(disableFitViewRef.current);

    if (!disableFitViewRef.current) {
      const handleResize = () =>
        debounceFitView({ duration: fitViewDuration, nodes });

      handleResize();
      global.window?.addEventListener('resize', handleResize);

      return () => global.window?.removeEventListener('resize', handleResize);
    }
  }, [debounceFitView, fitViewDuration, nodes]);

  return (disable: boolean) => (disableFitViewRef.current = disable);
}

export function useFlowElements(config: EventConfig) {
  const [defaultElements] = useState<FlowElements.Value>(() => {
    const todos: [string, Todos][] = Object.entries(config?.todos || {});
    const graph = !config?.dot ? undefined : fromDot(config.dot);

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

      nodes: todos.reduce<TodoNode[]>((acc, [id, todo]) => {
        const pos = graph
          ?.getNode(id)
          ?.attributes.get('pos')
          ?.split(',')
          .map(Number);

        if (Array.isArray(pos)) {
          acc.push({
            id,
            type: todo.type,
            data: todo,
            position: { x: pos[0], y: pos[1] },
          });
        }

        return acc;
      }, []),
    };
  });

  const [edges, setEdges, onEdgesChange] = Flow.useEdgesState(
    defaultElements.edges
  );

  const [nodes, setNodes, onNodesChange] = Flow.useNodesState([
    START_NODE,
    ...defaultElements.nodes,
  ]);

  return [
    { edges, nodes },

    (...[type, values]: FlowElements.SetterArgs) =>
      type === 'edges' ? setEdges(values) : setNodes(values),

    (...[type, values]: FlowElements.ChangeEventArgs) =>
      type === 'edges' ? onEdgesChange(values) : onNodesChange(values),
  ] as const;
}

export function useTodoEditing() {
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [source, setSource] = useState<TodoSource>();

  const [editing, setEditing] = useState<{
    id?: string;
    todo: TodoValue;
  }>();

  return {
    isSelectionOpen: selectionOpen,
    editing,
    source,

    onEditorChange: (todo: TodoValue) => setEditing({ ...editing, todo }),
    onSelectionClose: () => setSelectionOpen(false),

    onEditorClose: () => {
      setEditing(undefined);
      setSource(undefined);
    },
    onTypeSelect: (label: string) =>
      setEditing({
        todo: {
          type: label.replace(/^pages:lbl-todo-types\./, '') as TodoEnum,
        },
      }),

    flowHandlers: {
      onCreateNode: (source: TodoSource) => {
        setSource(source);
        setSelectionOpen(true);
      },
      onNodeClick: (
        _e: unknown,
        { type, id, data }: FlowElements.StartNode | TodoNode
      ) => {
        if (type !== 'start') {
          setEditing({ id, todo: _cloneDeep(data as TodoValue) });
        }
      },
    },
  };
}
