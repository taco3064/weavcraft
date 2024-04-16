import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Zoom from '@mui/material/Zoom';
import _merge from 'lodash/merge';
import _pick from 'lodash/pick';
import { PieChart } from '@mui/x-charts';
import { useTheme } from '@mui/material/styles';

import { useViewerStyles } from './PaletteViewer.styles';

import type {
  DefaultSeriesProps,
  PaletteViewerProps,
} from './PaletteViewer.types';

const DEFAULT_SERIES_PROPS: DefaultSeriesProps = {
  paddingAngle: 4,
  cornerRadius: 8,
  cx: 100,
  cy: 100,
  highlightScope: { faded: 'global', highlighted: 'item' },
  faded: { color: 'gray' },
};

export default function PaletteViewer({ config }: PaletteViewerProps) {
  const theme = useTheme();
  const palette = _merge({}, theme.palette, config);
  const mains = _pick(palette, ['primary', 'secondary']);
  const colors = _pick(palette, ['info', 'success', 'warning', 'error']);

  const { background } = palette;
  const { classes } = useViewerStyles(palette);

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
          width={200}
          height={200}
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              ...DEFAULT_SERIES_PROPS,
              innerRadius: 10,
              outerRadius: 60,
              startAngle: -90,
              valueFormatter: ({ id }) => mains[id as keyof typeof mains].main,
              data: Object.entries(mains).map(([id, { main }]) => ({
                id,
                value: 10,
                label: id.replace(/^./, id.charAt(0).toUpperCase()),
                color: main,
              })),
            },
            {
              ...DEFAULT_SERIES_PROPS,
              innerRadius: 70,
              outerRadius: 100,
              valueFormatter: ({ id }) =>
                colors[id as keyof typeof colors].main,
              data: Object.entries(colors).map(([id, { main }]) => ({
                id,
                value: 10,
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
