import Tooltip from '@mui/material/Tooltip';
import { Position, useReactFlow } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import NodeLabel from './FlowNode.Label';
import { FlowHandle } from '~web/styles';
import { TODO_SOURCE } from './FlowNode.const';
import type { FlowNodeProps } from './FlowNode.types';

export default function FlowNode({ data, id }: FlowNodeProps) {
  const { type, description } = data;
  const { t } = useTranslation();
  const { deleteElements } = useReactFlow();

  return (
    <>
      <FlowHandle type="target" position={Position.Top} />

      {Object.entries(TODO_SOURCE[type] || { next: Position.Bottom }).map(
        ([id, position]) => (
          <Tooltip key={id} title={t(`pages:opt-source-types.${id}`)}>
            <FlowHandle id={id} position={position} type="source" />
          </Tooltip>
        )
      )}

      <NodeLabel
        {...{ type, id }}
        title={description || id}
        description={t(`pages:lbl-todo-types.${type}`)}
        onDelete={() =>
          deleteElements({
            nodes: [{ id }],
          })
        }
      />
    </>
  );
}
