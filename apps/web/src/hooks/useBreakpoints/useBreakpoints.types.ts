import type { Breakpoint } from '@mui/material/styles';

export type BreakpointValues<T> = {
  [breakpoint in Exclude<Breakpoint, 'xs'>]?: T;
} & {
  [breakpoint in Extract<Breakpoint, 'xs'>]: T;
};

export type BreakpointMatches<T> = {
  breakpoint: Breakpoint;
  matched: T;
};
