import * as Flow from '@xyflow/react';
import Paper from '@mui/material/Paper';
import Core from '@weavcraft/core';
import Fab from '@mui/material/Fab';

import { useMainStyles } from './FlowEdge.styles';
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
  const [edgePath, labelX, labelY] = Flow.getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { deleteElements } = Flow.useReactFlow();
  const { classes } = useMainStyles({ labelX, labelY });

  return (
    <>
      <Flow.BaseEdge {...props} path={edgePath} />

      <Flow.EdgeLabelRenderer>
        <Paper className={classes.root}>
          <Fab
            variant="extended"
            color="error"
            size="small"
            onClick={() => deleteElements({ edges: [{ id: props.id }] })}
          >
            <Core.Icon code="faClose" />
          </Fab>

          {label}
        </Paper>
      </Flow.EdgeLabelRenderer>
    </>
  );
}
