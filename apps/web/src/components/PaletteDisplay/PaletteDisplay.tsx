import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Zoom from '@mui/material/Zoom';
import { PieChart } from '@mui/x-charts';

import { useDisplayStyles } from './PaletteDisplay.styles';
import type { PaletteDisplayProps } from './PaletteDisplay.types';

export default function PaletteDisplay({ payload }: PaletteDisplayProps) {
  const { classes } = useDisplayStyles(payload);

  const { background, primary, secondary, info, success, warning, error } =
    payload;

  return (
    <Zoom in timeout={600}>
      <Container disableGutters maxWidth={false} className={classes.root}>
        <Grid container columns={2} className={classes.background}>
          <Grid item xs={1}>
            <span>Default</span>
            <strong>{background.default}</strong>
          </Grid>

          <Grid item xs={1}>
            <span>Paper</span>
            <strong>{background.paper}</strong>
          </Grid>
        </Grid>

        <PieChart
          width={280}
          height={280}
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              paddingAngle: 4,
              cornerRadius: 8,
              innerRadius: 20,
              cx: 140,
              cy: 140,
              data: Object.entries({
                secondary,
                info,
                success,
                warning,
                error,
                primary,
              }).map(([id, { main }]) => ({
                id,
                value: /^(primary|secondary)$/.test(id) ? 3 : 2,
                label: id.replace(/^./, id.charAt(0).toUpperCase()),
                color: main,
              })),
            },
          ]}
        />
      </Container>
    </Zoom>
  );
}
