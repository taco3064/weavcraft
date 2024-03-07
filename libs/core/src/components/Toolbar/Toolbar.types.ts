import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ComponentProps, ReactNode } from 'react';

type MuiAppBarProps = Pick<
  ComponentProps<typeof MuiAppBar>,
  'color' | 'elevation' | 'position' | 'square'
>;

type MuiToolbarProps = Pick<
  ComponentProps<typeof MuiToolbar>,
  'disableGutters' | 'variant'
>;

export interface ToolbarProps extends MuiAppBarProps, MuiToolbarProps {
  children?: ReactNode;
}
