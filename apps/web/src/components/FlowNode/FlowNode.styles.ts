import _get from 'lodash/get';
import { makeStyles } from 'tss-react/mui';

import { NODE_BACKGROUND } from './FlowNode.const';
import type { MainStyleParams } from './FlowNode.types';

export const useSubFlowStyles = makeStyles({ name: 'SubFlow' })((theme) => ({
  divider: {
    borderColor: _get(theme.palette, [NODE_BACKGROUND.Iterate, 'main']),
    borderWidth: 1,
    borderStyle: 'dashed',
  },
}));

export const useLabelStyles = makeStyles<MainStyleParams>({ name: 'FlowNode' })(
  (theme, { borderStyle, size, type }) => {
    const color = _get(theme.palette, [NODE_BACKGROUND[type], 'main']);

    return {
      root: {
        borderRadius: theme.spacing(2),
        border: `2px ${borderStyle} ${color}`,
        color,
        minWidth: size.width,
        minHeight: size.height,
        height: '100%',
      },
      action: {
        marginTop: '0 !important',
        marginBottom: '0 !important',
      },
      avatar: {
        background: color,
        color: _get(theme.palette, [NODE_BACKGROUND[type], 'contrastText']),
      },
    };
  }
);
