import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'PageContainer' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    alignItems: 'center',
  },
}));
