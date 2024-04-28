import type { ReactElement } from 'react';
import type { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';

import * as Palettes from './palettes';

export type PaletteCode = keyof typeof Palettes;

export type TransitionProps = MuiTransitionProps & {
  children: ReactElement;
};
