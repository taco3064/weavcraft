import { makeStyles } from 'tss-react/mui';

export const useMainStyles = makeStyles({ name: 'UserSettings' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

export const useSettingsStyles = makeStyles({ name: 'Settings' })((theme) => ({
  palettes: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: theme.spacing(3),
    margin: theme.spacing(1, 0),
    borderRadius: theme.spacing(2),
  },
  color: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));
