import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './PaletteEditor.types';

export const useEditorStyles = makeStyles({ name: 'ColorEditor' })((theme) => ({
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

export const useMainStyles = makeStyles<StyleParams>({
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
}));
