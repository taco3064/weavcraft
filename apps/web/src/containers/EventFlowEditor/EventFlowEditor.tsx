import * as Flow from '@xyflow/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import FlowToolbar from './EventFlowEditor.FlowToolbar';
import { EditorList } from '~web/components';
import { useMainStyles } from './EventFlowEditor.styles';
import type { EventFlowEditorProps } from './EventFlowEditor.types';

export default function EventFlowEditor({
  active,
  config,
  widget,
  onChange,
  onClose,
}: EventFlowEditorProps) {
  const { t } = useTranslation();
  const { classes, theme } = useMainStyles();

  console.log(config, onChange);

  return (
    <EditorList
      className={classes.root}
      title={active.eventPath}
      description={t(`widgets:lbl-component.${widget.payload.component}`)}
      icon={<AccountTreeIcon color="primary" />}
      onClose={onClose}
      render={() => (
        <ListItem disablePadding disableGutters className={classes.flow}>
          <Flow.ReactFlowProvider>
            <Flow.ReactFlow>
              <Flow.Background color={theme.palette.text.primary} gap={16} />
            </Flow.ReactFlow>

            <FlowToolbar onTodoAdd={console.log} />
          </Flow.ReactFlowProvider>
        </ListItem>
      )}
    />
  );
}
