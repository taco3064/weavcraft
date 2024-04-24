import { makeStyles } from 'tss-react/mui';

export const usePageStyles = makeStyles({ name: 'Page' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    alignItems: 'center',
    minHeight: `calc(100vh - ${theme.spacing(20)})`,
  },
}));
