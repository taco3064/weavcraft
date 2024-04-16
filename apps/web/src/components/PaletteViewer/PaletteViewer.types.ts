import type { PieChartProps } from '@mui/x-charts';
import type { ThemePalette } from '@weavcraft/types';

export type DefaultSeriesProps = Partial<PieChartProps['series'][number]>;

export interface PaletteViewerProps {
  config?: ThemePalette;
}
