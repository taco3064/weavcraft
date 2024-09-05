import * as Flow from '@xyflow/react';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'next-i18next';

import NodeLabel from './FlowNode.Label';
import { FlowHandle } from '~web/styles';
import { SUB_FLOW_SIZE } from './FlowNode.const';
import { useNextTodoUpdate } from '~web/hooks';
import { useSubFlowStyles } from './FlowNode.styles';
import type { SubFlowProps } from './FlowNode.types';

export default function SubFlow({ data, id }: SubFlowProps) {
  const { type, description } = data;
  const { t } = useTranslation();
  const { deleteElements, getNodes, updateNode } = Flow.useReactFlow();
  const { classes } = useSubFlowStyles();

  const updateNextTodo = useNextTodoUpdate(id);
  const oriWidthRef = useRef<number>();
  const getNodesRef = useRef(getNodes);

  const handleResizeStart = useCallback<Flow.OnResizeStart>((_e, { width }) => {
    oriWidthRef.current = width;
  }, []);

  const handleResizeEnd = useCallback<Flow.OnResizeEnd>(
    (_e, { width }) => {
      const x = (width - (oriWidthRef.current || 0)) / 2;

      getNodes().forEach(({ id: subId, parentId, position }) => {
        if (parentId === id) {
          updateNode(subId, {
            position: { ...position, x: position.x + x },
          });
        }
      });
    },
    [id, getNodes, updateNode]
  );

  useImperativeHandle(getNodesRef, () => getNodes, [getNodes]);

  return (
    <>
      <FlowHandle type="target" position={Flow.Position.Top} />

      <Tooltip title={t('pages:opt-source-types.next')}>
        <FlowHandle id="next" position={Flow.Position.Bottom} type="source" />
      </Tooltip>

      <Flow.NodeResizer
        minWidth={SUB_FLOW_SIZE.width}
        minHeight={SUB_FLOW_SIZE.height}
        handleClassName={classes.resizer}
        lineClassName={classes.line}
        onResizeStart={handleResizeStart}
        onResizeEnd={handleResizeEnd}
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
