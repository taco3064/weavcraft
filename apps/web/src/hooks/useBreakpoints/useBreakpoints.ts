import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/material/styles';

import { getBreakpointMatches } from './useBreakpoints.utils';

import type {
  BreakpointMatches,
  BreakpointValues,
} from './useBreakpoints.types';

export function useBreakpoint() {
  const theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export function useBreakpointMatches<T>(
  values: BreakpointValues<T>,
  assignation?: Breakpoint
): BreakpointMatches<T> {
  const theme = useTheme();
  const width = useBreakpoint();

  const breakpoints = theme.breakpoints.keys;
  const target = assignation || width;

  return useMemo(
    () => getBreakpointMatches<T>(breakpoints, values, target),
    [breakpoints, values, target]
  );
}
