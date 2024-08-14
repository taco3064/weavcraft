import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'BreakpointStepper' })(
  (theme) => ({
    root: {
      width: '100%',
      background: 'transparent',
    },
    label: {
      minWidth: theme.spacing(15),
    },
  })
);
