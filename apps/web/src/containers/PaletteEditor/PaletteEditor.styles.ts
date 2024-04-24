import { makeStyles } from 'tss-react/mui';

export const useEditorStyles = makeStyles({ name: 'PaletteEditor' })(
  (theme) => ({
    list: {
      background: 'inherit',
      height: '100%',
      overflow: 'hidden auto',

      '& > *': {
        gap: 0,
      },
      '& > li:first-of-type': {
        display: 'flex',
        background: 'inherit',
        height: theme.spacing(8),
        alignItems: 'center',
      },
    },
  })
);
