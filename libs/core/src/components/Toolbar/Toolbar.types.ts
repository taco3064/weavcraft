import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';
import type { IconCode } from '../Icon';

type MuiAppBarProps = Pick<
  ComponentProps<typeof MuiAppBar>,
  'color' | 'elevation' | 'position' | 'square'
>;

type MuiToolbarProps = Pick<
  ComponentProps<typeof MuiToolbar>,
  'disableGutters' | 'variant'
>;

interface BaseToolbarProps extends MuiAppBarProps, MuiToolbarProps {
  children?: ReactNode;
  icon?: ReactElement | IconCode | null;
  title?: string;
}

export type ToolbarProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseToolbarProps,
  'icon' | 'title'
>;
