import { DndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import type { BreakpointValues } from '../../hooks';

type Span = Record<'cols' | 'rows', number>;

export type DataType = { id: string };

export type DndHandles = Pick<
  ComponentProps<typeof DndContext>,
  'onDragEnd' | 'onDragMove' | 'onDragStart'
>;

export interface GridItemStyleParams
  extends Pick<GridItemProps, 'GridProps' | 'id'>,
    Pick<ReturnType<typeof useSortable>, 'transition' | 'transform'> {
  activeId?: string;
  span: Span;
}

export type ResizeRecord = null | {
  el: HTMLElement;
  columnWidth: number;
  itemHeight: number;
  itemWidth: number;
  x: number;
  y: number;
};

export interface ResponsiveMaxWidths {
  xs: 'xs';
  sm?: ResponsiveMaxWidths['xs'] | 'sm';
  md?: ResponsiveMaxWidths['sm'] | 'md';
  lg?: ResponsiveMaxWidths['md'] | 'lg';
  xl?: ResponsiveMaxWidths['lg'] | 'xl';
}

//* Component Prop Types
interface GridProps {
  breakpoint: Breakpoint;
  cols: number;
  rowHeight: number;
  gap: number;
}

export interface ResponsiveGridProps<T extends DataType> {
  breakpoint?: Breakpoint;
  cols?: BreakpointValues<number>;
  gap?: number;
  items?: T[];
  maxWidths?: ResponsiveMaxWidths;
  rowHeight: number;
  sx?: ContainerProps['sx'];

  onResize?: (item: T, span: Span) => void;
  onResort?: (items: T[]) => void;
  renderItem: (item: T) => ReactElement<GridItemProps>;
}

export interface GridItemProps {
  GridProps: GridProps;
  id: string;
  actions?: ReactNode;
  children?: ReactNode;
  enableResize?: boolean;
  enableResort?: boolean;
  spans: BreakpointValues<Span>;
}
