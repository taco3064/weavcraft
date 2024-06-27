import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'PropsSettingTabs' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100% - ${theme.spacing(8)})`,
      overflow: 'hidden auto',

      '& > *': {
        width: '100%',
      },
    },
    fullWidth: {
      width: '100% !important',
    },
    row: {
      width: '100%',

      '& > *': {
        margin: '0 !important',
      },
    },
  })
);
