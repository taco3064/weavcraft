import type { Breakpoint } from '@mui/material/styles';

import type {
  BreakpointMatches,
  BreakpointValues,
} from './useBreakpoints.types';

export function getBreakpointMatches<T>(
  breakpoints: readonly Breakpoint[],
  values: BreakpointValues<T>,
  assignation: Breakpoint
): BreakpointMatches<T> {
  const keys = breakpoints
    .slice(0, breakpoints.findIndex((b) => b === assignation) + 1)
    .reverse();

  for (const breakpoint of keys) {
    if (values[breakpoint]) {
      return { breakpoint, matched: values[breakpoint] as T };
    }
  }

  return { breakpoint: 'xs', matched: values.xs };
}
