import Tooltip from '@mui/material/Tooltip';
import { NodeResizer, Position, useReactFlow } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import { FlowHandle } from '~web/styles';
import { NODE_SIZE } from './FlowNode.const';
import type { SubFlowProps } from './FlowNode.types';

export default function SubFlow({ data, id, selected }: SubFlowProps) {
  const { type, description } = data;
  const { t } = useTranslation();

  return (
    <>
      <NodeResizer
        isVisible
        minWidth={NODE_SIZE.width}
        minHeight={NODE_SIZE.height}
      />
      <FlowHandle type="target" position={Position.Top} />

      <Tooltip title={t('pages:opt-source-types.next')}>
        <FlowHandle id="next" position={Position.Bottom} type="source" />
      </Tooltip>
    </>
  );
}
