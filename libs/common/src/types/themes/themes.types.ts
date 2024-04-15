import type { Palette, SimplePaletteColorOptions } from '@mui/material/styles';

export interface ThemePalette
  extends Pick<Palette, 'background' | 'divider' | 'mode' | 'text'> {
  id: string;
  error: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
}
