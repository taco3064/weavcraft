import * as Flow from '@xyflow/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Fab from '@mui/material/Fab';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import * as Comp from '~web/components';
import StartNode from './EventFlowEditor.StartNode';
import { useAutoFitView } from './EventFlowEditor.hooks';
import { useMainStyles } from './EventFlowEditor.styles';
import type { EdgeType } from '../imports.types';
import type { ImplementationProps } from './EventFlowEditor.types';

const FIT_VIEW_DURATION = 400;
const NODE_TYPES = { ...Comp.FlowNodes, start: StartNode };

export default function Implementation({
  fitViewHash,
  edges,
  nodes,
  title,
  widget,
  onClose,
  onCreateNode,
  ...props
}: ImplementationProps) {
  const setDisableFitView = useAutoFitView(FIT_VIEW_DURATION, nodes);

  const { fitView, screenToFlowPosition } = Flow.useReactFlow();
  const { t } = useTranslation();
  const { classes, theme } = useMainStyles();

  const handleConnectEnd = (
    e: MouseEvent | TouchEvent,
    { fromHandle, fromNode, toNode }: Flow.FinalConnectionState
  ) => {
    if (!fromNode || toNode) {
      return;
    }

    const { x, y } = screenToFlowPosition({
      x: _get(e, ['clientX']) as number,
      y: _get(e, ['clientY']) as number,
    });

    onCreateNode({
      id: fromNode.id,
      type: fromHandle?.id as EdgeType,
      position: {
        y,
        x: x - Comp.NODE_SIZE.width / 2,
      },
    });
  };

  return (
    <Comp.EditorList
      className={classes.root}
      title={title}
      description={t(`widgets:lbl-component.${widget.payload.component}`)}
      icon={<AccountTreeIcon color="primary" />}
      onClose={onClose}
      render={() => (
        <ListItem disablePadding disableGutters className={classes.flow}>
          <Flow.ReactFlow
            {...props}
            {...{ edges, nodes }}
            fitView
            fitViewOptions={{ duration: FIT_VIEW_DURATION }}
            connectionLineType={Flow.ConnectionLineType.Bezier}
            edgeTypes={Comp.FlowEdges}
            nodeTypes={NODE_TYPES}
            onNodeDragStart={() => setDisableFitView(true)}
            onNodeDragStop={() => setDisableFitView(false)}
            onConnectEnd={handleConnectEnd}
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
  );
}
