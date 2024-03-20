import MuiGrid, { type RegularBreakpoints } from '@mui/material/Grid';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { ToolbarProps } from '../Toolbar';

type MuiGridProps = Pick<
  ComponentProps<typeof MuiGrid>,
  'children' | 'columnSpacing' | 'rowSpacing'
>;

type BaseGridProps = Pick<
  ToolbarProps<GenericData>,
  'icon' | 'title' | 'elevation'
>;

type ColumnSpacing = Extract<MuiGridProps['columnSpacing'], number>;
type RowSpacing = Extract<MuiGridProps['rowSpacing'], number>;

export type GridItemBrakpoints = keyof RegularBreakpoints;

export interface GridItemProps
  extends BaseGridProps,
    Pick<MuiGridProps, 'children'>,
    Partial<Record<GridItemBrakpoints, number>> {
  columnSpacing?: ColumnSpacing;
  rowSpacing?: RowSpacing;
}

export type MappablePropNames = keyof Pick<GridItemProps, 'icon' | 'title'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  GridItemProps,
  MappablePropNames
>;
