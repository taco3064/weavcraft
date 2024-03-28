import { makeStyles } from 'tss-react/mui';

export const useDialogStyles = makeStyles({ name: 'MenuDialog' })((theme) => ({
  content: {
    padding: 0,
  },
  item: {
    justifyContent: 'center',
    padding: theme.spacing(1.5, 3),
  },
}));
