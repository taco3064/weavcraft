import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'DataStructureView' })(
  (theme) => ({
    hidden: {
      display: 'none !important',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(6),

      '& > div:last-child': {
        marginLeft: 'auto',
      },
    },
  })
);
