import Grid from '@mui/material/Grid';

import { useDisplayStyles } from './PaletteDisplay.styles';
import type { PaletteDisplayProps } from './PaletteDisplay.types';

export default function PaletteDisplay({ payload }: PaletteDisplayProps) {
  const { classes } = useDisplayStyles(payload);

  const { background, primary, secondary, info, success, warning, error } =
    payload;

  return (
    <Grid container columns={2} className={classes.root}>
      <Grid item xs={1}>
        <span>Default</span>
        <strong>{background.default}</strong>
      </Grid>

      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.colors}
      >
        {Object.entries({
          primary,
          secondary,
          info,
          success,
          warning,
          error,
        }).map(([name, { main, contrastText }], i) => (
          <Grid key={i} item sx={{ bgcolor: main, color: contrastText }}>
            {name.replace(/^./, name.charAt(0).toUpperCase())}
            <strong>{main}</strong>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={1}>
        <span>Paper</span>
        <strong>{background.paper}</strong>
      </Grid>
    </Grid>
  );
}
