import type { PieChartProps } from '@mui/x-charts';
import type { ThemePalette } from '../imports.types';

export type DefaultSeriesProps = Partial<PieChartProps['series'][number]>;
export type PaletteColor = { name: ColorName; color?: string };
export type PrimaryColor = 'primary' | 'secondary';
export type SecondaryColor = 'info' | 'success' | 'warning' | 'error';

export type TooltipStyleParams = Record<
  'id' | 'color' | 'contrastText',
  string
>;

export type ColorName =
  | 'background.default'
  | 'background.paper'
  | 'divider'
  | 'text.primary'
  | 'text.secondary'
  | 'text.disabled'
  | `${PrimaryColor}.main`
  | `${PrimaryColor}.contrastText`
  | `${SecondaryColor}.main`
  | `${SecondaryColor}.contrastText`;

export interface PaletteViewerProps {
  className?: string;
  config?: Partial<ThemePalette>;
  disableBorder?: boolean;
  disableBorderRadius?: boolean;
  disableResponsiveText?: boolean;
  size: number;
  onColorClick?: (e: PaletteColor[]) => void;
}

export interface ViewerStyleParams
  extends Pick<
    PaletteViewerProps,
    | 'config'
    | 'disableBorder'
    | 'disableBorderRadius'
    | 'disableResponsiveText'
    | 'size'
  > {
  clickable: boolean;
}
