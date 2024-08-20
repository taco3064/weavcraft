import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './PageLayoutsEditor.types';

export const useMainStyles = makeStyles<MainStyleParams>({
  name: 'PageLayoutsEditor',
})((theme, { margin, marginTop }) => ({
  root: {
    paddingBottom: theme.spacing(3),

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
    left: `calc(${theme.spacing(1.5)} + ${margin.left}px)`,
    right: `calc(${theme.spacing(1.5)} + ${margin.right}px)`,
  },
}));
