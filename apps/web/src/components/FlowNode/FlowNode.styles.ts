import _get from 'lodash/get';
import { makeStyles } from 'tss-react/mui';

import { NODE_BACKGROUND } from './FlowNode.const';
import type { MainStyleParams } from './FlowNode.types';

export const useStartNodeStyles = makeStyles({ name: 'StartNode' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    node: {
      padding: 2,
      fontSize: theme.typography.h3.fontSize,
    },
  })
);

export const useSubFlowStyles = makeStyles({ name: 'SubFlow' })((theme) => ({
  divider: {
    borderColor: _get(theme.palette, [NODE_BACKGROUND.Iterate, 'main']),
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  line: {
    display: 'none !important',
  },
  resizer: {
    background: `${theme.palette.divider} !important`,
    width: `${theme.spacing(2)} !important`,
    height: `${theme.spacing(2)} !important`,

    '&.top': {
      display: 'none !important',
    },
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
