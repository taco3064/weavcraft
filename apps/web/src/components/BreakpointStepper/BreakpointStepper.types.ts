import type { AppBarProps } from '@mui/material/AppBar';
import type { Breakpoint } from '@mui/material/styles';

export interface BreakpointStepperProps {
  AppBarProps?: Omit<AppBarProps, 'children'>;
  disableNextButton?: boolean;
  value: Breakpoint;
  onChange: (value: Breakpoint) => void;
}
