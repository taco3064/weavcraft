import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { NodeResizer, Position, useReactFlow } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import NodeLabel from './FlowNode.Label';
import { FlowHandle } from '~web/styles';
import { START_NODE, SUB_FLOW_SIZE } from './FlowNode.const';
import { useNextTodoUpdate } from '~web/hooks';
import { useSubFlowStyles } from './FlowNode.styles';
import type { SubFlowProps } from './FlowNode.types';

export default function SubFlow({ data, id, width }: SubFlowProps) {
  const updateNextTodo = useNextTodoUpdate(id);

  const { type, description } = data;
  const { t } = useTranslation();
  const { deleteElements, updateNode } = useReactFlow();
  const { classes } = useSubFlowStyles();

  return (
    <>
      <FlowHandle type="target" position={Position.Top} />

      <Tooltip title={t('pages:opt-source-types.next')}>
        <FlowHandle id="next" position={Position.Bottom} type="source" />
      </Tooltip>

      <NodeResizer
        isVisible
        nodeId={id}
        minWidth={SUB_FLOW_SIZE.width}
        minHeight={SUB_FLOW_SIZE.height}
        handleClassName={classes.resizer}
        lineClassName={classes.line}
        onResizeEnd={(_e, { width: w, height: h }) => {
          const subIds = Object.keys(data.config?.subTodos || {});
          const x = (w - (width || 0)) / 2;

          subIds.push(`${START_NODE.id}-${id}`);

          subIds.forEach((id) =>
            updateNode(id, ({ position }) => ({
              position: { ...position, x: position.x + x },
            }))
          );
        }}
      />

      <NodeLabel
        {...{ type, id }}
        borderStyle="dashed"
        size={SUB_FLOW_SIZE}
        title={description || id}
        description={t(`pages:lbl-todo-types.${type}`)}
        onDelete={() => {
          updateNextTodo();

          deleteElements({
            nodes: [
              { id },
              ...Object.keys(data.config?.subTodos || {}).map((id) => ({ id })),
            ],
          });
        }}
      >
        <Divider className={classes.divider} />
      </NodeLabel>
    </>
  );
}
