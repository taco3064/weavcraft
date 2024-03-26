import * as MuiStyle from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';

import * as Palettes from './palettes';
import { components } from './components';
import type { ThemeProviderProps } from './themes.types';

export default function ThemeProvider({
  children,
  palette = (global.localStorage.getItem('palette') ||
    Object.keys(Palettes)[0]) as keyof typeof Palettes,
}: ThemeProviderProps) {
  const theme = useMemo(
    () =>
      MuiStyle.createTheme({
        components,
        palette: typeof palette === 'string' ? Palettes[palette] : palette,
      }),
    [palette]
  );

  return (
    <MuiStyle.ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiStyle.ThemeProvider>
  );
}
