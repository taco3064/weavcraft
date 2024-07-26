import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './PageLayoutsEditor.types';

export const useMainStyles = makeStyles<MainStyleParams>({
  name: 'PageLayoutsEditor',
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
