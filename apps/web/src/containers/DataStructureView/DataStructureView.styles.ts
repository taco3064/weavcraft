import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'DataStructureView' })(
  (theme) => ({
    toolbar: {
      padding: '0 !important',

      '&:hover': {
        background: 'transparent !important',
        cursor: 'default !important',
      },
      '& > div:first-child': {
        display: 'none !important',
      },
    },
    buttons: {
      '& > button': {
        padding: theme.spacing(0.5, 1),
        textTransform: 'capitalize',
      },
    },
  })
);
