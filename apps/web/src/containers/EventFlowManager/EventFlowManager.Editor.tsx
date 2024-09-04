import * as Flow from '@xyflow/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Core from '@weavcraft/core';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'next-i18next';

import * as Comp from '~web/components';
import StartNode from './EventFlowManager.StartNode';
import { EditorModeEnum } from './EventFlowManager.types';
import { SlideDownTransition } from '~web/themes';
import { useEditorStyles } from './EventFlowManager.styles';
import type { DoneRef, EditorProps } from './EventFlowManager.types';

import {
  useFlowProps,
  useTodoEdit,
  useValidation,
} from './EventFlowManager.hooks';

const FIT_VIEW_DURATION = 400;
const NODE_TYPES = { ...Comp.FlowNodes, start: StartNode };

export default forwardRef<DoneRef, EditorProps>(function Editor(
  { title, description, onClose, ...props },
  ref
) {
  const { fitView } = Flow.useReactFlow();
  const { t } = useTranslation('pages');
  const { classes, theme } = useEditorStyles();

  const [{ edges, nodes }, setFlowState, handlers] = useFlowProps(
    FIT_VIEW_DURATION,
    props
  );

  const [{ mode, editing }, editingHandlers] = useTodoEdit(setFlowState);
  const [orphanCount, onDone] = useValidation({ edges, nodes, onClose });

  useImperativeHandle(ref, () => onDone, [onDone]);

  return (
    <>
      <Comp.EditorList
        {...{ title, description }}
        className={classes.root}
        icon={<AccountTreeIcon color="primary" />}
        onClose={onDone}
        renderCloseButton={
          !orphanCount
            ? undefined
            : () => (
                <Comp.ConfirmToggle
                  subject={t('ttl-orphan-confirm')}
                  message={t('msg-orphan-confirm', { count: orphanCount })}
                  onConfirm={onDone}
                  toggle={
                    <IconButton size="large">
                      <Core.Icon code="faClose" />
                    </IconButton>
                  }
                />
              )
        }
        render={() => (
          <ListItem disablePadding disableGutters className={classes.flow}>
            <Flow.ReactFlow
              {...handlers}
              {...{ edges, nodes }}
              fitView
              fitViewOptions={{ duration: FIT_VIEW_DURATION }}
              connectionLineType={Flow.ConnectionLineType.Bezier}
              edgeTypes={Comp.FlowEdges}
              nodeTypes={NODE_TYPES}
              onConnectEnd={editingHandlers.onNodeCreate}
              onNodeClick={editingHandlers.onNodeEdit}
              defaultEdgeOptions={{
                style: {
                  stroke: theme.palette.text.secondary,
                },
                markerEnd: {
                  type: Flow.MarkerType.ArrowClosed,
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <Flow.Background color={theme.palette.text.primary} gap={16} />
            </Flow.ReactFlow>

            <Tooltip title={t('btn-fit-view')}>
              <Fab
                className={classes.fitView}
                color="default"
                size="large"
                onClick={() => fitView({ duration: 400 })}
              >
                <CropFreeIcon fontSize="large" />
              </Fab>
            </Tooltip>
          </ListItem>
        )}
      />

      <Comp.MenuDialog
        open={mode === EditorModeEnum.TypeSelection}
        subtitle={title}
        title={t('ttl-add-todo')}
        onClose={editingHandlers.onEdtingClose}
        onItemClick={editingHandlers.onTypeSelect}
        items={Object.entries(Comp.TODO_ICONS).map(([type, icon]) => ({
          icon,
          label: `pages:lbl-todo-types.${type}`,
        }))}
      />

      <Comp.EditorDialog
        TransitionComponent={SlideDownTransition}
        icon={editing?.todo && Comp.TODO_ICONS[editing.todo.type]}
        open={mode === EditorModeEnum.CreateTodo}
        title={t(`pages:lbl-todo-types.${editing?.todo?.type}`)}
        onClose={() => editingHandlers.onEdtingClose(true)}
        onSubmit={editingHandlers.onTodoCreate}
      >
        {editing?.todo && (
          <Comp.TodoFields
            value={editing.todo}
            onChange={editingHandlers.onEditingChange}
          />
        )}
      </Comp.EditorDialog>

      <Comp.EditorDialog
        icon={editing?.todo && Comp.TODO_ICONS[editing.todo.type]}
        open={mode === EditorModeEnum.EditTodo}
        title={t(`pages:lbl-todo-types.${editing?.todo?.type}`)}
        onClose={() => editingHandlers.onEdtingClose(true)}
        onSubmit={editingHandlers.onTodoUpdate}
      >
        {editing?.todo && (
          <Comp.TodoFields
            value={editing.todo}
            onChange={editingHandlers.onEditingChange}
          />
        )}
      </Comp.EditorDialog>
    </>
  );
});
