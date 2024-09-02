import _get from 'lodash/get';
import _set from 'lodash/set';
import { ReactFlowProvider } from '@xyflow/react';
import { digraph, toDot } from 'ts-graphviz';
import { nanoid } from 'nanoid';
import { useTranslation } from 'next-i18next';
import type { Todos } from '@weavcraft/common';
import '@xyflow/react/dist/style.css';

import * as Comp from '~web/components';
import Implementation from './EventFlowEditor.Implementation';
import { SlideDownTransition, SlideUpTransition } from '~web/themes';
import { useFlowElements, useTodoEditing } from './EventFlowEditor.hooks';
import type { EdgeType } from '../imports.types';
import type { EventFlowEditorProps } from './EventFlowEditor.types';

export default function EventFlowEditor({
  active,
  config,
  widget,
  onClose,
}: EventFlowEditorProps) {
  const { t } = useTranslation('pages');

  const { isSelectionOpen, editing, source, flowHandlers, ...editingHandlers } =
    useTodoEditing();

  const [{ edges, nodes }, setElements, onElementsChange] = useFlowElements(
    _get(config, ['events', active.config.id, active.eventPath])
  );

  const handleCreateTodo = () => {
    editingHandlers.onEditorClose();

    if (!source || !editing) {
      return;
    } else if (editing.id) {
      return setElements(
        'nodes',
        nodes.map((node) =>
          node.id !== editing.id ? node : { ...node, data: editing.todo }
        )
      );
    }

    const { id = nanoid(6), todo } = editing;

    edges.push({
      id: `${source.id}-${id}`,
      type: source.type,
      source: source.id,
      sourceHandle: source.type,
      target: id,
    });

    nodes.push({
      id,
      type: todo.type,
      data: todo,
      position: source.position,
    });

    setElements('edges', [...edges]);
    setElements('nodes', [...nodes]);
  };

  const handleClose = () => {
    const graph = digraph('G', (g) => {
      nodes.forEach(({ id, position }) =>
        g
          .node(id, { ...Comp.NODE_SIZE })
          .attributes.set('pos', `${position.x},${position.y}`)
      );

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
          nextTodos: edges
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
  };

  return (
    <>
      <ReactFlowProvider>
        <Implementation
          {...flowHandlers}
          {...{ edges, nodes, onElementsChange }}
          title={active.eventPath}
          widget={widget}
          onClose={handleClose}
          onEdgesChange={(e) => onElementsChange('edges', e)}
          onNodesChange={(n) => onElementsChange('nodes', n)}
          onConnect={({ source, sourceHandle, target }) => {
            if (sourceHandle && source !== target) {
              setElements('edges', [
                ...edges.filter((edge) => edge.source !== source),
                {
                  id: `${source}-${target}`,
                  type: sourceHandle as EdgeType,
                  source,
                  sourceHandle,
                  target,
                },
              ]);
            }
          }}
        />
      </ReactFlowProvider>

      <Comp.MenuDialog
        open={isSelectionOpen}
        subtitle={active.eventPath}
        title={t('ttl-add-todo')}
        onClose={editingHandlers.onSelectionClose}
        onItemClick={editingHandlers.onTypeSelect}
        items={Object.entries(Comp.TODO_ICONS).map(([type, icon]) => ({
          icon,
          label: `pages:lbl-todo-types.${type}`,
        }))}
      />

      <Comp.EditorDialog
        icon={editing && Comp.TODO_ICONS[editing.todo.type]}
        open={Boolean(editing)}
        title={t(`pages:lbl-todo-types.${editing?.todo.type}`)}
        onClose={editingHandlers.onEditorClose}
        onSubmit={handleCreateTodo}
        TransitionComponent={
          editing?.id ? SlideUpTransition : SlideDownTransition
        }
      >
        {editing && (
          <Comp.TodoFields
            value={editing.todo}
            onChange={editingHandlers.onEditorChange}
          />
        )}
      </Comp.EditorDialog>
    </>
  );
}
