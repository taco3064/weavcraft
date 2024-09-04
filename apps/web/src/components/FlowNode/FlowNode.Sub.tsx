import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { NodeResizer, Position, useReactFlow } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import NodeLabel from './FlowNode.Label';
import { FlowHandle } from '~web/styles';
import { SUB_FLOW_SIZE } from './FlowNode.const';
import { useSubFlowStyles } from './FlowNode.styles';
import type { SubFlowProps } from './FlowNode.types';

export default function SubFlow({ data, id }: SubFlowProps) {
  const { type, description } = data;
  const { t } = useTranslation();
  const { deleteElements } = useReactFlow();
  const { classes } = useSubFlowStyles();

  return (
    <>
      <NodeResizer
        isVisible
        minWidth={SUB_FLOW_SIZE.width}
        minHeight={SUB_FLOW_SIZE.height}
      />

      <FlowHandle type="target" position={Position.Top} />

      <Tooltip title={t('pages:opt-source-types.next')}>
        <FlowHandle id="next" position={Position.Bottom} type="source" />
      </Tooltip>

      <NodeLabel
        {...{ type, id }}
        borderStyle="dashed"
        size={SUB_FLOW_SIZE}
        title={description || id}
        description={t(`pages:lbl-todo-types.${type}`)}
        onDelete={() =>
          deleteElements({
            nodes: [
              { id },
              ...Object.keys(data.config?.subTodos || {}).map((id) => ({ id })),
            ],
          })
        }
      >
        <Divider className={classes.divider} />
      </NodeLabel>
    </>
  );
}
