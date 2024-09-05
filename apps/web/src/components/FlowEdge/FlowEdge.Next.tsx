import * as Flow from '@xyflow/react';
import Paper from '@mui/material/Paper';
import Core from '@weavcraft/core';
import Fab from '@mui/material/Fab';

import { getEdgePath, useMainStyles } from './FlowEdge.styles';
import { useNextTodoUpdate } from '~web/hooks';
import type { FlowEdgeProps } from './FlowEdge.types';

export default function NextEdge({
  label,
  sourcePosition,
  sourceX,
  sourceY,
  targetPosition,
  targetX,
  targetY,
  ...props
}: FlowEdgeProps) {
  const updateNextTodo = useNextTodoUpdate(props.target);
  const { deleteElements } = Flow.useReactFlow();

  const [edgePath, labelX, labelY] = getEdgePath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { classes } = useMainStyles({
    hasLabelText: Boolean(label),
    labelX,
    labelY,
  });

  return (
    <>
      <Flow.BaseEdge {...props} className={classes.root} path={edgePath} />

      <Flow.EdgeLabelRenderer>
        <Paper className={classes.label} elevation={0}>
          <Fab
            variant="extended"
            color="error"
            size="small"
            onClick={() => {
              updateNextTodo();
              deleteElements({ edges: [{ id: props.id }] });
            }}
          >
            <Core.Icon code="faClose" />
          </Fab>

          {label}
        </Paper>
      </Flow.EdgeLabelRenderer>
    </>
  );
}
