import type { Palette, SimplePaletteColorOptions } from '@mui/material/styles';

type PaletteColor = Pick<SimplePaletteColorOptions, 'contrastText' | 'main'>;

export interface ThemePalette
  extends Pick<Palette, 'background' | 'divider' | 'mode' | 'text'> {
  id: string;
  error: PaletteColor;
  info: PaletteColor;
  primary: PaletteColor;
  secondary: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
}
