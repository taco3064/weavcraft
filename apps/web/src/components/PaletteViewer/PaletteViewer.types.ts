import type { Palette } from '@mui/material/styles';
import type { PieChartProps } from '@mui/x-charts';
import type { ThemePalette } from '@weavcraft/types';

export type DefaultSeriesProps = Partial<PieChartProps['series'][number]>;

export interface ViewerStyleParams {
  palette: Palette;
  clickable: boolean;
  size: number;
}

export type ColorName =
  | 'background.default'
  | 'background.paper'
  | 'text.primary'
  | 'text.secondary'
  | 'primary.main'
  | 'primary.contrastText'
  | 'secondary.main'
  | 'secondary.contrastText'
  | 'info.main'
  | 'info.contrastText'
  | 'success.main'
  | 'success.contrastText'
  | 'warning.main'
  | 'warning.contrastText'
  | 'error.main'
  | 'error.contrastText';

export interface PaletteViewerProps {
  config?: ThemePalette;
  size: number;
  onColorClick?: (e: { name: ColorName; color: string }[]) => void;
}
