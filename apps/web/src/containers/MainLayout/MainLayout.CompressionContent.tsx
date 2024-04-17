import {
  ThemeProvider,
  createTheme,
  type ThemeOptions,
} from '@mui/material/styles';

import { useBreakpointMatches } from '~web/hooks';
import type { CompressionContentProps } from './MainLayout.types';

function getCompressionTheme({
  breakpoints: { values },
  ...outer
}: Required<ThemeOptions>) {
  const { breakpoints } = createTheme({
    breakpoints: {
      values: Object.fromEntries(
        Object.entries(values || {}).map(([key, value]) => [
          key,
          Math.max(0, key === 'xs' ? 0 : value + 444),
        ])
      ) as typeof values,
    },
  });

  return { ...outer, breakpoints };
}

export default function CompressionContent({
  children,
  isNavMenuOpen,
}: CompressionContentProps) {
  const { matched: isCompressed } = useBreakpointMatches({
    xs: false,
    md: isNavMenuOpen,
  });

  return !isCompressed ? (
    children
  ) : (
    <ThemeProvider theme={getCompressionTheme}>{children}</ThemeProvider>
  );
}
