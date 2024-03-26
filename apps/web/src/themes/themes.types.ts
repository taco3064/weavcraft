import type { PaletteOptions } from '@mui/material/styles';
import type { ReactNode } from 'react';

import * as Palettes from './palettes';

export interface ThemeProviderProps {
  children: ReactNode;
  palette?: PaletteOptions | keyof typeof Palettes;
}
