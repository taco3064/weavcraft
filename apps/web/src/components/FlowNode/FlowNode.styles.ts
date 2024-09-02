import _get from 'lodash/get';
import { makeStyles } from 'tss-react/mui';

import * as CONST from './FlowNode.const';
import type { MainStyleParams } from './FlowNode.types';

export const useMainStyles = makeStyles<MainStyleParams>({ name: 'FlowNode' })(
  (theme, { type }) => ({
    root: {
      borderRadius: theme.spacing(2),
      color: theme.palette.primary.main,
      padding: theme.spacing(1),
      ...CONST.NODE_SIZE,

      background: `${_get(theme.palette, [
        CONST.NODE_BACKGROUND[type],
        'main',
      ])} !important`,

      '&:hover': {
        opacity: 0.8,
        transform: 'scale(1.02)',
      },
    },
    icon: {
      minWidth: theme.spacing(5),
      justifyContent: 'center',
      color: 'inherit',
    },
  })
);
