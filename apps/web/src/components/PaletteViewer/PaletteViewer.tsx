import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import _get from 'lodash/get';
import { PieChart } from '@mui/x-charts';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

import TooltipContent from './PaletteViewer.TooltipContent';
import { useViewerStyles } from './PaletteViewer.styles';

import type {
  ColorName,
  DefaultSeriesProps,
  PaletteViewerProps,
  PrimaryColor,
  SecondaryColor,
} from './PaletteViewer.types';

const primaries: PrimaryColor[] = ['primary', 'secondary'];
const secondaries: SecondaryColor[] = ['info', 'success', 'warning', 'error'];

export default function PaletteViewer({
  config,
  disableBorderRadius,
  disableResponsiveText,
  size,
  onColorClick,
}: PaletteViewerProps) {
  const theme = useTheme();

  const { t } = useTranslation();
  const { background, text } = config || {};

  const { classes } = useViewerStyles({
    clickable: onColorClick instanceof Function,
    config,
    disableBorderRadius,
    disableResponsiveText,
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
              { name: 'background.default', color: background?.default },
              { name: 'text.primary', color: text?.primary },
            ])
          }
        >
          <span>Default</span>
          <strong>{background?.default || t('themes:lbl-none')}</strong>
        </Grid>

        <Grid
          item
          xs={1}
          component={onColorClick ? ButtonBase : 'div'}
          onClick={() =>
            onColorClick?.([
              { name: 'background.paper', color: background?.paper },
              { name: 'text.secondary', color: text?.secondary },
            ])
          }
        >
          <span>Paper</span>
          <strong>{background?.paper || t('themes:lbl-none')}</strong>
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
            valueFormatter: ({ id }) =>
              _get(config, [id as PrimaryColor, 'main']) ||
              t('themes:lbl-none'),
            data: primaries.map((id) => {
              const { main = theme.palette.divider, contrastText } =
                _get(config, id) || {};

              return {
                id,
                value: 10,
                label: id.replace(/^./, id.charAt(0).toUpperCase()),
                color: main,
                contrastText,
              };
            }),
          },
          {
            ...defaultSeriesProps,
            innerRadius: (size / 10) * 3 + size / 20,
            outerRadius: size / 2,
            valueFormatter: ({ id }) =>
              _get(config, [id as SecondaryColor, 'main']) ||
              t('themes:lbl-none'),
            data: secondaries.map((id) => {
              const { main = theme.palette.divider, contrastText } =
                _get(config, id) || {};

              return {
                id,
                value: 10,
                label: id.replace(/^./, id.charAt(0).toUpperCase()),
                color: main,
                contrastText,
              };
            }),
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
