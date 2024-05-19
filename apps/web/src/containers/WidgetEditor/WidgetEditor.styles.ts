import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './WidgetEditor.types';

export const useAppendNodeStyles = makeStyles({ name: 'AppendNode' })(
  (theme) => ({
    action: {
      border: `2px dashed ${theme.palette.divider}`,
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    borderRadius: theme.spacing(2),
    background: theme.palette.background.paper,
  },
}));
