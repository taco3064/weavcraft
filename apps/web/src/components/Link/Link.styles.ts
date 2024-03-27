import { makeStyles } from 'tss-react/mui';

export const useLinkStyles = makeStyles({
  name: 'Link',
})((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontWeight: 500,
    userSelect: 'none',

    '&:hover': {
      filter: 'brightness(1.2)',
      fontWeight: 600,
    },
  },
}));
