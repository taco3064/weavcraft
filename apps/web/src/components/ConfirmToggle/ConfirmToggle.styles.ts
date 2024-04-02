import { makeStyles } from 'tss-react/mui';

export const useToggleStyles = makeStyles({ name: 'ConfirmToggle' })(
  (theme) => ({
    root: {
      background: 'transparent',
    },
  })
);
