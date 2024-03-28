import { makeStyles } from 'tss-react/mui';

export const useDialogStyles = makeStyles({ name: 'MenuDialog' })((theme) => ({
  content: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1.5, 3),
  },
}));
