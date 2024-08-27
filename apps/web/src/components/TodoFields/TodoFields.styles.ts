import { makeStyles } from 'tss-react/mui';
import type { TextFieldProps } from '@mui/material/TextField';

export const DEFAULT_PROPS: Pick<
  TextFieldProps,
  'fullWidth' | 'variant' | 'size' | 'color'
> = {
  fullWidth: true,
  variant: 'filled',
  size: 'small',
  color: 'secondary',
};

export const useFieldsStyles = makeStyles({ name: 'TodoFields' })((theme) => ({
  headers: {
    background: 'transparent',
    boxShadow: 'none',
    marginTop: theme.spacing(2),
  },
  item: {
    gap: theme.spacing(1),
  },
}));
