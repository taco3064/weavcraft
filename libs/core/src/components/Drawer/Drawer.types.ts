import MuiDrawer from '@mui/material/Drawer';
import MuiPaper from '@mui/material/Paper';
import type { Breakpoint } from '@mui/material/styles';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import type { BaseToolbarProps } from '../Toolbar';
import type { IconCode } from '../Icon';
import type { PrefixProps, PropsWithMappedData } from '../../contexts';

type MuiPaperProps = Pick<ComponentProps<typeof MuiPaper>, 'elevation'>;
type MuiDrawerProps = Pick<ComponentProps<typeof MuiDrawer>, 'anchor'>;

type ToolbarProps = Pick<
  BaseToolbarProps,
  'color' | 'elevation' | 'title' | 'variant'
>;

export interface DrawerProps
  extends MuiPaperProps,
    Omit<MuiDrawerProps, 'anchor'>,
    PrefixProps<ToolbarProps, 'header'> {
  anchor?: Extract<MuiDrawerProps['anchor'], 'left' | 'right'>;
  breakpoint?: Exclude<Breakpoint, 'xs'>;
  children?: ReactNode;
  content?: ReactElement;
  header?: ReactNode;
  headerIcon?: IconCode;
  height?: Property.Height;
  title?: string;
  toggleIcon?: IconCode;
  width?: number;
}

export type AnchorOptions = Record<
  NonNullable<DrawerProps['anchor']>,
  {
    closeIcon: IconCode;
    direction: Property.FlexDirection;
  }
>;

export interface DrawerStyleParams
  extends Required<Pick<DrawerProps, 'breakpoint' | 'height' | 'width'>> {
  open: boolean;
}

export type MappablePropNames = keyof Pick<
  DrawerProps,
  'children' | 'content' | 'headerIcon' | 'headerTitle'
>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  DrawerProps,
  MappablePropNames
>;
