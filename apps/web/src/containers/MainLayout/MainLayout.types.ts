import type { Breakpoint } from '@mui/material/styles';
import type { ReactNode } from 'react';

export type StyleParams = {
  maxWidth?: Breakpoint;
  open: boolean;
};

export interface MainLayoutProps {
  children: ReactNode;
}
