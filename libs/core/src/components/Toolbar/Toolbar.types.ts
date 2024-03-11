import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ComponentProps, ReactNode } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';
import type { IconCode } from '../Icon';

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
  icon?: IconCode;
  title?: string;
}

export type MappablePropNames = keyof Pick<ToolbarProps, 'icon' | 'title'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  ToolbarProps,
  MappablePropNames
>;
