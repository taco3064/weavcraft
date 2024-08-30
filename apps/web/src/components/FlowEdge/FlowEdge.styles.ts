import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './FlowEdge.types';

export const useMainStyles = makeStyles<MainStyleParams>({ name: 'FlowNode' })(
  (theme, { labelX, labelY }) => ({
    root: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
      padding: theme.spacing(1),

      '& > button': {
        pointerEvents: 'all',
      },
    },
  })
);
