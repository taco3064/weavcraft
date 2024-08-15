import type { Breakpoint } from '@mui/material/styles';
import type { SetRequired } from 'type-fest';

export type BreakpointValues<T> = SetRequired<{ [K in Breakpoint]?: T }, 'xs'>;

export type BreakpointMatches<T> = {
  breakpoint: Breakpoint;
  matched: T;
};
