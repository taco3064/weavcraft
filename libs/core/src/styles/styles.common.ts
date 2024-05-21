import { makeStyles } from 'tss-react/mui';

export const useCommonStyles = makeStyles({ name: 'CoreCommon' })((theme) => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  minHeight: {
    minHeight: theme.spacing(6),
  },
}));
