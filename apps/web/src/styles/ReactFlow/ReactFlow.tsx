import cx from 'clsx';
import { Handle, Position } from '@xyflow/react';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type { FlowHandleProps } from './ReactFlow.types';

export const FlowHandle = withStyles(
  forwardRef<HTMLDivElement, FlowHandleProps>(function FlowHandle(
    { className, classes, ...props },
    ref
  ) {
    return (
      <Handle {...props} ref={ref} className={cx(classes?.root, className)} />
    );
  }),
  (theme, { position }) => {
    const isVertical = [Position.Left, Position.Right].includes(position);

    return {
      root: {
        background: theme.palette.text.secondary,
        borderRadius: theme.spacing(1),
        width: theme.spacing(isVertical ? 1 : 3),
        height: theme.spacing(isVertical ? 3 : 1),
        zIndex: theme.zIndex.fab,

        ...(!isVertical && {
          [Position.Top === position ? 'top' : 'bottom']: theme.spacing(-1),
        }),
        ...(isVertical && {
          [Position.Left === position ? 'left' : 'right']: theme.spacing(-1),
        }),
        '&:hover': {
          borderColor: theme.palette.text.secondary,
          background: theme.palette.secondary.main,
        },
      },
    };
  }
);
