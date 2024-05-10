import type {
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@mui/material/styles';

export interface ThemePalette
  extends Pick<PaletteOptions, 'background' | 'divider' | 'text'> {
  id: string;
  error?: SimplePaletteColorOptions;
  info?: SimplePaletteColorOptions;
  primary?: SimplePaletteColorOptions;
  secondary?: SimplePaletteColorOptions;
  success?: SimplePaletteColorOptions;
  warning?: SimplePaletteColorOptions;
}
