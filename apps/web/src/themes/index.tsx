import * as MuiStyle from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useMemo } from 'react';

import * as Palettes from './palettes';
import { components } from './components';
import type { ThemeProviderProps } from './themes.types';

export default function ThemeProvider({
  children,
  palette = (global.localStorage?.getItem('palette') ||
    Object.keys(Palettes)[0]) as keyof typeof Palettes,
}: ThemeProviderProps) {
  const { cache, theme } = useMemo(
    () => ({
      cache: createEmotionCache({
        key:
          typeof palette === 'string'
            ? palette.toLowerCase().replace(/_/g, '-')
            : palette.id,
      }),
      theme: MuiStyle.createTheme({
        components,
        palette:
          typeof palette === 'string' ? Palettes[palette] : palette.palette,
      }),
    }),
    [palette]
  );

  return (
    <CacheProvider value={cache}>
      <MuiStyle.ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiStyle.ThemeProvider>
    </CacheProvider>
  );
}
