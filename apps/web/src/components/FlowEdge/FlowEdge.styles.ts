import * as Flow from '@xyflow/react';
import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './FlowEdge.types';

const LINE_TYPE_ID: keyof typeof Flow.ConnectionLineType = 'SmoothStep';

export const LINE_TYPE = Flow.ConnectionLineType[LINE_TYPE_ID];
export const getEdgePath = Flow[`get${LINE_TYPE_ID}Path`];

export const useMainStyles = makeStyles<MainStyleParams>({ name: 'FlowNode' })(
  (theme, { hasLabelText, labelX, labelY }) => ({
    root: {
      pointerEvents: 'all',
      strokeWidth: '2px !important',
      opacity: 0.8,

      '&:hover': {
        opacity: 1,
        strokeWidth: '4px !important',
      },
      '& + path': {
        pointerEvents: 'none',
      },
    },
    label: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'transparent',
      padding: theme.spacing(1),
      fontSize: theme.typography.caption.fontSize,
      zIndex: theme.zIndex.tooltip + 1,
      transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px) ${
        !hasLabelText ? '' : `translateY(${theme.typography.caption.fontSize})`
      }`,

      '& > button': {
        pointerEvents: 'all',
      },
    },
  })
);
