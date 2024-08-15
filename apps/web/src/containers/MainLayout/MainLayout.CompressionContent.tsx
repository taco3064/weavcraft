import createBreakpoints from '@mui/system/createTheme/createBreakpoints';
import { ThemeProvider, type ThemeOptions } from '@mui/material/styles';
import { useBreakpointMatches } from '@weavcraft/core';
import { useCallback } from 'react';

import type { CompressionContentProps } from './MainLayout.types';

export default function CompressionContent({
  children,
  isDrawerOpen,
}: CompressionContentProps) {
  const { matched: isCompressed } = useBreakpointMatches({
    xs: false,
    md: isDrawerOpen,
  });

  const getCompressionTheme = useCallback(
    ({ breakpoints: { values }, ...outer }: Required<ThemeOptions>) => {
      const compression = isCompressed ? 444 : 0;

      return {
        ...outer,
        breakpoints: createBreakpoints({
          values: Object.fromEntries(
            Object.entries(values || {}).map(([key, value]) => [
              key,
              Math.max(0, key === 'xs' ? 0 : value + compression),
            ])
          ) as typeof values,
        }),
      };
    },
    [isCompressed]
  );

  return <ThemeProvider theme={getCompressionTheme}>{children}</ThemeProvider>;
}
