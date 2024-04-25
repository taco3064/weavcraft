import { makeStyles } from 'tss-react/mui';
import type { StyleParams } from './PaletteEditor.types';

export const useEditorStyles = makeStyles({ name: 'ColorEditor' })((theme) => ({
  root: {
    background: 'inherit',
    height: '100%',
    overflow: 'hidden auto',

    '& > *': {
      gap: 0,
    },
    '& > li:first-of-type': {
      display: 'flex',
      background: 'inherit',
      height: theme.spacing(8),
      alignItems: 'center',
    },
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 'auto',
    width: theme.spacing(7),

    '& > *': {
      color: `${theme.palette.primary.contrastText} !important`,
      background: `${theme.palette.primary.main} !important`,
    },
  },
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    transform: `translateX(${theme.spacing(-3.5)})`,
  },
}));

export const useMainStyles = makeStyles<StyleParams>({
  name: 'PaletteEditor',
})((theme, { size }) => ({
  root: {
    marginTop: `max(${theme.spacing(6)}, calc(50vh - ${size}px))`,
  },
}));
