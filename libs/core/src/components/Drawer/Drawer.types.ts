import MuiDrawer from '@mui/material/Drawer';
import MuiPaper from '@mui/material/Paper';
import type { Breakpoint } from '@mui/material/styles';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import type { ToolbarProps } from '../Toolbar';
import type { IconCode } from '../Icon';
import type { PrefixProps, PropsWithMappedData } from '../../hooks';

type MuiPaperProps = Pick<ComponentProps<typeof MuiPaper>, 'elevation'>;
type MuiDrawerProps = Pick<ComponentProps<typeof MuiDrawer>, 'anchor'>;
type DrawerAnchor = Extract<MuiDrawerProps['anchor'], 'left' | 'right'>;

type DrawerToolbarProps<D extends JsonObject> = Pick<
  ToolbarProps<D>,
  'color' | 'elevation' | 'title' | 'variant'
>;

interface BaseDrawerProps
  extends MuiPaperProps,
    Omit<MuiDrawerProps, 'anchor'> {
  anchor?: DrawerAnchor;
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
  DrawerAnchor,
  {
    closeIcon: IconCode;
    direction: Property.FlexDirection;
  }
>;

export interface DrawerStyleParams
  extends Required<Pick<BaseDrawerProps, 'breakpoint' | 'height' | 'width'>> {
  open: boolean;
}

export type DrawerProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseDrawerProps & PrefixProps<DrawerToolbarProps<D>, 'header'>,
  'children' | 'content' | 'headerIcon' | 'headerTitle'
>;
