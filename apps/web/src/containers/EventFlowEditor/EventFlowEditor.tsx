import * as Flow from '@xyflow/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListItem from '@mui/material/ListItem';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import * as Comp from '~web/components';
import FlowToolbar from './EventFlowEditor.FlowToolbar';
import { useEventTodos, useFlowLayout } from './EventFlowEditor.hooks';
import { useMainStyles } from './EventFlowEditor.styles';
import type { EventFlowEditorProps } from './EventFlowEditor.types';
import type { TodoValue } from '../imports.types';

const FIT_VIEW_DURATION = 400;

export default function EventFlowEditor({
  active,
  config,
  widget,
  onChange,
  onClose,
}: EventFlowEditorProps) {
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<TodoValue>();

  const { t } = useTranslation();
  const { classes, theme } = useMainStyles();

  const { todos, onConnect, onEdgesDelete, onNodesDelete, onTodoCreate } =
    useEventTodos({
      active,
      config,
      onChange,
    });

  const { edges, nodes } = useFlowLayout(todos);

  return (
    <>
      <Comp.EditorList
        className={classes.root}
        title={active.eventPath}
        description={t(`widgets:lbl-component.${widget.payload.component}`)}
        icon={<AccountTreeIcon color="primary" />}
        onClose={onClose}
        render={() => (
          <ListItem disablePadding disableGutters className={classes.flow}>
            <Flow.ReactFlowProvider>
              <Flow.ReactFlow
                {...{ edges, nodes, onConnect, onEdgesDelete, onNodesDelete }}
                fitView
                fitViewOptions={{ duration: FIT_VIEW_DURATION }}
                connectionLineType={Flow.ConnectionLineType.SmoothStep}
                edgeTypes={Comp.FlowEdges}
                nodeTypes={Comp.FlowNodes}
                defaultEdgeOptions={{
                  markerEnd: { type: Flow.MarkerType.ArrowClosed },
                  style: { strokeWidth: 2 },
                }}
              >
                <Flow.Background color={theme.palette.text.primary} gap={16} />
              </Flow.ReactFlow>

              <FlowToolbar
                fitViewDuration={FIT_VIEW_DURATION}
                onTodoAdd={(type) => setEditing({ type })}
              />
            </Flow.ReactFlowProvider>
          </ListItem>
        )}
      />

      <Comp.EditorDialog
        icon={editing && Comp.TODO_ICONS[editing.type]}
        open={Boolean(editing)}
        title={t(`pages:lbl-todo-types.${editing?.type}`)}
        onClose={() => setEditing(undefined)}
        onSubmit={() =>
          startTransition(() => {
            onTodoCreate(editing as TodoValue);
            setEditing(undefined);
          })
        }
      >
        {editing && <Comp.TodoFields value={editing} onChange={setEditing} />}
      </Comp.EditorDialog>
    </>
  );
}
