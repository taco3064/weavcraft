import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import _merge from 'lodash/merge';
import _pick from 'lodash/pick';
import { PieChart } from '@mui/x-charts';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import TooltipContent from './PaletteViewer.TooltipContent';
import { useViewerStyles } from './PaletteViewer.styles';

import type {
  ColorName,
  DefaultSeriesProps,
  PaletteViewerProps,
} from './PaletteViewer.types';

export default function PaletteViewer({
  config,
  disableResponsiveText,
  size,
  onColorClick,
}: PaletteViewerProps) {
  const theme = useTheme();
  const palette = _merge({}, theme.palette, config);
  const mains = _pick(palette, ['primary', 'secondary']);
  const colors = _pick(palette, ['info', 'success', 'warning', 'error']);

  const { background } = palette;

  const { classes } = useViewerStyles({
    clickable: onColorClick instanceof Function,
    disableResponsiveText,
    palette,
    size,
  });

  const defaultSeriesProps = useMemo<DefaultSeriesProps>(
    () => ({
      paddingAngle: 4,
      cornerRadius: 8,
      cx: size / 2,
      cy: size / 2,
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { color: 'gray' },
    }),
    [size]
  );

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <Grid container columns={2} className={classes.background}>
        <Grid
          item
          xs={1}
          component={onColorClick ? ButtonBase : 'div'}
          onClick={() =>
            onColorClick?.([
              { name: 'background.default', color: background.default },
              { name: 'text.primary', color: palette.text.primary },
            ])
          }
        >
          <span>Default</span>
          <strong>{background.default}</strong>
        </Grid>

        <Grid
          item
          xs={1}
          component={onColorClick ? ButtonBase : 'div'}
          onClick={() =>
            onColorClick?.([
              { name: 'background.paper', color: background.paper },
              { name: 'text.secondary', color: palette.text.secondary },
            ])
          }
        >
          <span>Paper</span>
          <strong>{background.paper}</strong>
        </Grid>
      </Grid>

      <PieChart
        width={size}
        height={size}
        slotProps={{ legend: { hidden: true } }}
        tooltip={{ trigger: 'item', slots: { itemContent: TooltipContent } }}
        series={[
          {
            ...defaultSeriesProps,
            innerRadius: size / 20,
            outerRadius: (size / 10) * 3,
            startAngle: -90,
            valueFormatter: ({ id }) => mains[id as keyof typeof mains].main,
            data: Object.entries(mains).map(([id, { main, contrastText }]) => ({
              id,
              value: 10,
              label: id.replace(/^./, id.charAt(0).toUpperCase()),
              color: main,
              contrastText,
            })),
          },
          {
            ...defaultSeriesProps,
            innerRadius: (size / 10) * 3 + size / 20,
            outerRadius: size / 2,
            valueFormatter: ({ id }) => colors[id as keyof typeof colors].main,
            data: Object.entries(colors).map(
              ([id, { main, contrastText }]) => ({
                id,
                value: 10,
                label: id.replace(/^./, id.charAt(0).toUpperCase()),
                color: main,
                contrastText,
              })
            ),
          },
        ]}
        {...(onColorClick && {
          onItemClick: (_e, _identifier, item) => {
            const { id, color, contrastText } = item as Record<string, string>;

            onColorClick?.([
              { name: `${id}.main` as ColorName, color },
              {
                name: `${id}.contrastText` as ColorName,
                color: contrastText,
              },
            ]);
          },
        })}
      />
    </Container>
  );
}
