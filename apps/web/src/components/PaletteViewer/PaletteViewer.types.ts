import type { Palette } from '@mui/material/styles';
import type { PieChartProps } from '@mui/x-charts';
import type { ThemePalette } from '@weavcraft/types';

export type DefaultSeriesProps = Partial<PieChartProps['series'][number]>;
export type PaletteColor = { name: ColorName; color: string };

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
  disableResponsiveText?: boolean;
  size: number;
  onColorClick?: (e: PaletteColor[]) => void;
}

export interface ViewerStyleParams
  extends Pick<PaletteViewerProps, 'disableResponsiveText' | 'size'> {
  clickable: boolean;
  palette: Palette;
}
