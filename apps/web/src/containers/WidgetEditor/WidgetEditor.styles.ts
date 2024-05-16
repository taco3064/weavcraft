import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './WidgetEditor.types';

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
