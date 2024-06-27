import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import _get from 'lodash/get';
import { PieChart } from '@mui/x-charts';
import { useMemo, type MouseEvent } from 'react';
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
  className,
  config,
  disableBorder,
  disableBorderRadius,
  disableResponsiveText,
  size,
  onColorClick,
}: PaletteViewerProps) {
  const { t } = useTranslation();
  const { background, divider, text } = config || {};

  const { classes, cx } = useViewerStyles({
    clickable: onColorClick instanceof Function,
    config,
    disableBorder,
    disableBorderRadius,
    disableResponsiveText,
    size,
  });

  const theme = useTheme();
  const noneText = t('lbl-none');

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
    <Container
      disableGutters
      maxWidth={false}
      className={cx(classes.root, className)}
    >
      <Grid
        container
        columns={2}
        className={cx(classes.background, classes.responsiveFont)}
      >
        <Grid
          item
          xs={1}
          component={onColorClick ? ButtonBase : 'div'}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();

            onColorClick?.([
              { name: 'background.default', color: background?.default },
              { name: 'text.primary', color: text?.primary },
            ]);
          }}
        >
          <span>Default</span>
          <strong>{background?.default || noneText}</strong>
        </Grid>

        <Grid
          item
          xs={1}
          component={onColorClick ? ButtonBase : 'div'}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();

            onColorClick?.([
              { name: 'background.paper', color: background?.paper },
              { name: 'text.secondary', color: text?.secondary },
            ]);
          }}
        >
          <span>Paper</span>
          <strong>{background?.paper || noneText}</strong>
        </Grid>
      </Grid>

      <Divider
        className={cx(classes.divider, classes.responsiveFont)}
        component={onColorClick ? ButtonBase : 'div'}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();

          onColorClick?.([
            { name: 'divider', color: divider },
            { name: 'text.disabled', color: text?.disabled },
          ]);
        }}
      >
        <span>Divider</span>
        <strong>{divider || noneText}</strong>
      </Divider>

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
              _get(config, [id as PrimaryColor, 'main']) || noneText,
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
              _get(config, [id as SecondaryColor, 'main']) || noneText,
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
          onItemClick: (e, _identifier, item) => {
            const { id, color, contrastText } = item as Record<string, string>;

            e.stopPropagation();

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
