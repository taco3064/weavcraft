import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'AddIconButton' })((theme) => ({
  toggle: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary.contrastText,
    margin: theme.spacing(1),
  },
}));
