import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';
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
  icon?: ReactElement | IconCode | null;
  title?: string;
}

export type MappablePropNames = keyof Pick<ToolbarProps, 'icon' | 'title'>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<ToolbarProps, 'icon'> & { icon?: IconCode },
  MappablePropNames
>;
