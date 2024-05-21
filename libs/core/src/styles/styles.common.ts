import { makeStyles } from 'tss-react/mui';

export const useCommonStyles = makeStyles({ name: 'CoreCommon' })((theme) => ({
  fullWidth: {
    width: '100%',
  },
  minHeight: {
    minHeight: theme.spacing(6),
  },
}));
