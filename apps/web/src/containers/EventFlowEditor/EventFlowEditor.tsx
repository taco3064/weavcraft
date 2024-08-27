import * as Flow from '@xyflow/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListItem from '@mui/material/ListItem';
import _set from 'lodash/set';
import { nanoid } from 'nanoid';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import FlowToolbar, { TODO_ICONS } from './EventFlowEditor.FlowToolbar';
import { EditorDialog, EditorList, TodoFields } from '~web/components';
import { useFlowNodes } from './EventFlowEditor.hooks';
import { useMainStyles } from './EventFlowEditor.styles';
import type { EventFlowEditorProps } from './EventFlowEditor.types';
import type { TodoValue } from '../imports.types';

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

  const nodes = useFlowNodes(config, active);

  console.log(nodes);

  return (
    <>
      <EditorList
        className={classes.root}
        title={active.eventPath}
        description={t(`widgets:lbl-component.${widget.payload.component}`)}
        icon={<AccountTreeIcon color="primary" />}
        onClose={onClose}
        render={() => (
          <ListItem disablePadding disableGutters className={classes.flow}>
            <Flow.ReactFlowProvider>
              <Flow.ReactFlow
                {...{ nodes }}
                fitView
                connectionLineType={Flow.ConnectionLineType.SmoothStep}
                defaultEdgeOptions={{
                  type: Flow.ConnectionLineType.SmoothStep,
                  markerEnd: { type: Flow.MarkerType.ArrowClosed },
                  style: { strokeWidth: 2 },
                }}
              >
                <Flow.Background color={theme.palette.text.primary} gap={16} />
              </Flow.ReactFlow>

              <FlowToolbar onTodoAdd={(type) => setEditing({ type })} />
            </Flow.ReactFlowProvider>
          </ListItem>
        )}
      />

      <EditorDialog
        icon={editing && TODO_ICONS[editing.type]}
        open={Boolean(editing)}
        title={t(`pages:lbl-todo-types.${editing?.type}`)}
        onClose={() => setEditing(undefined)}
        onSubmit={() =>
          startTransition(() => {
            setEditing(undefined);

            onChange({
              ..._set(
                config,
                ['events', active.config.id, active.eventPath, nanoid(6)],
                editing
              ),
            });
          })
        }
      >
        {editing && <TodoFields value={editing} onChange={setEditing} />}
      </EditorDialog>
    </>
  );
}
