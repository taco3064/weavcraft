import type { PieChartProps } from '@mui/x-charts';
import type { ThemePalette } from '@weavcraft/types';

export type DefaultSeriesProps = Partial<PieChartProps['series'][number]>;
export type PaletteColor = { name: ColorName; color?: string };
export type PrimaryColor = 'primary' | 'secondary';
export type SecondaryColor = 'info' | 'success' | 'warning' | 'error';

export type ColorName =
  | 'background.default'
  | 'background.paper'
  | 'text.primary'
  | 'text.secondary'
  | `${PrimaryColor}.main`
  | `${PrimaryColor}.contrastText`
  | `${SecondaryColor}.main`
  | `${SecondaryColor}.contrastText`;

export interface PaletteViewerProps {
  config?: Partial<ThemePalette>;
  disableBorderRadius?: boolean;
  disableResponsiveText?: boolean;
  size: number;
  onColorClick?: (e: PaletteColor[]) => void;
}

export interface ViewerStyleParams
  extends Pick<
    PaletteViewerProps,
    'config' | 'disableBorderRadius' | 'disableResponsiveText' | 'size'
  > {
  clickable: boolean;
}
