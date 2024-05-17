import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './WidgetEditor.types';

export const useAppendNodeStyles = makeStyles({ name: 'AppendNode' })(
  (theme) => ({
    action: {
      border: `2px dashed ${theme.palette.divider}`,
    },
    node: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: theme.spacing(15),
      border: `2px dashed ${theme.palette.divider}`,
      borderRadius: theme.spacing(2),
      background: theme.palette.background.paper,
    },
  })
);

export const useMainStyles = makeStyles<StyleParams>({
  name: 'WidgetEditor',
})((theme, { marginTop }) => ({
  root: {
    marginTop:
      typeof marginTop === 'number' &&
      Number.isFinite(marginTop) &&
      !Number.isNaN(marginTop)
        ? marginTop
        : 0,
  },
}));
