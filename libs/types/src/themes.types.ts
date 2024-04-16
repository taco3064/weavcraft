import type { Palette } from '@mui/material/styles';

export interface ThemePalette
  extends Pick<
    Palette,
    | 'background'
    | 'divider'
    | 'mode'
    | 'text'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  > {
  id: string;
}
