import { makeStyles } from 'tss-react/mui';

export const useDialogStyles = makeStyles({ name: 'MenuDialog' })((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  progress: {
    margin: theme.spacing(3),
  },
  item: {
    justifyContent: 'center',
    padding: theme.spacing(1.5, 3),
  },
}));
