import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'EditorList' })((theme) => ({
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
  subheader: {
    background: 'inherit',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'auto',
    minWidth: theme.spacing(6),
    width: theme.spacing(6),
    marginRight: theme.spacing(1),

    '& > *': {
      color: `${theme.palette.primary.contrastText} !important`,
      background: `${theme.palette.primary.main} !important`,
    },
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: theme.spacing(6),
    width: theme.spacing(6),
    marginRight: theme.spacing(1),
  },
  subitem: {
    paddingLeft: theme.spacing(9),
  },
}));
