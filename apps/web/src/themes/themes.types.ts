import type { PaletteOptions } from '@mui/material/styles';
import type { ReactNode } from 'react';

import * as Palettes from './palettes';

type PalettePayload = {
  id: string;
  palette: PaletteOptions;
};

export interface ThemeProviderProps {
  children: ReactNode;
  palette?: PalettePayload | keyof typeof Palettes;
}
