import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams } from './PaletteEditor.types';

export const useMainStyles = makeStyles<MainStyleParams>({
  name: 'PaletteEditor',
})((theme, { marginTop, size }) => ({
  root: {
    marginTop:
      typeof marginTop === 'number' &&
      Number.isFinite(marginTop) &&
      !Number.isNaN(marginTop)
        ? marginTop
        : `max(${theme.spacing(6)}, calc(50vh - ${size}px))`,
  },
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),

    '& .react-colorful': {
      width: '100%',
    },
  },
}));
