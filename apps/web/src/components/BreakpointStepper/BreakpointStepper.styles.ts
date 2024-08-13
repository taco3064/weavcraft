import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'BreakpointStepper' })(
  (theme) => ({
    root: {
      width: '100%',
    },
    stepper: {
      width: '100%',
      background: 'transparent',
    },
  })
);
