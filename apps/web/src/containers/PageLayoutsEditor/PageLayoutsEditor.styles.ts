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
  breakpointStepper: {
    width: 'auto',
    top: 'auto',
    bottom: theme.spacing(1.5),
    left: theme.spacing(1.5),
    right: theme.spacing(1.5),
  },
}));
