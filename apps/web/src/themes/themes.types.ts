import type { PaletteOptions } from '@mui/material/styles';
import type { ReactNode } from 'react';

import * as Palettes from './palettes';

type PalettePayload = {
  id: string;
  palette: PaletteOptions;
};

export type PaletteCode = keyof typeof Palettes;

export interface ThemeProviderProps {
  children: ReactNode;
  palette?: PalettePayload | PaletteCode;
}
