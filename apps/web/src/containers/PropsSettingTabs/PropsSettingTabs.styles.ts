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
    row: {
      '& > *': {
        margin: '0 !important',
      },
    },
    tabs: {
      marginBottom: theme.spacing(2),
      '& + *': {
        height: '100%',
        overflow: 'hidden auto',
      },
    },
  })
);
